const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//models
const { Campaigns } = require("../models/SQL/campaigns");
const { Roles } = require("../models/SQL/roles");
const { Sections } = require("../models/SQL/sections");
const { Turns } = require("../models/SQL/turns");
const { Users } = require("../models/SQL/users");

//utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const create = catchAsync(async (req,res,next)=>{
    const { 
        email,
        password,
        name,
        last_name,
        roleId,
        campaignId,
        sectionId,
        turnId
    } = req.body;

	const salt = await bcrypt.genSalt(12);
	const encryptPass = await bcrypt.hash(password,salt);

    const newUser = await Users.create({
        email,
        password: encryptPass,
        name,
        last_name,
        roleId,
        campaignId,
        sectionId,
        turnId
    });

	newUser.password = undefined;
    
    res.status(201).json({
        status: 'succes',
        newUser
    });
});

const login = catchAsync(async (req,res,next)=>{
    const { email,password } = req.body;

    const user = await Users.findOne({
        where:{
            email,
            status: true
        }
    });

    if (!user) {
        return next(new AppError('User not exist',404));
    };

    const validPass = await bcrypt.compare(password,user.password);

    if (!validPass) {
        return next(new AppError('Invalid password',404));
    };

    const token = jwt.sign({ 
        id: user.id,
        role: user.roleId
    },process.env.JWT_SIGN,{
        expiresIn:'24h',
    });

    res.status(200).json({
        status:'succes',
        token
    });
});

const update = catchAsync(async (req,res,next)=>{
    const { user } = req;
    const {
        name,
        last_name,
        roleId,
        campaignId,
        sectionId,
        turnId
    } = req.body;

    await user.update({
        name,
        last_name,
        roleId,
        campaignId,
        sectionId,
        turnId
    });
    
    res.status(200).json({
        status: 'succes',
    });
});

const updatePassword = catchAsync(async (req,res,next)=>{
    const { user, userSession } = req;
    const { last_password,password } = req.body;

    if (user.id !== userSession.id) {
        return next(new AppError('You are not the owner of this account',403));
    };

    const validPass = await bcrypt.compare(last_password,user.password);

    if (!validPass) {
        return next(new AppError('Invalid password',404));
    };

    const passRepeat = await bcrypt.compare(password,user.password);

    if (passRepeat) {
        return next(new AppError('Password same as your previous password',404))
    }

	const salt = await bcrypt.genSalt(12);
	const encryptPass = await bcrypt.hash(password,salt);

    await user.update({
        password: encryptPass,
    });
    
    res.status(200).json({
        status: 'succes',
    });
});

const updatePasswordAdmin = catchAsync(async (req,res,next)=>{
    const { user } = req;
    const { password } = req.body;

	const salt = await bcrypt.genSalt(12);
	const encryptPass = await bcrypt.hash(password,salt);

    await user.update({
        password: encryptPass,
    });
    
    res.status(200).json({
        status: 'succes',
    });
});

const deleted = catchAsync(async (req,res,next)=>{
    const { user } = req;

    await user.update({
        status:false
    });
    
    res.status(200).json({
        status: 'succes',
    });
});

const getItems = catchAsync(async (req,res,next)=>{
    const data = await Users.findAll({
        where:{
            status: true
        },
        include: [
            {
                model: Roles,
                attributes: ['id','name','createdAt','updatedAt']
            },
            {
                model: Campaigns,
                attributes: ['id','name','createdAt','updatedAt']
            },
            {
                model: Sections,
                attributes: ['id','name','createdAt','updatedAt']
            },
            {
                model: Turns,
                attributes: ['id','name','entrance_time','exit_time','createdAt','updatedAt']
            }
        ],
        attributes: ['id','email','name','last_name','img_profile','createdAt','updatedAt']
    });

    res.status(200).json({
        status: 'success',
        data
    });
});

const getItem = catchAsync(async (req,res,next)=>{
    const { user } = req;

    user.password = undefined

    res.status(200).json({
        status: 'success',
        user
    });
});

const getItemQuery = catchAsync(async (req,res,next)=>{
    const { roleId,campaignId,sectionId,turnId} = req.query;
    const data = {
        roleId,
        campaignId,
        sectionId,
        turnId
    }

    let users = []

	const searchUsers = await Users.findAll({ 
		where: { 
			status:true
		},
		include: [
			{
				model: Roles,
				attributes: ['id','name','createdAt','updatedAt']
			},
			{
				model: Campaigns,
				attributes: ['id','name','createdAt','updatedAt']
			},
			{
				model: Sections,
				attributes: ['id','name','createdAt','updatedAt']
			},
			{
				model: Turns,
				attributes: ['id','name','entrance_time','exit_time','createdAt','updatedAt']
			}
		]
	});

    searchUsers.map(user=>{
        user.password = undefined,
        user.status = undefined
    });

    if (data.roleId) {
        searchUsers.map(user=>{
            if (parseInt(user.roleId)===parseInt(data.roleId)) {
                users.push(user)
            }
        });
    };

    if (data.campaignId) {
        searchUsers.map(user=>{
            if (parseInt(user.campaignId)===parseInt(data.campaignId)) {
                users.push(user)
            }
        });
    };

    if (data.sectionId) {
        searchUsers.map(user=>{
            if (parseInt(user.sectionId)===parseInt(data.sectionId)) {
                users.push(user)
            }
        });
    };

    if (data.turnId) {
        searchUsers.map(user=>{
            if (parseInt(user.turnId)===parseInt(data.turnId)) {
                users.push(user)
            }
        });
    };

    users.map(user=>{
        user.roleId = undefined,
        user.campaignId = undefined,
        user.sectionId = undefined,
        user.turnId = undefined
    });

    res.status(200).json({
        status: 'success',
        users
    });
});

module.exports = {
    create,
    login,
    update,
    updatePassword,
    updatePasswordAdmin,
    deleted,
    getItems,
    getItem,
    getItemQuery
}
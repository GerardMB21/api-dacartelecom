const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Campaigns } = require('../models/campaigns');
const { Roles } = require('../models/roles');
const { Sections } = require('../models/sections');

//models
const { Users } = require('../models/users');

//utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require('../utils/appError');

//controlers
const create = catchAsync(async (req,res,next)=>{
    const { 
        email,
        password,
        name,
        lastName,
        roleId,
        campaignId,
        sectionId
    } = req.body;

	const salt = await bcrypt.genSalt(12);
	const encryptPass = await bcrypt.hash(password,salt);

    const newUser = await Users.create({
        email,
        password: encryptPass,
        name,
        lastName,
        roleId,
        campaignId,
        sectionId
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

    const role = await Roles.findOne({
        where:{
            id: user.roleId,
            status: true
        }
    });

    const token = jwt.sign({ 
        id: user.id,
        role: role.name
    },process.env.JWT_SIGN,{
        expiresIn:'24h',
    });

    res.status(200).json({
        status:'succes',
        token,
        role: role.name,
        campaign: user.campaignId,
        section: user.sectionId,
    });
});

const update = catchAsync(async (req,res,next)=>{
    const { user } = req;
    const {
        name,
        lastName,
        roleId,
        campaignId,
        sectionId
    } = req.body;

    if (name) {
        await user.update({
            name
        });
    };

    if (lastName) {
        await user.update({
            lastName
        });
    };

    if (roleId) {
        await user.update({
            roleId
        });
    };

    if (campaignId) {
        await user.update({
            campaignId
        });
    };

    if (sectionId) {
        await user.update({
            sectionId
        });
    };
    
    res.status(200).json({
        status: 'success',
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
        status: 'success',
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
        status: 'success',
    });
});

const deleted = catchAsync(async (req,res,next)=>{
    const { user } = req;

    await user.update({
        status: !user.status
    });
    
    res.status(200).json({
        status: 'success',
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
                required: false,
                where:{
                    status: true
                },
                attributes: ['id','name','description','createdAt','updatedAt']
            },
            {
                model: Campaigns,
                required: false,
                where:{
                    status: true
                },
                attributes: ['id','name','description','createdAt','updatedAt']
            },
            {
                model: Sections,
                required: false,
                where:{
                    status: true
                },
                attributes: ['id','name','description','createdAt','updatedAt']
            }
        ],
        attributes: ['id','email','name','lastName','createdAt','updatedAt']
    });

    res.status(200).json({
        status: 'success',
        data
    });
});

const getItemsAdmin = catchAsync(async (req,res,next)=>{
    const data = await Users.findAll({
        where:{
            status: false
        },
        include: [
            {
                model: Roles,
                required: false,
                where:{
                    status: true
                },
                attributes: ['id','name','description','createdAt','updatedAt']
            },
            {
                model: Campaigns,
                required: false,
                where:{
                    status: true
                },
                attributes: ['id','name','description','createdAt','updatedAt']
            },
            {
                model: Sections,
                required: false,
                where:{
                    status: true
                },
                attributes: ['id','name','description','createdAt','updatedAt']
            }
        ],
        attributes: ['id','email','name','lastName','status','createdAt','updatedAt']
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
    const { 
        roleId,
        campaignId,
        sectionId
    } = req.query;

    let users = []

	const searchUsers = await Users.findAll({ 
		where: { 
			status:true
		},
		include: [
			{
				model: Roles,
                required: false,
                where:{
                    status: true
                },
				attributes: ['id','name','description','createdAt','updatedAt']
			},
			{
				model: Campaigns,
                required: false,
                where:{
                    status: true
                },
				attributes: ['id','name','description','createdAt','updatedAt']
			},
			{
				model: Sections,
                required: false,
                where:{
                    status: true
                },
				attributes: ['id','name','description','createdAt','updatedAt']
			}
		]
	});

    searchUsers.map(user=>{
        user.password = undefined,
        user.status = undefined
    });

    if (roleId) {
        searchUsers.map(user=>{
            if (parseInt(user.roleId)===parseInt(roleId)) {
                users.push(user)
            }
        });
    };

    if (campaignId) {
        searchUsers.map(user=>{
            if (parseInt(user.campaignId)===parseInt(campaignId)) {
                users.push(user)
            }
        });
    };

    if (sectionId) {
        searchUsers.map(user=>{
            if (parseInt(user.sectionId)===parseInt(sectionId)) {
                users.push(user)
            }
        });
    };

    users.map(user=>{
        user.roleId = undefined,
        user.campaignId = undefined,
        user.sectionId = undefined
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
    getItemsAdmin,
    getItem,
    getItemQuery
}
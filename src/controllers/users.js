const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//models
const { Users } = require('../models/users');
const { Roles } = require('../models/roles');
const { Campaigns } = require('../models/campaigns');
const { Sections } = require('../models/sections');

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
        status: 'success',
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
        status:'success',
        token,
        id: user.id,
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
        sectionId,
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
    const { lastPassword,password } = req.body;

    if (user.id !== userSession.id && userSession.role !== 'administrador') {
        return next(new AppError('You dont have permission',403));
    };

    if (userSession.role !== 'administrador') {
        const validPass = await bcrypt.compare(lastPassword,user.password);

        if (!validPass) {
            return next(new AppError('Invalid password',404));
        };

        const passRepeat = await bcrypt.compare(password,user.password);

        if (passRepeat) {
            return next(new AppError('Password same as your previous password',404));
        };
    };

	const salt = await bcrypt.genSalt(12);
	const encryptPass = await bcrypt.hash(password,salt);

    if (password) {
        await user.update({
            password: encryptPass,
        });
    };
    
    res.status(200).json({
        status: 'success',
    });
});

const deleted = catchAsync(async (req,res,next)=>{
    const { user } = req;
    const { status } = req.body;

    await user.update({
        status
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
            },
            {
                model: Campaigns,
                required: false,
                where:{
                    status: true
                },
            },
            {
                model: Sections,
                required: false,
                where:{
                    status: true
                },
            }
        ],
        attributes: { exclude: ['password'] }
    });

    res.status(200).json({
        status: 'success',
        data
    });
});

const getAllItems = catchAsync(async (req,res,next)=>{
    const data = await Users.findAll({
        include: [
            {
                model: Roles,
            },
            {
                model: Campaigns,
            },
            {
                model: Sections,
            }
        ],
        attributes: { exclude: ['password'] }
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

const getQuery = catchAsync(async (req,res,next)=>{
    const { 
        name,
        lastName,
        roleId,
        campaignId,
        sectionId
    } = req.query;

    let users = [];
    let parameters = [];

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
			},
			{
				model: Campaigns,
                required: false,
                where:{
                    status: true
                },
			},
			{
				model: Sections,
                required: false,
                where:{
                    status: true
                },
			}
		],
        attributes: { exclude: ['password'] }
	});

    if (roleId) {
        parameters = [];
        searchUsers.map(user=>{
            if (user.roleId === parseInt(roleId)) {
                parameters.push(user);
            };
        });
        users = parameters;
    };

    if (campaignId) {
        parameters = [];
        users.map(user=>{
            if (user.campaignId === parseInt(campaignId)) {
                parameters.push(user);
            };
        });
        users = parameters;
    };

    if (sectionId) {
        parameters = [];
        users.map(user=>{
            if (user.sectionId === parseInt(sectionId)) {
                parameters.push(user);
            };
        });
        users = parameters;
    };

    if (name) {
        parameters = [];
        users.map(user=>{
            if (user.name === name) {
                parameters.push(user);
            };
        });
        users = parameters;
    };

    if (lastName) {
        parameters = [];
        users.map(user=>{
            if (user.lastName === lastName) {
                parameters.push(user);
            };
        });
        users = parameters;
    };

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
    deleted,
    getItems,
    getAllItems,
    getItem,
    getQuery
}
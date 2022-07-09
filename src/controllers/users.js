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
        img_profile,
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
        img_profile,
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

const update = catchAsync(async (req,res,next)=>{
    const { user } = req;
    const {
        last_password,
        password,
        name,
        last_name,
        img_profile,
        roleId,
        campaignId,
        sectionId,
        turnId
    } = req.body;

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
        name,
        last_name,
        img_profile,
        roleId,
        campaignId,
        sectionId,
        turnId
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

module.exports = {
    create,
    update,
    deleted,
    getItems,
    getItem
}
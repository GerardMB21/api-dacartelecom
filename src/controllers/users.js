const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Campaigns } = require("../models/SQL/campaigns");
const { Roles } = require("../models/SQL/roles");
const { Sections } = require("../models/SQL/sections");
const { Status } = require("../models/SQL/status");
const { Turns } = require("../models/SQL/turns");
const { Users } = require("../models/SQL/users");
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const getItems = catchAsync(async (req,res,next)=>{
    const data = await Users.findAll({
        attributes:['id','email','name','last_name','img_code','createdAt','updatedAt'],
        include:[
            {
                model:Roles,
                attributes:['name']
            },
            {
                model:Campaigns,
                attributes:['name']
            },
            {
                model:Sections,
                attributes:['name']
            },
            {
                model:Turns,
                attributes:['name']
            },
            {
                model:Status,
                attributes:['name']
            }
        ]
    });

    res.status(200).json({
        status: 'succes',
        data
    });
})

const getItem = (req,res)=>{

}

const createItem = catchAsync(async (req,res,next)=>{
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
        turnId,
        statusId:1
    })

	newUser.password = undefined
    
    res.status(201).json({
        status: 'succes',
        newUser
    })
})

const loginItem = catchAsync(async (req,res,next)=>{
	const { email, password } = req.body;

	const user = await Users.findOne({
		where:{ 
			email,
			statusId:1 
		}
	});

	if (!user) {
		return next(new AppError('User not exist',404));
	};

	const validPass = await bcrypt.compare(password,user.password);

	if (!validPass) {
		next(new AppError('Invalid password',404));
	};

	const token = jwt.sign({ 
        id:user.id,
        role:user.roleId,
        campaign:user.campaignId,
        section:user.sectionId
     }, process.env.JWT_SIGN, { 
		expiresIn: '5m',
	 });

	res.status(200).json({
		status:'succes',
		token
	});
})

const updateItem = (req,res)=>{

}

const deleteItem = (req,res)=>{

}

module.exports = {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem,
    loginItem
}
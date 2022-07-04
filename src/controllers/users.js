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

const getItems = catchAsync(async (req,res,next)=>{

    const { permission } = req;

    if (!permission) {
        return next(new AppError('You dont have permission',401));
    };

    const data = await Users.findAll({
        attributes:['id','email','name','last_name','img_profile','status','createdAt','updatedAt'],
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
            }
        ]
    });

    res.status(200).json({
        status: 'succes',
        data
    });
});

const getItem = catchAsync(async (req,res,next)=>{
    const { user } = req
    
    user.password = undefined

    res.status(200).json({
        status: 'succes',
        user
    });
});

const createItem = catchAsync(async (req,res,next)=>{
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
    })

	newUser.password = undefined
    
    res.status(201).json({
        status: 'succes',
        newUser
    })
});

const loginItem = catchAsync(async (req,res,next)=>{
	const { email, password } = req.body;

	const user = await Users.findOne({
		where:{ 
			email,
			status:true 
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
        id:user.id,
        role:user.roleId,
        campaign:user.campaignId,
        section:user.sectionId
     }, process.env.JWT_SIGN, { 
		expiresIn: '24h',
	 });

	res.status(200).json({
		status:'succes',
		token
	});
});

const updateItem = catchAsync(async (req,res,next)=>{
    const { user } = req
    const { name, last_name, last_password, password } = req.body
    
	const validPass = await bcrypt.compare(last_password,user.password);

	if (!validPass) {
		return next(new AppError('Invalid password',404));
	};

	const salt = await bcrypt.genSalt(12);
	const encryptPass = await bcrypt.hash(password,salt);

    await user.update({ 
        name,
        last_name,
        password: encryptPass,
     })

     res.status(201).json({ status: 'success' });
});

const deleteItem = catchAsync(async (req,res,next)=>{
    const { user } = req

    await user.update({ 
        status:false
     })

     res.status(201).json({ status: 'success' });
});

const searchRole = catchAsync(async (req,res,next)=>{
    const { users } = req

    users.map(user=>{
        user.password = undefined
    })
    
    res.status(200).json({
        status: 'succes',
        users
    });
});

const searchCampaign = catchAsync(async (req,res,next)=>{
    const { users } = req;

    res.status(200).json({
        status: 'succes',
        users
    });
})

const searchSection = catchAsync(async (req,res,next)=>{
    const { users } = req;

    res.status(200).json({
        status: 'succes',
        users
    });
})

module.exports = {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem,
    loginItem,
    searchRole,
    searchCampaign,
    searchSection
}
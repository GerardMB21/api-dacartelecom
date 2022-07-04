// Models
const { Campaigns } = require('../models/SQL/campaigns');
const { Roles } = require('../models/SQL/roles');
const { Sections } = require('../models/SQL/sections');
const { Turns } = require('../models/SQL/turns');
const { Users } = require('../models/SQL/users');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const userExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const user = await Users.findOne({ 
		where: { 
			id,
			status:true
		 },
         attributes:['id','email','password','name','last_name','img_profile','createdAt','updatedAt'],
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

	if (!user) {
		return next(new AppError('User not found', 404));
	};

	req.user = user;

	next();
});

const userRole = catchAsync(async (req,res,next)=>{
    const { role } = req.query;
    
	const users = await Users.findAll({ 
		where: { 
			roleId:role,
			status:true
		 },
         attributes:['id','email','password','name','last_name','img_profile','createdAt','updatedAt'],
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
    
	if (!users.length) {
		return next(new AppError('Users not found', 404));
	};

	req.users = users;

	next();
})

const userCampaign = catchAsync(async (req,res,next)=>{
    const { campaign } = req.query;
    
	const users = await Users.findAll({ 
		where: { 
			campaignId:campaign,
			status:true
		 },
         attributes:['id','email','password','name','last_name','img_profile','createdAt','updatedAt'],
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
    
	if (!users.length) {
		return next(new AppError('Users not found', 404));
	};

	req.users = users;

	next();
})

const userSection = catchAsync(async (req,res,next)=>{
    const { section } = req.query;
    
	const users = await Users.findAll({ 
		where: { 
			sectionId:section,
			status:true
		 },
         attributes:['id','email','password','name','last_name','img_profile','createdAt','updatedAt'],
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
    
	if (!users.length) {
		return next(new AppError('Users not found', 404));
	};

	req.users = users;

	next();
})

const userPermission = catchAsync(async (req,res,next)=>{
    const { id } = req.params;
    const { permission, userId } = req;

	if (!permission) {
		if (parseInt(id) === parseInt(userId)) {
			return next()
		} else {
			return next(new AppError('You dont have permission',401))
		}
	}

    next()

})

const userRolePermission = catchAsync(async (req,res,next)=>{
    const { permission } = req;
    const { role } = req.query;

    const rol = await Roles.findOne({ where:{
        id:role
    } })

	if (!permission) {
		if (rol.dataValues.name !== "admin") {
			return next()
		} else {
			return next(new AppError('You dont have permission',401))
		}
	}

    next()

})

module.exports = { 
    userExists,
    userRole,
    userCampaign,
    userSection,
    userPermission,
    userRolePermission,
};
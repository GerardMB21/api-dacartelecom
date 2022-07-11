//Models
const { Data } = require('../models/SQL/data');
const { Roles } = require('../models/SQL/roles');
const { Storage } = require('../models/SQL/storage');
const { Users } = require('../models/SQL/users');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const dataExist = catchAsync(async (req,res,next)=>{
    const { userSession } = req;
	const { id } = req.params;

	const data = await Data.findOne({ 
		where:{
			id,
            roleId: userSession.roleId,
			status: true
		},
        include:[
            {
                model: Roles,
                attributes: ['id','name','createdAt','updatedAt']
            },
            {
                model: Users,
                attributes: ['id','email','name','last_name','createdAt','updatedAt']
            },
            {
                model: Storage,
                attributes: ['id','url','createdAt','updatedAt']
            }
        ],
        attributes: ['id','file_name','permission','userId','createdAt','updatedAt']
	});

	if (!data) {
		return next(new AppError('Data not found',404));
	}

	req.data = data

	next()
});

const allDataExist = catchAsync(async (req,res,next)=>{
	const { id } = req.params;

	const data = await Data.findOne({ 
		where:{
			id,
			status: true
		},
        include:[
            {
                model: Roles,
                attributes: ['id','name','createdAt','updatedAt']
            },
            {
                model: Users,
                attributes: ['id','email','name','last_name','createdAt','updatedAt']
            },
            {
                model: Storage,
                attributes: ['id','url','createdAt','updatedAt']
            }
        ],
        attributes: ['id','file_name','permission','userId','createdAt','updatedAt']
	});

	if (!data) {
		return next(new AppError('Data not found',404));
	}

	req.data = data

	next()
});

module.exports = {
	dataExist,
    allDataExist
};
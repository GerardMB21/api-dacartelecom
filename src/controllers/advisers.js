//models
const { Advisers } = require('../models/advisers');
const { Users } = require('../models/users');
const { Campaigns } = require('../models/campaigns');
const { Sections } = require('../models/sections');
const { Roles } = require('../models/roles');

//utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

//controllers
const create = catchAsync(async (req,res,next)=>{
    const { user } = req;
    const {
        name,
        lastName
    } = req.body;

    const newAdviser = await Advisers.create({
        name,
        lastName,
        userId: user.id,
        campaignId: user.campaignId,
        sectionId: user.sectionId
    });
    
    res.status(201).json({
        status: 'succes',
        newAdviser
    });
});

const update = catchAsync(async (req,res,next)=>{
    const { adviser } = req;
    const {
        name,
        lastName,
        userId
    } = req.body;

    if (name) {
        await adviser.update({
            name
        });
    };

    if (lastName) {
        await adviser.update({
            lastName
        });
    };

    if (userId) {

        const user = await Users.findOne({
            where:{
                id: userId,
                status: true
            }
        });

        if (!user) {
            return next(new AppError('User Id invalid try again',404));
        };

        const role = await Roles.findOne({
            where:{
                id: user.roleId,
                status: true
            }
        });

        if (role.name !== 'supervisor') {
            return next(new AppError('This user dont supervisor',404));
        };

        await adviser.update({
            userId,
            campaignId: user.campaignId,
            sectionId: user.sectionId
        });
    };
    
    res.status(200).json({
        status: 'succes',
    });
});

const deleted = catchAsync(async (req,res,next)=>{
    const { adviser } = req;

    await adviser.update({
        status: !adviser.status
    });

    res.status(201).json({
        status: 'success'
    })
});

const getItems = catchAsync(async (req,res,next)=>{
    const data = await Advisers.findAll({
        where:{
            status: true
        },
        include:[
            {
                model:Users,
                required: false,
                where:{
                    status: true
                },
                include:[
                    {
                        model:Campaigns,
                        required: false,
                        where:{
                            status: true
                        },
                        attributes: ['id','name','createdAt','updatedAt']
                    },
                    {
                        model:Sections,
                        required: false,
                        where:{
                            status: true
                        },
                        attributes: ['id','name','createdAt','updatedAt']
                    },
                ],
                attributes: ['id','email','name','lastName','createdAt','updatedAt']
            }
        ],
        attributes: ['id','name','lastName','createdAt','updatedAt']
    });

    res.status(201).json({
        status: 'success',
        data
    });
});

const getItemsAdmin = catchAsync(async (req,res,next)=>{
    const data = await Advisers.findAll({
        where:{
            status: false
        },
        include:[
            {
                model:Users,
                include:[
                    {
                        model:Campaigns,
                    },
                    {
                        model:Sections,
                    },
                ],
                attributes: ['id','email','name','lastName','roleId','campaignId','sectionId','status','createdAt','updatedAt']
            }
        ],
    });

    res.status(201).json({
        status: 'success',
        data
    });
});

const getItem = catchAsync(async (req,res,next)=>{
    const { adviser } = req;

    res.status(201).json({
        status: 'success',
        adviser
    })
});

const getQuery = catchAsync(async (req,res,next)=>{
    const { campaignId,sectionId } = req.query;

    let advisers = []

    const searchAdvisers = await Advisers.findAll({
        where: {
            status: true
        },
    });

    if (campaignId) {
        advisers = []
        searchAdvisers.map(adviser=>{
            if (adviser.campaignId === parseInt(campaignId)) {
                advisers.push(adviser);
            };
        });
    }

    if (sectionId) {
        advisers = []
        searchAdvisers.map(adviser=>{
            if (adviser.sectionId === parseInt(sectionId)) {
                advisers.push(adviser);
            };
        });
    };

    res.status(200).json({
        status: 'success',
        advisers
    });
});

module.exports = { 
    create,
    update,
    deleted,
    getItems,
    getItemsAdmin,
    getItem,
    getQuery,
}
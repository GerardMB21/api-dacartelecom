//models
const { Goals } = require("../models/goal");
const { Advisers } = require("../models/advisers");
const { Campaigns } = require("../models/campaigns");
const { Products } = require("../models/products");
const { Sections } = require("../models/sections");
const { Solds } = require("../models/solds");
const { Users } = require("../models/users");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");
const { Roles } = require("../models/roles");

//controllers
const create = catchAsync(async (req,res,next)=>{
    const { user,userSession } = req;
    const { goal,day } = req.body;

    const actualDay = new Date(day)

    if (parseInt(user.id) !== parseInt(userSession.id)) {
        return next(new AppError('You dont the owner this account',403));
    };

    const goalExist = await Goals.findOne({
        where:{
            day: actualDay,
            userId: user.id,
            campaignId: user.campaignId,
            sectionId: user.sectionId,
        }
    });

    if (goalExist) {
        return next(new AppError('You have already registered a goal today',404));
    };

    const newGoal = await Goals.create({
        goal,
        day,
        userId: user.id,
        campaignId: user.campaignId,
        sectionId: user.sectionId,
    });

    res.status(200).json({
        status: 'success',
        newGoal
    });
});

const update = catchAsync(async (req,res,next)=>{
    const { meta,userSession } = req;
    const { goal } = req.body;

    if (parseInt(meta.userId) !== parseInt(userSession.id)) {
        return next(new AppError('You dont the owner this goal',403));
    };

    if (goal) {
        await meta.update({
            goal
        });
    };

    res.status(201).json({
        status: 'success'
    });
});

const getItems = catchAsync(async (req,res,next)=>{
    const data = await Goals.findAll({
        where:{
            status: true
        },
        include:[
            {
                model: Users,
                required: false,
                where: {
                    status: true
                },
                include:[
                    {
                        model: Roles,
                        required: false,
                        where: {
                            status: true
                        },
                        attributes: ['id','name','description','createdAt','updatedAt']
                    },
                    {
                        model: Campaigns,
                        required: false,
                        where: {
                            status: true
                        },
                        attributes: ['id','name','description','createdAt','updatedAt']
                    },
                    {
                        model: Sections,
                        required: false,
                        where: {
                            status: true
                        },
                        attributes: ['id','name','description','createdAt','updatedAt']
                    }
                ],
                attributes: ['id','email','name','lastName','createdAt','updatedAt']
            }
        ],
        attributes: ['id','goal','day','createdAt','updatedAt']
    });

    res.status(200).json({
        status: 'success',
        data
    })
});

const getItem = catchAsync(async (req,res,next)=>{
    const { meta } = req;

    res.status(200).json({
        status: 'success',
        meta
    })
});

const getQuery = catchAsync(async (req,res,next)=>{
    const { 
            startDate,
            finishDate,
            userId,
            sectionId,
            campaignId,
        } = req.query;

    let goals = [];
    let parameters = [];

    const searchGoals = await Goals.findAll({
        where:{
            status: true
        },
        include:[
            {
                model: Users,
                required: false,
                where: {
                    status: true
                },
                include:[
                    {
                        model: Roles,
                        required: false,
                        where: {
                            status: true
                        },
                        attributes: ['id','name','description','createdAt','updatedAt']
                    },
                    {
                        model: Campaigns,
                        required: false,
                        where: {
                            status: true
                        },
                        attributes: ['id','name','description','createdAt','updatedAt']
                    },
                    {
                        model: Sections,
                        required: false,
                        where: {
                            status: true
                        },
                        attributes: ['id','name','description','createdAt','updatedAt']
                    }
                ],
                attributes: ['id','email','name','lastName','createdAt','updatedAt']
            }
        ],
    });

    const data = {
        startDate: new Date(startDate).getTime(),
        finishDate: new Date(finishDate).getTime(),
        campaignId: parseInt(campaignId),
        sectionId: parseInt(sectionId),
        userId: parseInt(userId),
    };

    if (!data.startDate) {
        return next(new AppError('Please input a start date',404))
    }

    if (data.startDate > data.finishDate) {
        return next(new AppError('The end date cannot be greater than the start date',404));
    };

    if (!data.finishDate) {
        searchGoals.map(goal=>{
            const goalDay = new Date(goal.day).getTime();

            if ((goalDay >= data.startDate) && (goalDay < data.startDate + 86400000)) {
                goals.push(goal);
            };
        });

        if (data.campaignId) {
            parameters = [];
            goals.map(goal=>{
                if (goal.campaignId === data.campaignId) {
                    parameters.push(goal);
                };
            });
            goals = parameters;
        };

        if (data.sectionId) {
            parameters = [];
            goals.map(goal=>{
                if (goal.sectionId === data.sectionId) {
                    parameters.push(goal);
                };
            });
            goals = parameters;
        };

        if (data.userId) {
            parameters = [];
            goals.map(goal=>{
                if (goal.userId === data.userId) {
                    parameters.push(goal);
                };
            });
            goals = parameters
        }
    } else {
        const time = finishDate.split(" ");
        let finishDay = data.finishDate;
        if (time.length === 1) {
            finishDay = data.finishDate + 86400000;
        }
        searchGoals.map(goal=>{
            const goalDay = new Date(goal.day).getTime();

            if ((goalDay >= data.startDate) && (goalDay < finishDay)) {
                goals.push(goal)
            };
        });

        if (data.campaignId) {
            parameters = [];
            goals.map(goal=>{
                if (goal.campaignId === data.campaignId) {
                    parameters.push(goal)
                }
            });
            goals = parameters;
        };

        if (data.sectionId) {
            parameters = [];
            goals.map(goal=>{
                if (goal.sectionId === data.sectionId) {
                    parameters.push(goal)
                }
            });
            goals = parameters;
        };

        if (data.userId) {
            parameters = [];
            goals.map(goal=>{
                if (goal.userId === data.userId) {
                    parameters.push(goal)
                }
            });
            goals = parameters;
        };
    }

    if (!goals.length) {
        return next(new AppError('Goals not found',404));
    };

    goals.map(goal=>{
        goal.userId = undefined,
        goal.campaignId = undefined,
        goal.sectionId = undefined,
        goal.status = undefined
    });

    res.status(200).json({
        status:'success',
        goals
    });
});

module.exports = {
    create,
    update,
    getItems,
    getItem,
    getQuery
};
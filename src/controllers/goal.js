//models
const { Goals } = require("../models/goal");
const { Campaigns } = require("../models/campaigns");
const { Sections } = require("../models/sections");
const { Users } = require("../models/users");
const { Roles } = require("../models/roles");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

//controllers
const create = catchAsync(async (req,res,next)=>{
    const { userSession,user } = req;
    const { goal,day } = req.body;
    const actualDay = new Date(day);

    let goalExist;
    let newGoal;

    if (userSession.role !== 'supervisor' && userSession.role !== 'administrador') {
        return next(new AppError('You dont have permission',403));
    };

    if (userSession.role === 'administrador') {
        goalExist = await Goals.findOne({
            where:{
                day: actualDay,
                userId: user.id,
                campaignId: user.campaignId,
                sectionId: user.sectionId,
            }
        });
    } else {
        goalExist = await Goals.findOne({
            where: {
                day: actualDay,
                userId: userSession.id,
                campaignId: userSession.campaign,
                sectionId: userSession.section
            }
        });
    };

    if (goalExist) {
        return next(new AppError('You have already registered a goal today',404));
    };

    if (userSession.role === 'administrador') {
        
        if (user.role.name !== 'supervisor') {
            return next(new AppError('This account dont role supervisor',404));
        };

        newGoal = await Goals.create({
            goal,
            day,
            userId: user.id,
            campaignId: user.campaignId,
            sectionId: user.sectionId,
        });
    } else {
        newGoal = await Goals.create({
            goal,
            day,
            userId: userSession.id,
            campaignId: userSession.campaign,
            sectionId: userSession.section,
        });
    };

    res.status(200).json({
        status: 'success',
        newGoal
    });
});

const update = catchAsync(async (req,res,next)=>{
    const { meta,userSession } = req;
    const { goal } = req.body;

    if (meta.userId !== userSession.id) {
        if (userSession.role !== 'administrador') {
            return next(new AppError('You dont the owner this goal',403));
        };
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
                    },
                    {
                        model: Campaigns,
                        required: false,
                        where: {
                            status: true
                        },
                    },
                    {
                        model: Sections,
                        required: false,
                        where: {
                            status: true
                        },
                    }
                ],
                attributes: { exclude:['password'] }
            }
        ],
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
                    },
                    {
                        model: Campaigns,
                        required: false,
                        where: {
                            status: true
                        },
                    },
                    {
                        model: Sections,
                        required: false,
                        where: {
                            status: true
                        },
                    }
                ],
                attributes: { exclude:['password'] }
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
        let finishDay = data.finishDate + 86400000;
        
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
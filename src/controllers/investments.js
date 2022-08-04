//models
const { Investments } = require("../models/investments");
const { Roles } = require("../models/roles");
const { Users } = require("../models/users");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

//controllers
const create = catchAsync(async (req,res,next)=>{
    const { userSession,campaign,section } = req;
    const { 
        name,
        investment,
        day
    } = req.body;
    const actualDate = new Date(day);

    if (section.campaignId !== campaign.id) {
        return next(new AppError('This section dont include this campaign',404));
    };

    let newInvestment = await Investments.findOne({
        where:{
            name,
            day: actualDate,
            campaignId: campaign.id,
            sectionId: section.id
        }
    });

    if (newInvestment) {
        await newInvestment.update({
            investment: parseFloat(newInvestment.investment) + parseFloat(investment),
            userId: userSession.id
        });
    } else {
        newInvestment = await Investments.create({
            name,
            investment,
            day,
            userId: userSession.id,
            campaignId: campaign.id,
            sectionId: section.id
        });
    }

    res.status(200).json({
        status: 'success',
        newInvestment
    })
});

const update = catchAsync(async (req,res,next)=>{
    const { inversion } = req;
    const { investment } = req.body;

    if (investment) {
        await inversion.update({
            investment,
        });
    }


    res.status(201).json({
        status: 'success'
    })
});

const deleted = catchAsync(async (req,res,next)=>{
    const { inversion } = req;

    await inversion.update({
        status: false
    });

    res.status(201).json({
        status: 'success'
    });
});

const getItems = catchAsync(async (req,res,next)=>{
    const data = await Investments.findAll({
        where:{
            status: true
        },
        include: [
            {
                model: Users,
                required: false,
                where:{
                    status: true
                },
                include:{
                    model:Roles,
                    required: false,
                    where:{
                        status: true
                    },
                },
                attributes: { exclude:['password'] }
            }
        ],
    });

    res.status(200).json({
        status: 'success',
        data
    })
});

const getAllItems = catchAsync(async (req,res,next)=>{
    const data = await Investments.findAll({
        include: [
            {
                model: Users,
                required: false,
                where:{
                    status: true
                },
                include:{
                    model:Roles,
                    required: false,
                    where:{
                        status: true
                    }
                },
                attributes: { exclude:['password'] }
            }
        ],
    });

    if (!data.length) {
        return next(new AppError('Investment not found',404));
    };

    res.status(200).json({
        status: 'success',
        data
    })
});

const getQuery = catchAsync(async (req,res,next)=>{
    const { 
            startDate,
            finishDate,
            campaignId,
            sectionId,
            userId,
        } = req.query;

    let investments = [];
    let parameters = [];

    const searchInvestments = await Investments.findAll({
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
        searchInvestments.map(investment=>{
            const investmentDay = new Date(investment.day).getTime();

            if ((investmentDay >= data.startDate) && (investmentDay < data.startDate + 86400000)) {
                investments.push(investment);
            };
        });

        if (data.campaignId) {
            parameters = [];
            investments.map(investment=>{
                if (investment.campaignId === data.campaignId) {
                    parameters.push(investment);
                };
            });
            investments = parameters;
        };

        if (data.sectionId) {
            parameters = [];
            investments.map(investment=>{
                if (investment.sectionId === data.sectionId) {
                    parameters.push(investment);
                };
            });
            investments = parameters;
        };

        if (data.userId) {
            parameters = [];
            investments.map(investment=>{
                if (investment.userId === data.userId) {
                    parameters.push(investment);
                };
            });
            investments = parameters
        }
    } else {
        let finishDay = data.finishDate + 86400000;

        searchInvestments.map(investment=>{
            const investmentDay = new Date(investment.day).getTime();

            if ((investmentDay >= data.startDate) && (investmentDay < finishDay)) {
                investments.push(investment)
            };
        });

        if (data.campaignId) {
            parameters = [];
            investments.map(investment=>{
                if (investment.campaignId === data.campaignId) {
                    parameters.push(investment);
                };
            });
            investments = parameters;
        };

        if (data.sectionId) {
            parameters = [];
            investments.map(investment=>{
                if (investment.sectionId === data.sectionId) {
                    parameters.push(investment);
                };
            });
            investments = parameters;
        };

        if (data.userId) {
            parameters = [];
            investments.map(investment=>{
                if (investment.userId === data.userId) {
                    parameters.push(investment)
                }
            });
            investments = parameters;
        };
    }

    if (!investments.length) {
        return next(new AppError('Investments not found',404));
    };

    res.status(200).json({
        status:'success',
        investments
    });
});

module.exports = {
    create,
    update,
    deleted,
    getItems,
    getAllItems,
    getQuery,
};
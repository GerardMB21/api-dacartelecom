//models
const { Campaigns } = require("../models/campaigns");
const { Products } = require("../models/products");
const { Sections } = require("../models/sections");
const { Solds } = require("../models/solds");
const { Users } = require("../models/users");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

//controllers
const create = catchAsync(async (req,res,next)=>{
    const { user,product } = req;
    const {
            sold,
            dayTime
        } = req.body;

    const actualDay = new Date(dayTime);

    let newSold;

    if (user.role.name !== 'asesor') {
        return next(new AppError('This user dont adviser',404));
    };

    if (product.sectionId !== user.sectionId) {
        return next(new AppError('This product does not belong to this section',404));
    };

    newSold = await Solds.findOne({
        where:{
            dayTime: actualDay,
            userId: user.id,
            productId: product.id,
            status: true
        }
    });

    if (!newSold) {
        newSold = await Solds.create({
            sold,
            dayTime,
            userId: user.id,
            campaignId: user.campaignId,
            sectionId: user.sectionId,
            productId: product.id
        });
    } else {
        await newSold.update({
            sold: parseInt(newSold.sold) + parseInt(sold)
        });
    };

    res.status(200).json({
        status: 'success',
        newSold
    });
});

const update = catchAsync(async (req,res,next)=>{
    const { sale } = req;
    const { sold } = req.body;

    if (sold) {
        await sale.update({
            sold
        });
    };

    res.status(201).json({
        status: 'success'
    });
});

const deleted = catchAsync(async (req,res,next)=>{
    const { sale } = req;

    await sale.update({
        status: false
    });

    res.status(201).json({
        status: 'success'
    });
});

const getItems = catchAsync(async (req,res,next)=>{
    const data = await Solds.findAll({
        where:{
            status: true
        },
        include: [
            {
                model: Users,
                required: false,
                where: {
                    status: true
                },
                attributes: { exclude: ['password'] }
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
            },
            {
                model: Products,
                required: false,
                where:{
                    status: true
                },
            }
        ],
    });

    res.status(200).json({
        status: 'success',
        data
    })
});

const getItem = catchAsync(async (req,res,next)=>{
    const { sale } = req;

    res.status(200).json({
        status: 'success',
        sale
    })
});

const getAllItems = catchAsync(async (req,res,next)=>{
    const data = await Solds.findAll({
        include: [
            {
                model: Users,
                required: false,
                where: {
                    status: true
                },
                attributes: { exclude: ['password'] }
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
            },
            {
                model: Products,
                required: false,
                where:{
                    status: true
                },
            }
        ],
    });

    if (!data.length) {
        return next(new AppError('Solds not found',404));
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
            userId,
            sectionId,
            campaignId,
            productId
        } = req.query;

    let sales = [];
    let parameters = [];

    const searchSales = await Solds.findAll({
        where:{
            status: true
        },
        include: [
            {
                model: Users,
                required: false,
                where: {
                    status: true
                },
                attributes: { exclude:['password'] }
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
            },
            {
                model: Products,
                required: false,
                where:{
                    status: true
                },
            }
        ]
    });

    const data = {
        startDate: new Date(startDate).getTime(),
        finishDate: new Date(finishDate).getTime(),
        campaignId: parseInt(campaignId),
        sectionId: parseInt(sectionId),
        productId: parseInt(productId),
        userId: parseInt(userId),
    };

    if (!data.startDate) {
        return next(new AppError('Please input a start date',404))
    }

    if (data.startDate > data.finishDate) {
        return next(new AppError('The end date cannot be greater than the start date',404));
    };

    if (!data.finishDate) {
        searchSales.map(sale=>{
            const saleDay = new Date(sale.dayTime).getTime();

            if ((saleDay >= data.startDate) && (saleDay <= data.startDate + 86400000)) {
                sales.push(sale)
            };
        });

        if (data.campaignId) {
            parameters = [];
            sales.map(sale=>{
                if (sale.campaignId === data.campaignId) {
                    parameters.push(sale)
                }
            });
            sales = parameters;
        };

        if (data.sectionId) {
            parameters = [];
            sales.map(sale=>{
                if (sale.sectionId === data.sectionId) {
                    parameters.push(sale)
                }
            });
            sales = parameters;
        };

        if (data.productId) {
            parameters = [];
            sales.map(sale=>{
                if (sale.productId === data.productId) {
                    parameters.push(sale)
                }
            });
            sales = parameters;
        };

        if (data.userId) {
            parameters = [];
            sales.map(sale=>{
                if (sale.userId === data.userId) {
                    parameters.push(sale)
                }
            });
            sales = parameters;
        };
    } else {
        const time = finishDate.split(" ");
        let finishDay = data.finishDate;
        if (time.length === 1) {
            finishDay = data.finishDate + 86400000;
        }
        searchSales.map(sale=>{
            const saleDay = new Date(sale.dayTime).getTime();

            if ((saleDay >= data.startDate) && (saleDay <= finishDay)) {
                sales.push(sale)
            };
        });

        if (data.campaignId) {
            parameters = [];
            sales.map(sale=>{
                if (sale.campaignId === data.campaignId) {
                    parameters.push(sale)
                }
            });
            sales = parameters;
        };

        if (data.sectionId) {
            parameters = [];
            sales.map(sale=>{
                if (sale.sectionId === data.sectionId) {
                    parameters.push(sale)
                }
            });
            sales = parameters;
        };

        if (data.productId) {
            parameters = [];
            sales.map(sale=>{
                if (sale.productId === data.productId) {
                    parameters.push(sale)
                }
            });
            sales = parameters;
        };

        if (data.userId) {
            parameters = [];
            sales.map(sale=>{
                if (sale.userId === data.userId) {
                    parameters.push(sale)
                }
            });
            sales = parameters;
        };
    }

    if (!sales.length) {
        return next(new AppError('Sales not found',404));
    };

    res.status(200).json({
        status:'success',
        sales
    });
});

module.exports = {
    create,
    update,
    deleted,
    getItems,
    getAllItems,
    getItem,
    getQuery
};
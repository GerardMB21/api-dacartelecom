//models
const { Advisers } = require("../models/SQL/advisers");
const { Campaigns } = require("../models/SQL/campaigns");
const { Products } = require("../models/SQL/products");
const { Roles } = require("../models/SQL/roles");
const { Sections } = require("../models/SQL/sections");
const { Solds } = require("../models/SQL/solds");
const { Turns } = require("../models/SQL/turns");
const { Users } = require("../models/SQL/users");
const { AppError } = require("../utils/appError");

//utils
const { catchAsync } = require("../utils/catchAsync");

//controllers
const create = catchAsync(async (req,res,next)=>{
    const { 
            sold,
            day_time,
            adviserId,
            userId,
            campaignId,
            sectionId,
            productId
        } = req.body;
    const actualDay = new Date(day_time);

    let newSold;

    newSold = await Solds.findOne({
        where:{
            day_time: actualDay,
            adviserId,
            productId,
            status: true
        }
    });

    if (!newSold) {
        newSold = await Solds.create({
            sold,
            day_time,
            adviserId,
            userId,
            campaignId,
            sectionId,
            productId
        });
    } else {
        await newSold.update({
            sold: parseInt(newSold.sold) + parseInt(sold)
        })
    };

    res.status(200).json({
        status: 'success',
        newSold
    });
});

const update = catchAsync(async (req,res,next)=>{
    const { sale } = req;
    const { sold } = req.body;

    await sale.update({
        sold
    });

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
})

const getItems = catchAsync(async (req,res,next)=>{
    const data = await Solds.findAll({
        where:{
            status: true
        },
        include: [
            {
                model: Advisers,
                include: [
                    {
                        model: Users,
                        attributes: ['id','email','name','last_name','img_profile','status']
                    },
                    {
                        model: Campaigns,
                        attributes: ['id','name','status']
                    },
                    {
                        model: Sections,
                        attributes: ['id','name','status']
                    },
                    {
                        model: Turns,
                        attributes: ['id','name','status']
                    }
                ],
                attributes: ['id','email','name','last_name','img_profile','status']
            },
            {
                model: Users,
                include: [
                    {
                        model: Roles,
                        attributes: ['id','name','status']
                    },
                    {
                        model: Campaigns,
                        attributes: ['id','name','status']
                    },
                    {
                        model: Sections,
                        attributes: ['id','name','status']
                    },
                    {
                        model: Turns,
                        attributes: ['id','name','entrance_time','exit_time','status']
                    }
                ],
                attributes: ['id','email','name','last_name','img_profile','status']
            },
            {
                model: Campaigns,
                attributes: ['id','name','status']
            },
            {
                model: Sections,
                attributes: ['id','name','status']
            },
            {
                model: Products,
                attributes: ['id','name','status']
            }
        ],
        attributes: ['id','sold','day_time','createdAt','updatedAt']
    });

    res.status(200).json({
        status: 'success',
        data
    })
})

const getQuery = catchAsync(async (req,res,next)=>{
    const { 
            startDate,
            finishDate,
            adviserId,
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
                model: Advisers,
                include: [
                    {
                        model: Users,
                        attributes: ['id','email','name','last_name','img_profile','status']
                    },
                    {
                        model: Campaigns,
                        attributes: ['id','name','status']
                    },
                    {
                        model: Sections,
                        attributes: ['id','name','status']
                    },
                    {
                        model: Turns,
                        attributes: ['id','name','status']
                    }
                ],
                attributes: ['id','email','name','last_name','img_profile','status']
            },
            {
                model: Users,
                include: [
                    {
                        model: Roles,
                        attributes: ['id','name','status']
                    },
                    {
                        model: Campaigns,
                        attributes: ['id','name','status']
                    },
                    {
                        model: Sections,
                        attributes: ['id','name','status']
                    },
                    {
                        model: Turns,
                        attributes: ['id','name','entrance_time','exit_time','status']
                    }
                ],
                attributes: ['id','email','name','last_name','img_profile','status']
            },
            {
                model: Campaigns,
                attributes: ['id','name','status']
            },
            {
                model: Sections,
                attributes: ['id','name','status']
            },
            {
                model: Products,
                attributes: ['id','name','status']
            }
        ],
        attributes: ['id','sold','day_time','adviserId','userId','campaignId','sectionId','productId','createdAt','updatedAt']
    });

    const data = {
        startDate: new Date(startDate).getTime(),
        finishDate: new Date(finishDate).getTime(),
        campaignId: parseInt(campaignId),
        sectionId: parseInt(sectionId),
        productId: parseInt(productId),
        userId: parseInt(userId),
        adviserId: parseInt(adviserId),
    };

    if (!data.startDate) {
        return next(new AppError('Please input a start date',404))
    }

    if (!data.finishDate) {
        searchSales.map(sale=>{
            const saleDay = new Date(sale.day_time).getTime();

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

        if (data.adviserId) {
            parameters = [];
            sales.map(sale=>{
                if (sale.adviserId === data.adviserId) {
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
            const saleDay = new Date(sale.day_time).getTime();

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

        if (data.adviserId) {
            parameters = [];
            sales.map(sale=>{
                if (sale.adviserId === data.adviserId) {
                    parameters.push(sale)
                }
            });
            sales = parameters;
        };
    }

    if (!sales.length) {
        return next(new AppError('Sales not found',404));
    };

    sales.map(sale=>{
        sale.adviserId = undefined,
        sale.userId = undefined,
        sale.campaignId = undefined,
        sale.sectionId = undefined,
        sale.productId = undefined
    })

    res.status(200).json({
        status:'success',
        sales
    });
})

module.exports = {
    create,
    update,
    deleted,
    getItems,
    getQuery
};
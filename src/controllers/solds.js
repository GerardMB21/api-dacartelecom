//models
const { Advisers } = require("../models/SQL/advisers");
const { Campaigns } = require("../models/SQL/campaigns");
const { Products } = require("../models/SQL/products");
const { Roles } = require("../models/SQL/roles");
const { Sections } = require("../models/SQL/sections");
const { Solds } = require("../models/SQL/solds");
const { Turns } = require("../models/SQL/turns");
const { Users } = require("../models/SQL/users");

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

module.exports = {
    create,
    update,
    deleted,
    getItems
};
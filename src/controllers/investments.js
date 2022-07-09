//models
const { Campaigns } = require("../models/SQL/campaigns");
const { Investments } = require("../models/SQL/investments");
const { Roles } = require("../models/SQL/roles");
const { Sections } = require("../models/SQL/sections");
const { Users } = require("../models/SQL/users");

//utils
const { catchAsync } = require("../utils/catchAsync");

//controllers
const create = catchAsync(async (req,res,next)=>{
    const { name,inversion,date,userId,campaignId,sectionId } = req.body;
    const actualDate = new Date(date);

    let newInvestment

    const updateInvestment = await Investments.findOne({
        where:{
            name,
            date: actualDate
        }
    });

    if (updateInvestment) {
        newInvestment = await updateInvestment.update({
            inversion: parseFloat(updateInvestment.inversion) + parseFloat(inversion)
        });
    } else {
        newInvestment = await Investments.create({
            name,
            inversion,
            date,
            userId,
            campaignId,
            sectionId
        });
    }

    res.status(200).json({
        status: 'success',
        newInvestment
    })
});

const update = catchAsync(async (req,res,next)=>{
    const { investment } = req;
    const { inversion } = req.body;

    await investment.update({
        inversion,
    });

    res.status(201).json({
        status: 'success'
    })
});

const deleted = catchAsync(async (req,res,next)=>{
    const { investment } = req;

    await investment.update({
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
                include:{
                    model:Roles,
                    attributes: ['id','name','status']
                },
                attributes: ['id','email','name','last_name','img_profile','status']
            },
            {
                model: Campaigns,
                attributes: ['id','name','status']
            },
            {
                model: Sections,
                attributes: ['id','name','status']
            }
        ],
        attributes: ['id','name','date','createdAt','updatedAt']
    });

    res.status(200).json({
        status: 'success',
        data
    })
});

module.exports = {
    create,
    update,
    deleted,
    getItems
};
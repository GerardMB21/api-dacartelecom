const { Campaigns } = require("../models/SQL/campaigns");
const { Sections } = require("../models/SQL/sections");
const { catchAsync } = require("../utils/catchAsync");

const getItems = catchAsync(async (req,res,next)=>{
    const data = await Sections.findAll({
        attributes:['id','name','createdAt','updatedAt'],
        include:[
            {
                model:Campaigns,
                attributes:['name']
            }
        ],
    });

    res.status(200).json({
        status: 'succes',
        data
    });
})

const getItem = (req,res)=>{

}

const createItem = catchAsync(async (req,res,next)=>{
    const { name,campaignId } = req.body;
    const newSection = await Sections.create({
        name,
        campaignId
    })
    
    res.status(201).json({
        status: 'succes',
        newSection
    })
})

const updateItem = (req,res)=>{

}

const deleteItem = (req,res)=>{

}

module.exports = {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
}
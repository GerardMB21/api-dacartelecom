const { Campaigns } = require("../models/SQL/campaigns");
const { catchAsync } = require("../utils/catchAsync");

const getItems = catchAsync(async (req,res,next)=>{
    const data = await Campaigns.findAll({
        attributes:['id','name','createdAt','updatedAt']
    });

    res.status(200).json({
        status: 'succes',
        data
    });
})

const getItem = (req,res)=>{

}

const createItem = catchAsync(async (req,res,next)=>{
    const { name } = req.body;
    const newCampaign = await Campaigns.create({
        name
    })
    
    res.status(201).json({
        status: 'succes',
        newCampaign
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
//models
const { Investments } = require("../models/investments");
const { Roles } = require("../models/roles");
const { Users } = require("../models/users");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

//controllers
const create = catchAsync(async (req,res,next)=>{
    const { user } = req;
    const { 
        name,
        investment,
        day
    } = req.body;
    const actualDate = new Date(day);

    let newInvestment

    const updateInvestment = await Investments.findOne({
        where:{
            name,
            day: actualDate
        }
    });

    if (updateInvestment) {
        newInvestment = await updateInvestment.update({
            investment: parseFloat(updateInvestment.investment) + parseFloat(investment)
        });
    } else {
        newInvestment = await Investments.create({
            name,
            investment,
            day,
            userId: user.id
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
    const { investment } = req;

    await investment.update({
        status: !investment.status
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
                    attributes: ['id','name','description','createdAt','updatedAt']
                },
                attributes: ['id','email','name','lastName','createdAt','updatedAt']
            }
        ],
        attributes: ['id','name','day','investment','createdAt','updatedAt']
    });

    res.status(200).json({
        status: 'success',
        data
    })
});

const getItemsAdmin = catchAsync(async (req,res,next)=>{
    const data = await Investments.findAll({
        where:{
            status: false
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
                    }
                },
                attributes: ['id','email','name','lastName','status','createdAt','updatedAt']
            }
        ],
        attributes: ['id','name','day','status','createdAt','updatedAt']
    });

    if (!data.length) {
        return next(new AppError('Investment not found',404));
    };

    res.status(200).json({
        status: 'success',
        data
    })
});

module.exports = {
    create,
    update,
    deleted,
    getItems,
    getItemsAdmin,
};
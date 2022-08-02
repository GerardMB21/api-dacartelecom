//Models
const { Campaigns } = require('../models/campaigns');
const { Goals } = require('../models/goal');
const { Roles } = require('../models/roles');
const { Sections } = require('../models/sections');
const { Users } = require('../models/users');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const goalExist = catchAsync(async (req,res,next)=>{
	const { goalId } = req.params;

	const goal = await Goals.findOne({ 
        where:{
		id: goalId,
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

	if (!goal) {
		return next(new AppError('Goal not found',404));
	}

	req.meta = goal

	next()
});

module.exports = {
	goalExist,
};
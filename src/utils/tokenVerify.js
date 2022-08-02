const jwt = require('jsonwebtoken');

//models
const { Users } = require("../models/users");
const { Roles } = require('../models/roles');

//utils
const { AppError } = require("./appError");
const { catchAsync } = require("./catchAsync");
const { Campaigns } = require('../models/campaigns');
const { Sections } = require('../models/sections');

const verifyToken = catchAsync(async (req,res,next)=>{
		let token;

		if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
			token = req.headers.authorization.split(" ")[1];
		};

		if (!token) {
			return next(new AppError('Invalid token', 403))
		}

		const decoded = await jwt.verify(token, process.env.JWT_SIGN);

		const user = await Users.findOne({
			where: {
				id: decoded.id,
				status: true
			}
		});

		if (!user) {
			return next(new AppError('The owner this token doesnt exist anymore',403))
		};

		const role = await Roles.findOne({
			where:{
				id:user.roleId,
				status: true
			}
		});

		const campaign = await Campaigns.findOne({
			where: {
				id: user.campaignId,
				status:true
			}
		});

		const section = await Sections.findOne({
			where: {
				id: user.sectionId,
				status: true
			}
		});

		req.userSession = {
			id: user.id,
			role: role.name,
			campaign: campaign.id,
			section: section.id
		};

		next();
	}
);

const onlyAdmin = catchAsync(async (req,res,next)=>{
	const { userSession } = req;

	if (userSession.role !== 'administrador') {
		return next(new AppError('You dont have permission',403));
	};

	next()
});

const permissions = catchAsync(async (req,res,next)=>{
	const { userSession } = req;
	const dont = ['counter','supervisor'];

	if (dont.includes(userSession.role)) {
		return next(new AppError('You dont have permission',403));
	};

	next();
})

module.exports = { 
	verifyToken,
	onlyAdmin,
	permissions
};
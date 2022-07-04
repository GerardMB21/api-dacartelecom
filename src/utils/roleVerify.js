const { AppError } = require("./appError");
const { catchAsync } = require("./catchAsync");
const jwt = require('jsonwebtoken');
const { Roles } = require("../models/SQL/roles");

const roleVerify = catchAsync(async (req,res,next)=>{
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(" ")[1];
	};

	if (!token) {
		return next(new AppError('Invalid token', 403))
	}

	const decoded = await jwt.verify(token, process.env.JWT_SIGN);

    const role = await Roles.findOne({ where:{
        id: decoded.role,
        status:true
    } })

    let permission = true

    if (role.dataValues.name !== "admin") {
        permission = false
    }

    req.permission = permission

    next();
});

module.exports = { roleVerify };
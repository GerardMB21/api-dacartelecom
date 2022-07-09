const { Users } = require("../models/SQL/users");
const { AppError } = require("./appError");
const jwt = require('jsonwebtoken');

const tokenVerify =async (req,res,next)=>{

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
	})

	if (!user) {
		return next(new AppError('The owner this token doesnt exist anymore',403))
	}

	req.userSession = {
		id: parseInt(decoded.id),
		role: parseInt(decoded.role)
	};

    next()
};

module.exports = { tokenVerify };
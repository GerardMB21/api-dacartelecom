const express = require('express');

//constrollers
const { create, update, getItems, getItem, getQuery } = require('../controllers/goal');

//middlewares
const { userExists } = require('../middlewares/users');
const { goalExist } = require('../middlewares/goal');

//validators
const { goalsValidator } = require('../validators/goal');

//utils
const { verifyToken } = require('../utils/tokenVerify');

const goalsRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
goalsRouter.post("/create/:id", verifyToken, userExists, goalsValidator,create);
goalsRouter.patch("/update/:goalId", verifyToken, goalExist,update);
goalsRouter.get("/", verifyToken,getItems);
goalsRouter.get("/:goalId", verifyToken, goalExist,getItem);
goalsRouter.get("/get/querys", verifyToken,getQuery);

module.exports = { goalsRouter };
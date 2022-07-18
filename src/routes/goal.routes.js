const express = require('express');

//constrollers
const { create, update, getItems, getItem, getQuery } = require('../controllers/goal');

//middlewares
const { userExists } = require('../middlewares/users');
const { goalExist } = require('../middlewares/goal');

//validators
const { goalsValidator } = require('../validators/goal');

//utils
const { verifyToken, onlyAdmin } = require('../utils/tokenVerify');

const goalsRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
goalsRouter.post("/create/:id", verifyToken, userExists, goalsValidator,create);
goalsRouter.patch("/update/:id", verifyToken, goalExist,update);
goalsRouter.get("/",getItems);
goalsRouter.get("/:id", goalExist,getItem);
goalsRouter.get("/get/querys",getQuery);
module.exports = { goalsRouter };
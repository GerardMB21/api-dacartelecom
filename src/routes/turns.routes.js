const express = require('express');

//controllers
const { create, update, deleted, getItems } = require('../controllers/turns');
const { turnExist } = require('../middlewares/turns');
const { verifyToken, onlyAdmin, notSupervisor } = require('../utils/tokenVerify');

//middlewares

//validators
const { turnsValidator } = require('../validators/turns');

const turnsRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
turnsRouter.post("/create", verifyToken, onlyAdmin, turnsValidator,create);
turnsRouter.patch("/update/:id", verifyToken, onlyAdmin, turnExist, turnsValidator,update);
turnsRouter.delete("/delete/:id", verifyToken, onlyAdmin, turnExist,deleted);
turnsRouter.get("/", verifyToken, notSupervisor,getItems);

module.exports = { turnsRouter };
const express = require('express');

//controllers
const { create, update, deleted, getItems } = require('../controllers/turns');
const { turnExist } = require('../middlewares/turns');

//middlewares

//validators
const { turnsValidator } = require('../validators/turns');

const turnsRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
turnsRouter.post("/create", turnsValidator,create);
turnsRouter.patch("/update/:id", turnExist, turnsValidator,update);
turnsRouter.delete("/delete/:id", turnExist,deleted);
turnsRouter.get("/",getItems);

module.exports = { turnsRouter };
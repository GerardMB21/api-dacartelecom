const express = require('express');

//controllers
const { create, update, deleted, getItems, getItem } = require('../controllers/data');
const { dataExist } = require('../middlewares/data');

//middlewres

//validators
const { dataValidator, updateValidator } = require('../validators/data');

const dataRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
dataRouter.post("/create", dataValidator,create);
dataRouter.patch("/update/:id", dataExist, updateValidator,update);
dataRouter.delete("/delete/:id", dataExist,deleted);
dataRouter.get("/",getItems);
dataRouter.get("/:id", dataExist,getItem);

module.exports = { dataRouter };
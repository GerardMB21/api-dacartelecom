const express = require('express');

//controllers
const { create, update, deleted, getItems, getItem, getPermission, updatePermission } = require('../controllers/data');

//utils
const { verifyToken, notSupervisor } = require('../utils/tokenVerify');

//middlewres
const { dataExist, allDataExist } = require('../middlewares/data');

//validators
const { dataValidator, updateValidator } = require('../validators/data');

const dataRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
dataRouter.post("/create", verifyToken, notSupervisor, dataValidator,create);
dataRouter.patch("/update/:id", verifyToken, notSupervisor, dataExist, updateValidator,update);
dataRouter.patch("/update/permission/:id", verifyToken, notSupervisor, allDataExist,updatePermission);
dataRouter.delete("/delete/:id", verifyToken, notSupervisor, dataExist,deleted);
dataRouter.get("/", verifyToken, notSupervisor,getItems);
dataRouter.get("/:id", verifyToken, notSupervisor, dataExist,getItem);
dataRouter.get("/permission/exists", verifyToken, notSupervisor,getPermission);

module.exports = { dataRouter };
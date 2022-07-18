const express = require('express');

//controllers
const { create, update, deleted, getItems, getPermission, permissionNull } = require('../controllers/files');

//middlewares
const { uploadMiddleware, fileExist } = require('../middlewares/files');

//validators
const { filesValidator } = require('../validators/files');

//utils
const { verifyToken, notSupervisor } = require('../utils/tokenVerify');

const filesRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
filesRouter.post("/create", verifyToken, notSupervisor, filesValidator, uploadMiddleware.single('file'),create);
filesRouter.patch("/update/:id", verifyToken, notSupervisor, fileExist,update);
filesRouter.delete("/delete/:id", verifyToken, notSupervisor, fileExist,deleted);
filesRouter.delete("/permission/:id", verifyToken, notSupervisor, fileExist,permissionNull);
filesRouter.get("/", verifyToken, notSupervisor,getItems);
filesRouter.get("/get/permission", verifyToken, notSupervisor,getPermission);

module.exports = { filesRouter };
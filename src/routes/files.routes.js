const express = require('express');

//controllers
const { create, update, deleted, getItems, getPermission, permissionNull } = require('../controllers/files');

//middlewares
const { uploadMiddleware, fileExist } = require('../middlewares/files');

//validators
const { filesValidator } = require('../validators/files');

//utils
const { verifyToken } = require('../utils/tokenVerify');

const filesRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
filesRouter.post("/create", verifyToken, filesValidator, uploadMiddleware.single('file'),create);
filesRouter.patch("/update/:fileId", verifyToken, fileExist,update);
filesRouter.delete("/delete/:fileId", verifyToken, fileExist,deleted);
filesRouter.delete("/permission/:fileId", verifyToken, fileExist,permissionNull);
filesRouter.get("/", verifyToken,getItems);
filesRouter.get("/get/permission", verifyToken,getPermission);

module.exports = { filesRouter };
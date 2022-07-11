const express = require('express');

//controllers
const { create, deleted } = require('../controllers/storage');
const { uploadMiddleware, fileExist } = require('../middlewares/storage');

//utils
const { verifyToken, notSupervisor } = require('../utils/tokenVerify');

//middlewares

//validators

const storageRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
storageRouter.post("/create", verifyToken, notSupervisor, uploadMiddleware.single("file"),create);
storageRouter.delete("/delete/:id", verifyToken, notSupervisor, fileExist,deleted)

module.exports = { storageRouter };
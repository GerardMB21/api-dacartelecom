const express = require('express');

//controller
const { create, update, deleted, getItems, getAllItems, getQuery } = require('../controllers/investments');

//middlewares
const { investmentExist } = require('../middlewares/investments');
const { campaignExist } = require('../middlewares/campaigns');
const { sectionExist } = require('../middlewares/sections');

//validators
const { investmentsValidator } = require('../validators/investments');

//utils
const { verifyToken, onlyAdmin, permissions } = require('../utils/tokenVerify');

const investmentsRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
investmentsRouter.post("/create/:campaignId/:sectionId", verifyToken, permissions, campaignExist, sectionExist, investmentsValidator,create);
investmentsRouter.patch("/update/:investmentId", verifyToken, onlyAdmin, investmentExist,update);
investmentsRouter.delete("/delete/:investmentId", verifyToken, onlyAdmin, investmentExist,deleted);
investmentsRouter.get("/", verifyToken,getItems);
investmentsRouter.get("/get/all", verifyToken, onlyAdmin,getAllItems);
investmentsRouter.get("/get/querys", verifyToken,getQuery);

module.exports = { investmentsRouter };
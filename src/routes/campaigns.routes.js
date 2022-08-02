const express = require('express');

//controllers
const { create, update, deleted, getItems, getItem, getAllItems } = require('../controllers/campaigns');

//middlewares
const { campaignExist, campaignStatus } = require('../middlewares/campaigns');

//validators
const { campaignsValidator } = require('../validators/campaigns');

//utils
const { verifyToken, onlyAdmin } = require('../utils/tokenVerify');

const campaignsRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
campaignsRouter.post("/create", verifyToken, onlyAdmin, campaignsValidator,create);
campaignsRouter.patch("/update/:campaignId", verifyToken, onlyAdmin, campaignExist,update);
campaignsRouter.delete("/delete/:campaignId", verifyToken, onlyAdmin,deleted);
campaignsRouter.get("/get/all", verifyToken, onlyAdmin,getAllItems);
campaignsRouter.get("/", verifyToken,getItems);
campaignsRouter.get("/:campaignId", verifyToken, campaignExist,getItem);

module.exports = { campaignsRouter };
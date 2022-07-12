const express = require('express');

//controllers
const { create, update, deleted, getItems } = require('../controllers/campaigns');

//middlewares
const { campaignExist } = require('../middlewares/campaigns');
const { verifyToken, onlyAdmin, notSupervisor } = require('../utils/tokenVerify');

//validators
const { campignsValidator } = require('../validators/campaigns');

const campaignsRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
campaignsRouter.post("/create", verifyToken, onlyAdmin, campignsValidator,create);
campaignsRouter.patch("/update/:id", verifyToken, onlyAdmin, campaignExist, campignsValidator,update);
campaignsRouter.delete("/delete/:id", verifyToken, onlyAdmin, campaignExist,deleted);
campaignsRouter.get("/",getItems);

module.exports = { campaignsRouter };
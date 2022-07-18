const express = require('express');

//controllers
const { create, update, deleted, getItems, getItemsAdmin, getItem } = require('../controllers/campaigns');

//middlewares
const { campaignExist, campaignStatus } = require('../middlewares/campaigns');

//validators
const { campaignsValidator } = require('../validators/campaigns');

//utils
const { verifyToken, onlyAdmin } = require('../utils/tokenVerify');

const campaignsRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
campaignsRouter.post("/create", verifyToken, onlyAdmin, campaignsValidator,create);
campaignsRouter.patch("/update/:id", verifyToken, onlyAdmin, campaignExist,update);
campaignsRouter.delete("/delete/:id", verifyToken, onlyAdmin, campaignStatus,deleted);
campaignsRouter.get("/only/admin", verifyToken, onlyAdmin,getItemsAdmin);
campaignsRouter.get("/",getItems);
campaignsRouter.get("/:id", verifyToken, campaignExist,getItem);

module.exports = { campaignsRouter };
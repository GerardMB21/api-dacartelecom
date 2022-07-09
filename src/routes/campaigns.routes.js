const express = require('express');

//controllers
const { create, update, deleted, getItems } = require('../controllers/campaigns');

//middlewares
const { campaignExist } = require('../middlewares/campaigns');

//validators
const { campignsValidator } = require('../validators/campaigns');

const campaignsRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
campaignsRouter.post("/create", campignsValidator,create);
campaignsRouter.patch("/update/:id", campaignExist, campignsValidator,update);
campaignsRouter.delete("/delete/:id", campaignExist,deleted);
campaignsRouter.get("/",getItems);

module.exports = { campaignsRouter };
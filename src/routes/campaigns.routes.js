const express = require('express');

const { getItems, getItem, createItem } = require('../controllers/campaigns');
const { campignsValidator } = require('../validators/campaigns');

const campaignsRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
campaignsRouter.get("/",getItems);
campaignsRouter.post("/", campignsValidator,createItem);

module.exports = { campaignsRouter };
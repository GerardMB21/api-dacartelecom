const express = require('express');

const { getItems, createItem } = require('../controllers/sections');
const { sectionsValidator } = require('../validators/sections');

const sectionsRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
sectionsRouter.get("/",getItems);
sectionsRouter.post("/", sectionsValidator,createItem);

module.exports = { sectionsRouter };
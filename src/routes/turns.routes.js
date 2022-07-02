const express = require('express');

const { getItems, createItem } = require('../controllers/turns');
const { turnsValidator } = require('../validators/turns');

const turnsRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
turnsRouter.get("/",getItems);
turnsRouter.post("/", turnsValidator,createItem);

module.exports = { turnsRouter };
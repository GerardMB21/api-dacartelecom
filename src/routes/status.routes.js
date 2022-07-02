const express = require('express');

const { getItems, createItem } = require('../controllers/status');
const { statusValidator } = require('../validators/status');

const statusRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
statusRouter.get("/",getItems);
statusRouter.post("/", statusValidator,createItem);

module.exports = { statusRouter };
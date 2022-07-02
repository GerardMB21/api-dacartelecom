const express = require('express');

const { getItems, getItem, createItem } = require('../controllers/roles');
const { rolesValidator } = require('../validators/roles');

const rolesRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
rolesRouter.get("/",getItems);
rolesRouter.post("/", rolesValidator,createItem);

module.exports = { rolesRouter };
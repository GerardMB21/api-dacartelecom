const express = require('express');

const { getItems, createItem, loginItem } = require('../controllers/users');
const { userValidator } = require('../validators/users');

const usersRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
usersRouter.get("/",getItems);
usersRouter.post("/", userValidator,createItem);
usersRouter.post("/login",loginItem);

module.exports = { usersRouter };
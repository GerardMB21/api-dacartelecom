const express = require('express');

//controllers
const { create, update, deleted, getItems, getItem } = require('../controllers/users');

//middlewares
const { userExists } = require('../middlewares/users');

//validators
const { userValidator, updateValidator } = require('../validators/users');

const usersRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
usersRouter.post("/create", userValidator,create);
usersRouter.patch("/update/:id", userExists, updateValidator,update);
usersRouter.delete("/delete/:id", userExists,deleted);
usersRouter.get("/",getItems);
usersRouter.get("/:id", userExists,getItem);

module.exports = { usersRouter };
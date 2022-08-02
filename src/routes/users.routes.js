const express = require('express');

//controllers
const { create, update, deleted, getItems, getItem, login, updatePassword, getQuery, getAllItems } = require('../controllers/users');

//middlewares
const { userExists } = require('../middlewares/users');

//validators
const { userValidator } = require('../validators/users');

//utils
const { verifyToken, onlyAdmin } = require('../utils/tokenVerify');

const usersRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
usersRouter.post("/create", verifyToken, onlyAdmin, userValidator,create);
usersRouter.post("/login",login);
usersRouter.patch("/update/:id", verifyToken, onlyAdmin, userExists,update);
usersRouter.patch("/update/password/:id", verifyToken, userExists,updatePassword);
usersRouter.delete("/delete/:id", verifyToken, onlyAdmin, userExists,deleted);
usersRouter.get("/", verifyToken,getItems);
usersRouter.get("/:id", verifyToken, userExists,getItem);
usersRouter.get("/get/querys", verifyToken,getQuery);
usersRouter.get("/get/all", verifyToken, onlyAdmin,getAllItems);

module.exports = { usersRouter };
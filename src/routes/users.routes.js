const express = require('express');

//controllers
const { create, update, deleted, getItems, getItem, login, updatePassword, getItemQuery, updatePasswordAdmin, getItemsAdmin } = require('../controllers/users');

//middlewares
const { userExists, userstatus } = require('../middlewares/users');

//validators
const { userValidator, passwordValidator } = require('../validators/users');

//utils
const { verifyToken, onlyAdmin, notSupervisor } = require('../utils/tokenVerify');

const usersRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
usersRouter.post("/create", verifyToken, onlyAdmin, userValidator,create);
usersRouter.post("/login",login);
usersRouter.patch("/update/:id", verifyToken, onlyAdmin, userExists,update);
usersRouter.patch("/update/password/:id", verifyToken, userExists, passwordValidator,updatePassword);
usersRouter.patch("/update/password/admin/:id", verifyToken, onlyAdmin, userExists, passwordValidator,updatePasswordAdmin);
usersRouter.delete("/delete/:id", verifyToken, onlyAdmin, userstatus,deleted);
usersRouter.get("/", verifyToken, notSupervisor,getItems);
usersRouter.get("/:id", verifyToken, notSupervisor, userExists,getItem);
usersRouter.get("/by/query", verifyToken, notSupervisor,getItemQuery);
usersRouter.get("/status/false", verifyToken, onlyAdmin,getItemsAdmin);

module.exports = { usersRouter };
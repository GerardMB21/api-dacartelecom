const express = require('express');

//controllers
const { create, update, deleted, getItems, getItem, login, updatePassword, getItemQuery, updatePasswordAdmin } = require('../controllers/users');

//middlewares
const { userExists } = require('../middlewares/users');
const { verifyToken, onlyAdmin, notSupervisor } = require('../utils/tokenVerify');

//validators
const { userValidator, updateValidator, passwordValidator } = require('../validators/users');

const usersRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
usersRouter.post("/create", userValidator,create);
usersRouter.post("/login",login);
usersRouter.patch("/update/:id", verifyToken, onlyAdmin, userExists, updateValidator,update);
usersRouter.patch("/update/password/:id", verifyToken, userExists, passwordValidator,updatePassword);
usersRouter.patch("/update/password/admin/:id", verifyToken, onlyAdmin, userExists, passwordValidator,updatePasswordAdmin);
usersRouter.delete("/delete/:id", verifyToken, onlyAdmin, userExists,deleted);
usersRouter.get("/", verifyToken, notSupervisor,getItems);
usersRouter.get("/:id", verifyToken, notSupervisor, userExists,getItem);
usersRouter.get("/by/query", verifyToken, notSupervisor,getItemQuery);

module.exports = { usersRouter };
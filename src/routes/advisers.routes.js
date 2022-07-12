const express = require('express');

//controllers
const { create, update, deleted, getItems, getItem, updatePassword, login, updatePasswordAdmin } = require('../controllers/advisers');

//utils
const { verifyToken, onlyAdmin, verifyTokenAdviser } = require('../utils/tokenVerify');

//middlewares
const { adviserExists } = require('../middlewares/advisers');

//validators
const { adviserValidator, updateValidator, passwordValidator } = require('../validators/advisers');

const advisersRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
advisersRouter.post("/create", verifyToken, onlyAdmin, adviserValidator,create);
advisersRouter.post("/login",login);
advisersRouter.patch("/update/:id", verifyToken, onlyAdmin, adviserExists, updateValidator,update);
advisersRouter.patch("/update/password/:id", verifyTokenAdviser, adviserExists, passwordValidator,updatePasswordAdmin);
advisersRouter.patch("/update/password/admin/:id", verifyToken, onlyAdmin, adviserExists, passwordValidator,updatePassword);
advisersRouter.delete("/delete/:id", verifyToken, onlyAdmin, adviserExists,deleted);
advisersRouter.get("/", verifyToken,getItems);
advisersRouter.get("/:id", verifyToken, adviserExists,getItem);

module.exports = { advisersRouter };
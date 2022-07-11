const express = require('express');

//controllers
const { create, update, deleted, getItems, getItem, updatePassword } = require('../controllers/advisers');
const { adviserExists } = require('../middlewares/advisers');
const { verifyToken, onlyAdmin } = require('../utils/tokenVerify');

//middlewares

//validators
const { adviserValidator, updateValidator, passwordValidator } = require('../validators/advisers');

const advisersRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
advisersRouter.post("/create", verifyToken, onlyAdmin, adviserValidator,create);
advisersRouter.patch("/update/:id", verifyToken, onlyAdmin, adviserExists, updateValidator,update);
advisersRouter.patch("/update/password/:id", verifyToken, adviserExists, passwordValidator,updatePassword);
advisersRouter.delete("/delete/:id", verifyToken, onlyAdmin, adviserExists,deleted);
advisersRouter.get("/", verifyToken,getItems);
advisersRouter.get("/:id", verifyToken, adviserExists,getItem);

module.exports = { advisersRouter };
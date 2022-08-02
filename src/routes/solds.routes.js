const express = require('express');

//constrollers
const { create, update, deleted, getItems, getQuery, getItem, getAllItems } = require('../controllers/solds');

//middlewares
const { soldExist } = require('../middlewares/solds');
const { userExists } = require('../middlewares/users');
const { productExist } = require('../middlewares/products');

//validators
const { soldsValidator } = require('../validators/solds');

//utils
const { verifyToken, onlyAdmin } = require('../utils/tokenVerify');

const soldsRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
soldsRouter.post("/create/:id/:productId", verifyToken, userExists, productExist, soldsValidator,create);
soldsRouter.patch("/update/:soldId", verifyToken, onlyAdmin, soldExist,update);
soldsRouter.delete("/delete/:soldId", verifyToken, onlyAdmin, soldExist,deleted);
soldsRouter.get("/", verifyToken,getItems);
soldsRouter.get("/:soldId", verifyToken, soldExist,getItem);
soldsRouter.get("/get/all", verifyToken, onlyAdmin,getAllItems);
soldsRouter.get("/get/querys", verifyToken,getQuery);

module.exports = { soldsRouter };
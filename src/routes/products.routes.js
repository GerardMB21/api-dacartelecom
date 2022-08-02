const express = require('express');

//controllers
const { create, update, getItems, deleted, getQuery, getAllItems } = require('../controllers/products');

//middlewares
const { productExist } = require('../middlewares/products');
const { verifyToken, onlyAdmin } = require('../utils/tokenVerify');

//validators
const { productsValidator } = require('../validators/products');

const productsRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
productsRouter.post("/create", verifyToken, onlyAdmin, productsValidator,create);
productsRouter.patch("/update/:productId", verifyToken, onlyAdmin, productExist,update);
productsRouter.delete("/delete/:productId", verifyToken, onlyAdmin, productExist,deleted);
productsRouter.get("/",getItems);
productsRouter.get("/get/all", verifyToken, onlyAdmin,getAllItems);
productsRouter.get("/get/querys", verifyToken,getQuery);

module.exports = { productsRouter };
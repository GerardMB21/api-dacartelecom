const express = require('express');

//controllers
const { create, update, getItems } = require('../controllers/products');

//middlewares
const { productExist } = require('../middlewares/products');
const { verifyToken, onlyAdmin } = require('../utils/tokenVerify');

//validators
const { productsValidator, updateValidator } = require('../validators/products');

const productsRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
productsRouter.post("/create", verifyToken, onlyAdmin, productsValidator,create);
productsRouter.patch("/update/:id", verifyToken, onlyAdmin, productExist, updateValidator,update);
productsRouter.delete("/delete/:id", verifyToken, onlyAdmin, productExist,update);
productsRouter.get("/", verifyToken,getItems);

module.exports = { productsRouter };
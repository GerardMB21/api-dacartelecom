const express = require('express');

//controllers
const { create, update, getItems } = require('../controllers/products');

//middlewares
const { productExist } = require('../middlewares/products');

//validators
const { productsValidator, updateValidator } = require('../validators/products');

const productsRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
productsRouter.post("/create", productsValidator,create);
productsRouter.patch("/update/:id", productExist, updateValidator,update);
productsRouter.delete("/delete/:id", productExist,update);
productsRouter.get("/",getItems);

module.exports = { productsRouter };
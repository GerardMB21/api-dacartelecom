const express = require('express');

//controllers
const { create, update, getItems, deleted, getItemsAdmin } = require('../controllers/products');

//middlewares
const { productExist, productStatus } = require('../middlewares/products');
const { verifyToken, onlyAdmin } = require('../utils/tokenVerify');

//validators
const { productsValidator } = require('../validators/products');

const productsRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
productsRouter.post("/create", verifyToken, onlyAdmin, productsValidator,create);
productsRouter.patch("/update/:id", verifyToken, onlyAdmin, productExist,update);
productsRouter.delete("/delete/:id", verifyToken, onlyAdmin, productStatus,deleted);
productsRouter.get("/",getItems);
productsRouter.get("/admin", verifyToken, onlyAdmin,getItemsAdmin);

module.exports = { productsRouter };
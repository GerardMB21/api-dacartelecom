const express = require('express');

//constrollers
const { create, update, deleted, getItems, getQuery, getItem, getItemsAdmin } = require('../controllers/solds');

//middlewares
const { adviserExists } = require('../middlewares/advisers');
const { soldExist, soldStatus } = require('../middlewares/solds');

//validators
const { soldsValidator } = require('../validators/solds');

//utils
const { verifyToken, onlyAdmin } = require('../utils/tokenVerify');

const soldsRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
soldsRouter.post("/create/:adviserId", verifyToken, adviserExists, soldsValidator,create);
soldsRouter.patch("/update/:soldId", verifyToken, onlyAdmin, soldExist,update);
soldsRouter.delete("/delete/:soldId", verifyToken, onlyAdmin, soldStatus,deleted);
soldsRouter.get("/",getItems);
soldsRouter.get("/status/false", verifyToken, onlyAdmin,getItemsAdmin)
soldsRouter.get("/:soldId", verifyToken, soldExist,getItem);
soldsRouter.get("/get/querys",getQuery);

module.exports = { soldsRouter };
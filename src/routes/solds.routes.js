const express = require('express');

//constrollers
const { create, update, deleted, getItems, getQuery } = require('../controllers/solds');

//middlewares
const { soldExist } = require('../middlewares/solds');
const { verifyToken, onlyAdmin } = require('../utils/tokenVerify');

//validators
const { soldsValidator, updateValidator } = require('../validators/solds');

const soldsRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
soldsRouter.post("/create", verifyToken, soldsValidator,create);
soldsRouter.patch("/update/:id", verifyToken, onlyAdmin, soldExist, updateValidator,update);
soldsRouter.delete("/delete/:id", verifyToken, onlyAdmin, soldExist,deleted);
soldsRouter.get("/",getItems);
soldsRouter.get("/query", verifyToken,getQuery);

module.exports = { soldsRouter };
const express = require('express');

//constrollers
const { create, update, deleted, getItems } = require('../controllers/solds');

//middlewares
const { soldExist } = require('../middlewares/solds');

//validators
const { soldsValidator, updateValidator } = require('../validators/solds');

const soldsRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
soldsRouter.post("/create", soldsValidator,create);
soldsRouter.patch("/update/:id", soldExist, updateValidator,update);
soldsRouter.delete("/delete/:id", soldExist,deleted);
soldsRouter.get("/",getItems)

module.exports = { soldsRouter };
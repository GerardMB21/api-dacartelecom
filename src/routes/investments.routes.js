const express = require('express');

//controller
const { create, update, deleted, getItems } = require('../controllers/investments');

//middlewares
const { investmentExist } = require('../middlewares/investments');

//validators
const { investmentsValidator, updateValidator } = require('../validators/investments');

const investmentsRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
investmentsRouter.post("/create", investmentsValidator,create);
investmentsRouter.patch("/update/:id", investmentExist, updateValidator,update);
investmentsRouter.delete("/delete/:id", investmentExist,deleted);
investmentsRouter.get("/", getItems);

module.exports = { investmentsRouter };
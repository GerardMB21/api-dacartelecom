const express = require('express');

//controller
const { create, update, deleted, getItems } = require('../controllers/investments');

//middlewares
const { investmentExist } = require('../middlewares/investments');
const { verifyToken, onlyAdmin, notSupervisor, permissions } = require('../utils/tokenVerify');

//validators
const { investmentsValidator, updateValidator } = require('../validators/investments');

const investmentsRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
investmentsRouter.post("/create", verifyToken, permissions, investmentsValidator,create);
investmentsRouter.patch("/update/:id", verifyToken, onlyAdmin, investmentExist, updateValidator,update);
investmentsRouter.delete("/delete/:id", verifyToken, onlyAdmin, investmentExist,deleted);
investmentsRouter.get("/", verifyToken, permissions,getItems);

module.exports = { investmentsRouter };
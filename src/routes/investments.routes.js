const express = require('express');

//controller
const { create, update, deleted, getItems, getItemsAdmin } = require('../controllers/investments');

//middlewares
const { investmentExist, investmentStatus } = require('../middlewares/investments');
const { userExists } = require('../middlewares/users');

//validators
const { investmentsValidator } = require('../validators/investments');

//utils
const { verifyToken, onlyAdmin, permissions } = require('../utils/tokenVerify');

const investmentsRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
investmentsRouter.post("/create/:id", verifyToken, permissions, userExists, investmentsValidator,create);
investmentsRouter.patch("/update/:investmentId", verifyToken, onlyAdmin, investmentExist,update);
investmentsRouter.delete("/delete/:investmentId", verifyToken, onlyAdmin, investmentStatus,deleted);
investmentsRouter.get("/", verifyToken, permissions,getItems);
investmentsRouter.get("/status/false", verifyToken, onlyAdmin,getItemsAdmin);

module.exports = { investmentsRouter };
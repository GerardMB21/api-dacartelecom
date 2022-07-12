const express = require('express');

//controllers
const { create, update, deleted, getItems } = require('../controllers/sections');
const { sectionExist } = require('../middlewares/sections');
const { verifyToken, onlyAdmin, notSupervisor } = require('../utils/tokenVerify');

//middlewares

//validators
const { sectionsValidator, updateValidator } = require('../validators/sections');

const sectionsRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
sectionsRouter.post("/create", verifyToken, onlyAdmin, sectionsValidator,create);
sectionsRouter.patch("/update/:id", verifyToken, onlyAdmin, sectionExist, updateValidator,update);
sectionsRouter.delete("/delete/:id", verifyToken, onlyAdmin, sectionExist,deleted);
sectionsRouter.get("/",getItems);

module.exports = { sectionsRouter };
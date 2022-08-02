const express = require('express');

//controllers
const { create, update, deleted, getItems, getItem, getAllItems } = require('../controllers/sections');

//middlewares
const { sectionExist } = require('../middlewares/sections');

//validators
const { sectionsValidator } = require('../validators/sections');

//utils
const { verifyToken, onlyAdmin } = require('../utils/tokenVerify');

const sectionsRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
sectionsRouter.post("/create", verifyToken, onlyAdmin, sectionsValidator,create);
sectionsRouter.patch("/update/:id", verifyToken, onlyAdmin, sectionExist,update);
sectionsRouter.delete("/delete/:id", verifyToken, onlyAdmin, sectionExist,deleted);
sectionsRouter.get("/get/all", verifyToken, onlyAdmin,getAllItems);
sectionsRouter.get("/", verifyToken,getItems);
sectionsRouter.get("/:id", verifyToken,getItem);

module.exports = { sectionsRouter };
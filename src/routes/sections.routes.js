const express = require('express');

//controllers
const { create, update, deleted, getItems, getItemsAdmin, getItem } = require('../controllers/sections');

//middlewares
const { sectionExist, sectionStatus } = require('../middlewares/sections');

//validators
const { sectionsValidator } = require('../validators/sections');

//utils
const { verifyToken, onlyAdmin } = require('../utils/tokenVerify');

const sectionsRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
sectionsRouter.post("/create", verifyToken, onlyAdmin, sectionsValidator,create);
sectionsRouter.patch("/update/:id", verifyToken, onlyAdmin, sectionExist,update);
sectionsRouter.delete("/delete/:id", verifyToken, onlyAdmin, sectionStatus,deleted);
sectionsRouter.get("/admin", verifyToken, onlyAdmin,getItemsAdmin);
sectionsRouter.get("/",getItems);
sectionsRouter.get("/byid/:id",getItem);

module.exports = { sectionsRouter };
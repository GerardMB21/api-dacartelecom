const express = require('express');

//controllers
const { create, update, deleted, getItems } = require('../controllers/roles');

//middlewares
const { roleExist } = require('../middlewares/roles');
const { verifyToken, onlyAdmin } = require('../utils/tokenVerify');

//validators
const { rolesValidator } = require('../validators/roles');

const rolesRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
rolesRouter.post("/create", rolesValidator,create);
rolesRouter.patch("/update/:id", verifyToken, onlyAdmin, roleExist, rolesValidator,update);
rolesRouter.delete("/delete/:id", verifyToken, onlyAdmin, roleExist,deleted);
rolesRouter.get("/", verifyToken, onlyAdmin,getItems);

module.exports = { rolesRouter };
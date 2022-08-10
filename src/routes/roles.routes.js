const express = require('express');

//controllers
const { create, update, deleted, getItems } = require('../controllers/roles');

//middlewares
const { roleExist } = require('../middlewares/roles');

//validators
const { rolesValidator } = require('../validators/roles');

//utils
const { verifyToken, onlyAdmin } = require('../utils/tokenVerify');

const rolesRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
rolesRouter.post("/create", verifyToken, onlyAdmin, rolesValidator,create);
rolesRouter.patch("/update/:id", verifyToken, onlyAdmin, roleExist,update);
rolesRouter.delete("/delete/:id", verifyToken, onlyAdmin, roleExist,deleted);
rolesRouter.get("/", verifyToken,getItems);

module.exports = { rolesRouter };
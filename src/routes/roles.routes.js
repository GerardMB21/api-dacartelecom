const express = require('express');

//controllers
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/roles');

//middlewares
const { rolePermission, roleExist } = require('../middlewares/roles');

//utils
const { roleVerify } = require('../utils/roleVerify');
const { tokenVerify } = require('../utils/tokenVerify');

//validators
const { rolesValidator } = require('../validators/roles');

const rolesRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
rolesRouter.get("/", tokenVerify,getItems);
rolesRouter.post("/", rolesValidator, roleVerify, tokenVerify, rolePermission,createItem);

//params
rolesRouter.get("/:id", roleExist, roleVerify, tokenVerify, rolePermission,getItem);
rolesRouter.patch("/:id", roleExist, roleVerify, tokenVerify, rolePermission,updateItem);
rolesRouter.delete("/:id", roleExist, roleVerify, tokenVerify, rolePermission,deleteItem);

module.exports = { rolesRouter };
const express = require('express');

//controllers
const { getItems, createItem, loginItem, getItem, updateItem, deleteItem, searchRole, searchCampaign, searchSection } = require('../controllers/users');

//middlewares
const { userExists, userRole, userPermission, userRolePermission, userCampaign, userSection } = require('../middlewares/users');

//utils
const { roleVerify } = require('../utils/roleVerify');
const { tokenVerify } = require('../utils/tokenVerify');

//validators
const { userCreateValidator, userUpdateValidator } = require('../validators/users');

const usersRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
usersRouter.get("/", roleVerify,getItems);
usersRouter.post("/", userCreateValidator,createItem);
usersRouter.post("/login",loginItem);

//params
usersRouter.get("/:id", userExists, roleVerify, tokenVerify, userPermission,getItem);
usersRouter.patch("/:id", userExists, roleVerify, tokenVerify, userUpdateValidator, userPermission,updateItem);
usersRouter.delete("/:id", userExists, roleVerify, tokenVerify, userPermission,deleteItem);

//querys
usersRouter.get("/search/role", userRole, roleVerify, tokenVerify, userRolePermission,searchRole);
usersRouter.get("/search/campaign", userCampaign, roleVerify, tokenVerify,searchCampaign);
usersRouter.get("/search/section", userSection, roleVerify, tokenVerify,searchSection);

module.exports = { usersRouter };
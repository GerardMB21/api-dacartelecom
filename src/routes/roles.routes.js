const express = require('express');

//controllers
const { create, update, deleted, getItems } = require('../controllers/roles');

//middlewares
const { roleExist } = require('../middlewares/roles');

//validators
const { rolesValidator } = require('../validators/roles');

const rolesRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
rolesRouter.post("/create", rolesValidator,create);
rolesRouter.patch("/update/:id", roleExist, rolesValidator,update);
rolesRouter.delete("/delete/:id", roleExist,deleted);
rolesRouter.get("/",getItems);

module.exports = { rolesRouter };
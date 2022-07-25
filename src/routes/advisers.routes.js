const express = require('express');

//controllers
const { create, update, deleted, getItems, getItem, getItemsAdmin, getQuery } = require('../controllers/advisers');

//utils
const { verifyToken, onlyAdmin } = require('../utils/tokenVerify');

//middlewares
const { adviserExists, adviserStatus } = require('../middlewares/advisers');
const { userExists } = require('../middlewares/users');

//validators
const { adviserValidator } = require('../validators/advisers');

const advisersRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
advisersRouter.post("/create/:id", verifyToken, onlyAdmin, userExists, adviserValidator,create);
advisersRouter.patch("/update/:adviserId", verifyToken, onlyAdmin, adviserExists,update);
advisersRouter.delete("/delete/:adviserId", verifyToken, onlyAdmin, adviserStatus,deleted);
advisersRouter.get("/",getItems);
advisersRouter.get("/:adviserId", verifyToken, adviserExists,getItem);
advisersRouter.get("/only/admin", verifyToken, onlyAdmin,getItemsAdmin);
advisersRouter.get("/get/query",getQuery);

module.exports = { advisersRouter };
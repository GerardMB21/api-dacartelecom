const express = require('express');

//controllers
const { create, update, deleted, getItems, getItem } = require('../controllers/advisers');
const { adviserExists } = require('../middlewares/advisers');

//middlewares

//validators
const { adviserValidator, updateValidator } = require('../validators/advisers');

const advisersRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
advisersRouter.post("/create", adviserValidator,create);
advisersRouter.patch("/update/:id", adviserExists, updateValidator,update);
advisersRouter.delete("/delete/:id", adviserExists,deleted);
advisersRouter.get("/",getItems);
advisersRouter.get("/:id", adviserExists,getItem);

module.exports = { advisersRouter };
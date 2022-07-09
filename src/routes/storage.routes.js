const express = require('express');
const multer = require('multer');

const storageRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
storageRouter.get("/",(req,res)=>{
    const data = ["storage"]

    res.send({data})
})

module.exports = { storageRouter };
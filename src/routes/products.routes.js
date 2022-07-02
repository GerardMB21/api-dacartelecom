const express = require('express');

const productsRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
productsRouter.get("/",(req,res)=>{
    const data = ["products"]

    res.send({data})
})

module.exports = { productsRouter };
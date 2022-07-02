const express = require('express');

const soldsRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
soldsRouter.get("/",(req,res)=>{
    const data = ["solds"]

    res.send({data})
})

module.exports = { soldsRouter };
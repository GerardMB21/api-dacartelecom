const express = require('express');

const advisersRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
advisersRouter.get("/",(req,res)=>{
    const data = ["advisers"]

    res.send({data})
})

module.exports = { advisersRouter };
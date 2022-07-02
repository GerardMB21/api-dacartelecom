const express = require('express');

const investmentsRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
investmentsRouter.get("/",(req,res)=>{
    const data = ["investments"]

    res.send({data})
})

module.exports = { investmentsRouter };
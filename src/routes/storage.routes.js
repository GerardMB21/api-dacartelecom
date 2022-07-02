const express = require('express');
const multer = require('multer');

const storageRouter = express.Router();

const data = (req,res,next)=>{
    console.log(req);
    next()
};

const storage = multer.diskStorage({
    destination:function (req,file,cb) {
        const pathStorage = `${__dirname}/../storage`;
        cb(null,pathStorage)
    },
    filename:function (req,file,cb) {
        // const regex = /\s/g;
        // const nameFile = file.originalname.replace(regex,"-");
        // const filename = `${nameFile}`;
        // cb(null,filename);
    }
})

const uploadMiddleware = multer({
    storage
})

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
storageRouter.get("/storage",(req,res)=>{
    const data = ["storage"]

    res.send({data})
})

storageRouter.post("/", data, uploadMiddleware.single("file"),(req,res)=>{
    
})

module.exports = { storageRouter };
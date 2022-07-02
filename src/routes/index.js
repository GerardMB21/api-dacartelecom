const express = require("express");
const fs = require("fs");

const router = express.Router();

//get all files
const PATH_ROUTES = __dirname;

//remove extension file
const removeExtension = (fileName)=>{
    return fileName.split(".").shift()
};

/* 
*there is a problem with the index since express tells us that there is an error with Router.use TypeError: Router.use() requires a middleware function but got a Object
*/
//dynamic routes
// fs.readdirSync(PATH_ROUTES).filter(file=>{
//     const name = removeExtension(file);
//     if (name !== "index") {
//         router.use(`/${name}`,require(`./${file}`));
//     }
// });
fs.readdirSync(PATH_ROUTES).filter(file=>{
    const name = removeExtension(file);
    if (name !== "index") {
        router.use(`/${name}`,require(`./${file}`))
    }
})

module.exports = router;
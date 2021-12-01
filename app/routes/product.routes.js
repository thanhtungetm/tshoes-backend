const express = require("express");
const products = require("../controllers/product.controller");
const middlewares = require("../middlewares")
module.exports = app => {
    const router = express.Router();

    router.get("/", products.findAll);
    router.get("/count/", products.getTotalNumber);
    router.get("/like/",[middlewares.verifyToken], products.findAllLike);
    router.post("/like/:id", [middlewares.verifyToken], products.like);
    router.delete("/like/:id", [middlewares.verifyToken], products.unlike);
    router.get("/:page/:number/", products.findPage);
    router.get("/:id", products.findOne);

    
    
    

    

    app.use("/api/products", router);
};
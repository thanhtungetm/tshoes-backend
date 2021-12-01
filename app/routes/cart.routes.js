const express = require("express");
const cart = require("../controllers/cart.controller");
const middlewares = require("../middlewares")
module.exports = app => {
    const router = express.Router();

    router.post("/",[middlewares.verifyToken], cart.add);
    router.get("/", [middlewares.verifyToken], cart.find);
    router.put("/", [middlewares.verifyToken], cart.add);
    router.delete("/:id", [middlewares.verifyToken], cart.delete);
    
    app.use("/api/cart", router);
};
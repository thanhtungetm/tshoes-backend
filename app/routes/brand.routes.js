const express = require("express");
const brands = require("../controllers/brand.controller");

module.exports = app => {
    const router = express.Router();

    router.get("/", brands.findAll);

    app.use("/api/brands", router);
};
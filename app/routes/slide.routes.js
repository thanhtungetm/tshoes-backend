const express = require("express");
const slides = require("../controllers/slide.controller");

module.exports = app => {
    const router = express.Router();


    router.get("/", slides.findAll);

    app.use("/api/slides", router);
};
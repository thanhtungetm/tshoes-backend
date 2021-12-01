const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const Brand = db.Brand;

//Find all brands
exports.findAll = async(req, res, next) => {
    const name = req.query.name;
    if (name) {
        condition.name = { $regex: new RegExp(name), $options: "i" };
    }

    const [error, documents] = await handle(
        Brand.find({})
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while retrieving brands"
            )
        );
    }

    return res.send(documents);
};


const { BadRequestError } = require("../helpers/errors");
const db = require("../models");
const User = db.User;

const checkDuplicateUsername = async(req, res, next) => {
    try {
        const userByUsername = await User.findOne({
            username: req.body.username,
        }).exec();

        if (userByUsername) {
            return next(new BadRequestError(422, "Username is already in use"));
        }


        return next();
    } catch (error) {
        console.log(error);
        return next(new BadRequestError(500));
    }
};

module.exports = {
    checkDuplicateUsername,
};
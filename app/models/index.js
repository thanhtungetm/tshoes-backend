const mongoose = require("mongoose");
const createBrandModel = require("./brand.model");
const createSlideModel = require("./slide.model");
const createProductModel = require("./product.model");
const createUserModel = require("./user.model");
const createCartModel = require("./cart.model");

const db = {};
db.mongoose = mongoose;
db.Brand = createBrandModel(mongoose);
db.Slide = createSlideModel(mongoose);
db.Product = createProductModel(mongoose);
db.User = createUserModel(mongoose);
db.Cart = createCartModel(mongoose);

module.exports = db;
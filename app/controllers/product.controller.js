const { BadRequestError } = require("../helpers/errors")
const handle = require("../helpers/promise")
const db = require("../models")
const Product = db.Product

//Find all product or by name
exports.findAll = async(req, res, next) => {
    const condition = {};
    const name = req.query.name;
    if (name) {
        condition.name = { $regex: new RegExp(name), $options: "i" };
    }

    const [error, documents] = await handle(
        Product.find(condition)
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "Error find all products"
            )
        );
    }

    return res.send(documents);
};

//get Number of all products
exports.getTotalNumber = async(req, res, next) => {
    const count = {};
    const condition = {};
    if(req.query.brand){
        condition.brand = req.query.brand
    }
    console.log(condition)
    const [error, documents] = await handle(
        Product.countDocuments(condition).exec()
    );

    count.number = documents
    if (error) {
        return next(
            new BadRequestError(
                500,
                "Error get total number of products"
            )
        );
    }

    return res.send(count);
};

//Get number products of page
exports.findPage = async(req, res, next) => {
    const condition = {};
    if(req.query.brand){
        condition.brand = req.query.brand;
    }
    const number = Number(req.params.number)
    const page = Number(req.params.page)

    const [error, documents] = await handle(
        Product.find(condition, {description:0}).skip((page-1)*number).limit(number)
    );
    
    if (error) {
        return next(
            new BadRequestError(
                500,
                "Error find products of page"
            )
        );
    }

    return res.send(documents);
};

// Find a product with id
exports.findOne = async(req, res, next) => {
    const condition = {
        _id: req.params.id
    };

    const [error, document] = await handle(
        Product.findOne(condition).populate('brand')
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Error find a product with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Product not found"));
    }

    return res.send(document);
};

//Find all favorite products of user
exports.findAllLike = async(req, res, next) => {
    const [error, documents] = await handle(
        Product.find({
                lovers: { _id: req.userId},
            }
        )
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "Error find all likes of user"
            )
        );
    }

    return res.send(documents);
};

// Update to like a product
exports.like = async(req, res, next) => {
    if (!req.body) {
        return next(
            new BadRequestError(400, "Data like is empty")
        );
    }

    const condition = {
        _id: req.params.id,
    };

    const [error, document] = await handle(
        Product.updateOne(condition, {
            $push: {
                lovers: {
                    _id: req.userId
                }
            }
        })
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Error like a product with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Product is not found when like"));
    }

    return res.send({ message: "Liked a product was successfully updated" });
};

// Update to unlike a product
exports.unlike = async(req, res, next) => {
    if (!req.body) {
        return next(
            new BadRequestError(400, "Data unlike is empty")
        );
    }

    const condition = {
        _id: req.params.id,
    };

    const [error, document] = await handle(
        Product.updateOne(condition, {
            $pull: { lovers: { _id: req.userId } }
        })
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Error unlike a product with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Product is not found when unlike"));
    }

    return res.send({ message: "Unliked a product was successfully updated" });
};
// exports.updateBrand = async (req, res, next)=>{
//     let foundData= await Product.find({}).skip(40).limit(10);
//     let IDs=[];

//     foundData.forEach(element=>{
//      IDs.push(element._id);
//     })

//     const brands = [
//         "619aff60581ce3d509e8583d",
//         "61a3254c7505c4e3a6e30478",
//         "619b0012581ce3d509e8583f",
//         "61a324db7505c4e3a6e30477",
//         "61a327677505c4e3a6e30479",
//     ]
//     const brandrand = brands[Math.floor(Math.random()*brands.length)];
   
//     const [error, documents] = await handle(
//         Product.updateMany(
//             {_id: {$in :IDs}},
//             {$set: {
//                 brand: brandrand
//             }}
//         )
//     )
//     if(error){
//         console.error
//     }else{
//         res.send("thanh cong")
//     }
// }
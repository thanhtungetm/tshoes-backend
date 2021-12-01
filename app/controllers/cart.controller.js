const { BadRequestError } = require("../helpers/errors")
const handle = require("../helpers/promise")
const db = require("../models")
const Cart = db.Cart

//Create a new Cart
async function createNewCart(id, product){
    const cart = new Cart({
        detail:[
            {idProduct: product.id, quality:product.quality, size: product.size}
        ],
        OwnerId: id,
    });
    const [error] = await handle(cart.save())
    if(error) throw error
    return cart.populate({
        path: 'detail',
        populate:{
            path: 'idProduct',
        }
    });
}

//Add a product or change quality
exports.add = async(req, res, next) => {

    //Update quality if had idProduct
    const[err, doc] = await handle(
        Cart.findOneAndUpdate({
            OwnerId: req.userId,
            detail:{
                $elemMatch: {
                    idProduct : req.body.id,
                    size: req.body.size
                }
            }
        },{
            $inc: {
                "detail.$.quality": Number(req.body.quality)
            }
        },{new: true}).populate({
            path: 'detail',
            populate:{
                path: 'idProduct',
            }
        })
    )
    if(err){
        return next(new BadRequestError("Error add quality when add a product", err));
    }
    
    if(!doc){
        //Add a item into cart
        const [error, document] = await handle(
            Cart.findOneAndUpdate({
                OwnerId: req.userId
            },{
                $push:{
                    detail: {
                        idProduct: req.body.id,
                        quality: req.body.quality,
                        size: req.body.size,
                    }
                }
            },{new: true}).populate({
                path: 'detail',
                populate:{
                    path: 'idProduct',
                }
            })
        )
        if(error){
            return next(new BadRequestError(error))
        }
        if(!document){
            //create a new cart
            return res.send(await createNewCart(req.userId, req.body))
        }
        return res.send(document);
    }
    return res.send(doc)
    
};


//Find a cart
exports.find = async(req, res, next) => {
    const condition = {
        OwnerId: req.userId
    };
    console.log(condition)
    const [error, document] = await handle(
        Cart.findOne(condition).populate({
            path: 'detail',
            populate: {
              path: 'idProduct',
            }
        })
    )

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Error get a cart with OwnerId=${req.userId}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Cart not found"));
    }

    return res.send(document);
};

//Delete a product from the cart
exports.delete = async(req, res, next) => {
    const condition = {
        OwnerId: req.userId
    }
    const [error, document] = await handle(
        Cart.findOneAndUpdate(
            condition,
            {
                $pull: { detail: { _id: req.params.id}} 
            },
            {new: true}
        ).populate({
            path: 'detail',
            populate: {
              path: 'idProduct',
            }
        })
    )
    if(error){
        return next(new BadRequestError("Error delete item in cart"))
    }
    console.log(document)
    return res.send(document);
}

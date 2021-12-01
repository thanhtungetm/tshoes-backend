module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            detail: [
                {
                    idProduct: { 
                        type: mongoose.Schema.ObjectId,
                        ref: 'product'
                    } ,
                    quality: {
                        type:Number,
                        default:1,
                    },     
                    size: {
                        type:Number,
                        default:35,
                    }     
                }

            ],
            OwnerId:{
                type:mongoose.Schema.ObjectId,
                ref:'users'
            }
        },
        { timestamps: true }
    );

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("cart", schema);
};

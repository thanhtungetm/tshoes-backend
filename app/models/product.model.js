module.exports = mongoose => {
    const schema = mongoose.Schema({
        name: {
            type: String,
            required: [true, "Product name is required"],
        },
        imgUrl: {
            type: String,
        },
        description: {
            type: String,
        },
        price: Number,
        lovers: [{
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "user"
                }
            }

        ],
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "brand"
        },
        sizes: Array,
    }, { timestamps: true });

    // Replace _id with id and remove __V
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("product", schema);
};
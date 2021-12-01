module.exports = mongoose => {
    const schema = mongoose.Schema({
        username: {
            type: String,
            required: [true, "Username is required"],
        },
        phone: {
            type: String,
            required: [true, "Phone is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        address: {
            type: String,
        },
        fullname: {
            type: String,
            required: [true, "Full name is required"],
        }
    });

    return mongoose.model("user", schema);
};
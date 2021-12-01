const config = {
    app: {
        port: process.env.PORT || 6868
    },
    db: {
        url: "mongodb://localhost:27017/tshoes"
    },
    jwt: {
        secret: "yeulacuoi"
    }
};

module.exports = config;
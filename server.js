const express = require("express");
const cors = require("cors");
const config = require("./app/config");
const setupBrandRoutes = require("./app/routes/brand.routes");
const setupProductRoutes = require("./app/routes/product.routes");
const setupSlideRoutes = require("./app/routes/slide.routes");
const setupCartRoutes = require("./app/routes/cart.routes");
const setupAuthRoutes = require("./app/routes/auth.routes");
const { BadRequestError } = require("./app/helpers/errors");
const db = require("./app/models");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.mongoose
    .connect(config.db.url)
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch((error) => {
        console.log("Cannot connect to the database!", error);
        process.exit();
    });

// home route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Tshoe app" });
});

setupBrandRoutes(app);
setupSlideRoutes(app);
setupProductRoutes(app)
setupCartRoutes(app)
setupAuthRoutes(app);

// handle 404 response
app.use((req, res, next) => {
    next(new BadRequestError(404, "Resource not found"));
});

// use middleware last
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

// set Port
const PORT = config.app.port;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
});
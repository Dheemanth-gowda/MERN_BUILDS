require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//Routes Import:
const authRotes = require("./routes/auth");
const userRotes = require("./routes/user");
const categoryRoutes = require("./routes/catergory");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

//CONNECTION:
const port = process.env.PORT || 8001;

mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(console.log("-------------DB connected----------------------------"))
    .catch((err) => {
        return console.log(
            "--------------------------There is an error in connecting-----------------------------------" +
            err
        );
    });

//MIDDLEWARE:
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

//ROUTES:
app.use("/api", authRotes);
app.use("/api", userRotes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

app.listen(8000, function() {
    console.log(`Example app listening on port !${port}`);
});

app.get("/", (req, res) => {
    return res
        .status(200)
        .send(
            "Connected to the backend and you are now seeing the front end of the website!!!"
        );
});
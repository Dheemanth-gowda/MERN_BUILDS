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

//CONNECTION:
const port = process.env.PORT || 8000;

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

app.listen(8000, function() {
    console.log("Example app listening on port 8000!");
});

app.get("/", (req, res) => {
    return res
        .status(200)
        .send(
            "Connected to the backend and you are now seeing the front end of the website!!!"
        );
});
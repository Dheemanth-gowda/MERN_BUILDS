const express = require("express");

const app = express();

app.get("/", (req, res) => {
    return res.send("Hello Dheemanth is here!!!");
});

const port = 3000;

app.listen(port, () => console.log(`The server is up and running!!! at port ${port}`));
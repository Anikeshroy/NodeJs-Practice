const http = require("http");
const express = require("express");
const { url } = require("inspector");
const QueryString = require("qs");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello " + req.query.name + " Your Age is " + req.query.age)
})

app.listen(8000, () => console.log("Server is started!"));
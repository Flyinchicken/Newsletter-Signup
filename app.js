const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
const https = require("https");

app.get("/", (req, res)=>{
    res.send("<h1>Welcome to my news letter app</h1>");
    console.log("Home route get request handled successfully!");
});

app.listen(3000, ()=>{
    console.log("Server is running ... Listening to port 3000");
});
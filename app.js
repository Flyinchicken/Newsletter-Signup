const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname, { // host the whole directory
    extensions: ["html", "htm", "gif", "png", "css"],
}));
const https = require("https");

// send login home page when client access the homepage
app.get("/", (req, res)=>{
    homepagePath = __dirname + "/signup.html";
    res.sendFile(homepagePath, (err)=>{
        if (err) {
            throw err;
        } else {}
    });
    console.log("Home route get request handled successfully!");
});

// handle post request to the home route when client submits the form with their email info
app.post("/", (req, res)=>{
    console.log("received post request... handling ...");
    const clientInfo = req.body;
    res.write("<h1> Client Email:" + clientInfo.email + "</h1>");
    res.write("<h1> Client Password:" + clientInfo.password + "</h1>");
    res.send();
    console.log("Home route post request handled successfully!");
});

app.listen(3000, ()=>{
    console.log("Server is running ... Listening to port 3000");
});
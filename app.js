const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
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

// constant for mailchimp api calls
const mailChimpAudienceID = "f7cdd9ac0a";
// handle post request to the home route when client submits the form with their email info
app.post("/", (req, res)=>{
    console.log("received post request... handling ...");
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    // create data object for the mailchimp API
    var data = {
        members: [
            {
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME: lastName
            }
        }
        ]
    }; 

    // turn the JS object into a JSON string
    const jsonData = JSON.stringify(data);
    console.log("Home route post request handled successfully!");

    // send the data to the mailchimp server
    const url = "https://us21.api.mailchimp.com/3.0/lists/" + mailChimpAudienceID;  // destination url to send our https request

    const options = {
        method: "POST",
        auth: "weijie:63c604a2ddf89d2cb48f0184b452affa-us21"
    };


    const request = https.request(url, options, (response)=>{
        response.on("data", (data)=>{
            if (JSON.parse(data).error_count === 0) {
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
        });
    });
    request.write(jsonData);
    request.end();
});



app.listen(3000, ()=>{
    console.log("Server is running ... Listening to port 3000");
});
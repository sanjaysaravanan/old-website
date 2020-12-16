// server.js
//

const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.SES_ACCESS_ID,
  secretAccessKey: process.env.SES_ACCESS_KEY,
  region: "us-east-2"
});

const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 4001;
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

// Serving frotend static files.
app.use(express.static(path.join(__dirname, "client/build")));

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/send-email", (req, res) => {
  const payload = req.body;
  const { name, email, phone, message } = payload;
  const ses = new AWS.SES({ apiVersion: "2010-12-01" });
  const params = {
    Destination: {
      ToAddresses: ["sanjaysaravanan1997@gmail.com"] // Email address/addresses that you want to send your email
    },
    Message: {
      Body: {
        Html: {
          // HTML Format of the email
          Charset: "UTF-8",
          Data: `<html><body><h4>Name:${" " + name}</h4><h4>Email:${" " +
            email}</h4><h4>Phone:${" " + phone}</h4><h4>Message:${" " +
            message}</h4></body></html>`
        },
        Text: {
          Charset: "UTF-8",
          Data: "Hello Charith Sample description time 1517831318946"
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Hey, someone's trying to reach you"
      }
    },
    Source: "saravanansanjay194@gmail.com"
  };

  const sendEmail = ses.sendEmail(params).promise();

  sendEmail
    .then(data => {
      console.log("Notification successfull for, ", data);
      res.json({
        message: "Notification successfull."
      });
    })
    .catch(error => {
      console.log(error);
      res.status(401).json({
        errorMsg: "Notification failed."
      });
    });
});

// Game
app.get("/game", (req, res) => {
  res.sendFile(path.join(__dirname + "/game.html"));
});

// Sample
app.get("/flower", (req, res) => {
  res.json({
    name: "Dandelion",
    colour: "Blue-ish"
  });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}.`);
});

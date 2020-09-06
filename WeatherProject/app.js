//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express(); // initialize a new express app

// Use to parse through the body of the post request
app.use(bodyParser.urlencoded({
  extended: true
}));

// Sending index.html over to the browser
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

// Catching our post request
app.post("/", function(req, res) {
  const zip = req.body.zipCode;
  const apiKey = "a4e5e90874fc9805a6b96fd8156b19df";
  const unit = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?zip="+ zip +",us&appid="+ apiKey +"&units="+ unit +"";

  https.get(url, function(response) {

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const cityName = weatherData.name;
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p> The weather is currently " + description + "</p>");
      res.write("<h1>The current temperature in "+ cityName +" is " + temp + " degrees Fahrenheit</h1>");
      res.write("<img src=" + imageUrl + ">");
      res.send();
    });
  });
});


app.listen(3000, function() {
  console.log("Tuning in on port 3000");
});

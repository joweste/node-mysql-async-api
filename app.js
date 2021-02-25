const express = require("express");
const app = express();

//Bodyparser
const bodyParser = require("body-parser");

//import routes;
const routesCustomers = require("./app/routes/customer.routes.js");

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

//Cstomers Routes
app.use("/customers", routesCustomers);

module.exports = app;

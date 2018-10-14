const express = require("express");
const app = express();

// Get database start /////

const mongoose = require("./config/database");

// Get database End /////

/// Add bodyParser to handle Form post request ///
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

const session = require("express-session");
app.use(session({secret : "12345!@#$%12345"}));

const flash = require('express-flash');
app.use(flash());

/// Set admin directory globally
global.adminPath = "admin/";
global.adminUrl = "http://localhost:3000/admin/";

/// Set multiple language start

const i18n = require("./i18n");
app.use(i18n.init);

const admin = require("./admin");
app.use("/admin", admin);

/// frontend Home page //

app.get("/", (req, res) => { 
    var getHello = __("Hello");
    res.send(getHello);
});

let myPort = process.env.PORT || 5000;

app.listen(myPort, () => {
    console.log("Listening port " + myPort);
});
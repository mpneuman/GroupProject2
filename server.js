//dependencies
var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var env = require('dotenv').load();
var exphbs = require('express-handlebars');

//ports
var PORT = process.env.port || 5000;

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//for passport
// app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); //session secret
// app.use(passport.initialize());
// app.use(passport.session()); //persistent login sessions

// Set Handlebars.
// var exphbs = require("express-handlebars");

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

//models
var models = require('./models');

//routes
// var authRoute = require('./routes/auth.js')(app, passport);

//load passport strategies
// require('./config/passport/passport.js')(passport, models.user);

//sync database
models.sequelize.sync().then(function () {
    console.log('db looks fine');
}).catch(function (err) {
    console.log("something went wrong");
})


// checks for errors
app.listen(PORT, function (err) {
    if (!err)
        console.log('site is live');
    else console.log(err);
})
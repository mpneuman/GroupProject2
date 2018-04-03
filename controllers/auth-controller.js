var db = require('../models');
var exports = module.exports = {};

exports.index = function (req, res) {
    res.render('index');
}

exports.signup = function (req, res) {
    res.render('signup');
}

exports.signin = function (req, res) {
    res.render('signin');
}


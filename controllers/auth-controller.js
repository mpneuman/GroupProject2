var db = require('../models');
var exports = module.exports = {};

exports.index = function (req, res) {
    db.user.findOne({
        where: {
            id: req.user.id
        }
    }).then(function (result) {
        
        res.render('index', result);
    })

}

exports.signup = function (req, res) {
    res.render('signup');
}

exports.signin = function (req, res) {
    res.render('signin');
}

exports.logout = function (req, res) {
    req.session.destroy(function(err) {
        res.redirect('/signin');
    });
}

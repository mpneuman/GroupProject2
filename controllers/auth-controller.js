var db = require('../models');
var exports = module.exports = {};

exports.index = function (req, res) {
    db.Users.findOne({
        where: {
            id: req.user.id
        }
    }).then(function (result) {

        res.render('index', result);
    })

}

exports.signup = function (req, res) {
    var message = req.flash('error')[0];
    res.render('signup', {message:message});
}

exports.signin = function (req, res) {
    var message = req.flash('error')[0];
    res.render('signin', {message:message});
}

exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/signin');
    });
}



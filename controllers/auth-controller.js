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
    res.render('signup');
}

exports.signin = function (req, res) {
    res.render('signin');
}

exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/signin');
    });
}

// exports.newBill = function (req, res) {
//     db.Bills.create({
//         payee: req.body.payee,
//         amountDue: req.body.amountDue,
//         category: req.body.category,
//         dueDate: req.body.dueDate,
//         websiteAccess: req.body.websiteAccess,
//         notes: req.body.notes,
//         UserId: req.body.UserId

//     }).then(function (result) {
//         res.redirect('/index');
//     })
// }

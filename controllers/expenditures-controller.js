var db = require('../models');
var exports = module.exports = {};

exports.newExp = function (req, res) {
    db.Expenditures.create({
        payee: req.body.payee,
        amountPaid: req.body.amountPaid,
        category: req.body.category,
        notes: req.body.notes,
        UserId: req.body.UserId
    }).then(function (result) {
        res.redirect('/index');
    })
}

exports.getExp = function (req, res) {
    console.log("HERE " + req.user.id);
    db.Expenditures.findAll({
        where: {
            UserId: req.user.id
        }
    }).then(function (result) {
        console.log(result);
        res.send(result);
    })
}
var db = require('../models');
var exports = module.exports = {};

exports.newBill = function (req, res) {
    db.Bills.create({
        payee: req.body.payee,
        amountDue: req.body.amountDue,
        category: req.body.category,
        dateDue: req.body.dateDue,
        websiteAccess: req.body.websiteAccess,
        notes: req.body.notes,
        UserId: req.body.UserId

    }).then(function (result) {
        res.redirect('/index');
    })
}

exports.getBills = function (req, res) {
    console.log("HERE " + req.user.id);
    db.Bills.findAll({
        where: {
            UserId: req.user.id
        }
    }).then(function (result) {
        console.log(result);
        res.send(result);
    })
}
exports.burnBills = function (req, res) {
    db.Bills.destroy({
        where: {
            id: req.body.id
        }
    }).then(function (result) {
        console.log(result);
        res.json(results);
    });
}
exports.updateBills = function (req, res) {
    db.Bills.update(
        req.body,
        {
            where: {
                id: req.body.id
            }
        }).then(function (results) {
            console.log(results);
            res.json(results);
        });
}
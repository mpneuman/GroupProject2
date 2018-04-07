var db = require('../models');
var exports = module.exports = {};

exports.newBill = function (req, res) {

    db.Bills.create(req.body).then(function (result) {
        console.log(result);
        res.json(results);
    })

    db.Bills.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (result) {
        console.log(result);
        res.json(results);
    });

    db.Bills.update(
        req.user,
        {
            where: {
                id: req.user.id
            }
        }).then(function (results) {
            console.log(results);
            res.json(results);
        });


    db.Bills.findAll({
        include: {
            model: db.Bills
        },
        where: {
            id: req.user.id
        }
    }).then(function (result) {
        console.log(results);
        res.json(results);
    });

}
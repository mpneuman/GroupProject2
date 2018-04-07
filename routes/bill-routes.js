var billController = require('../controllers/bill-controller.js');
module.exports = function (app, passport) {
    app.post('/newBill', isLoggedIn, billController.newBill)
    app.get('/getBills', isLoggedIn, billController.getBills)





    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated())

            return next();

        res.redirect('/signin');

    }
}
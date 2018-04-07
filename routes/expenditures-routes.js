var expController = require('../controllers/expenditures-controller.js');

module.exports = function (app, passport) {
    app.post('/newExp', isLoggedIn, expController.newExp)
    app.get('/getExp', isLoggedIn, expController.getExp)



    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated())

            return next();

        res.redirect('/signin');

    }
}
var authController = require('../controllers/auth-controller.js');

module.exports = function (app, passport) {
    app.get("/about", authController.devs);
    app.get('/index', isLoggedIn, authController.index);
    app.get('/signup', authController.signup);
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/index',
        failureRedirect: '/signup',
        failureFlash: true

    }
    ));
    app.get('/signin', authController.signin);

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/index',
        failureRedirect: '/signin',
        failureFlash: true
        // failureFlash: true
    }
    ));

    app.get('/logout', authController.logout);

    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated())

            return next();

        res.redirect('/signin');

    }

app.get('/', authController.main);
}

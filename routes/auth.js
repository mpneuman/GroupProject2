var authController = require('../controllers/auth-controller.js');

module.exports = function (app, passport) {
    app.get('/index', isLoggedIn, authController.index);
    app.get('/signup', authController.signup);
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/index',
        failureRedirect: '/signup'
    }
    ));
    app.get('/signin', authController.signin);

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/index',
        failureRedirect: '/signin'
    }
));

    app.get('/logout', authController.logout);

    function isLoggedIn(req, res, next) {
 
        if (req.isAuthenticated())
         
            return next();
             
        res.redirect('/signin');
     
    }
}

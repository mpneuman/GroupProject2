var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

    //serialize 
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    //deserialize user
    passport.deserializeUser(function (id, done) {
        User.findById(id).then(function (user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true //allows us to pass back request to the callback
        },
        function (req, email, password, done) {
            var generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            user.findOne({
                where: {
                    email: email
                }
            }).then(function (user) {
                if (user) {
                    console.log("user in use\n\n\n\n")
                    return done(null, false, {
                        message: 'this username is already in use'
                    });
                } else {
                    var userPassword = generateHash(password);
                    var data = {
                        email: email,
                        password: userPassword,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname
                    };
                    User.create(data).then(function (newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));
    //local signin
    passport.use('local-signin', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // can pass entire request to call back

    },
        function (req, email, password, done) {
            var User = user;
            var isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }
            user.findOne({
                where: {
                    email: email
                }
            }).then(function (user) {
                if (!user) {
                    return done(null, false, {
                        message: 'Username does not exist'
                    });
                }
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, {
                        message: 'incorrect password.'
                    });
                }
                var userinfo = user.get();
                return done(null, userinfo);
            }).catch(function (err) {
                console.log("ERROR: ", err);
                return done(null, false, {
                    message: 'something went wrong with your signin'
                });
            });
        }
    ));
}
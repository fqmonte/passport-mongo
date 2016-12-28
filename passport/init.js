var login = require('./login');
var signup = require('./signup');
var User = require('../models/empresa');

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(empresas, done) {
        console.log('serializing user: ');console.log(empresas);
        done(null, empresas._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, empresas) {
            console.log('deserializing user:',empresas);
            done(err, empresas);
        });
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);

}
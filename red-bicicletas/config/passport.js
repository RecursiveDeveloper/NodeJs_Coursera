const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario');

passport.use(new LocalStrategy( function(username, password, done) {     
    User.findOne({ username: username }, function (err, user) { 
        if (err) { 
            return done(err); 
        } 
        if (!user) { 
            return done(null, false, { message: 'Username incorrecto.' }); 
        } 
        if (!user.validPassword(password)) { 
            return done(null, false, { message: 'Password incorrecto.' });      
        } 
        return done(null, user);    
    });   
}));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    Usuario.findById(id, function(err, usuario) {
        cb(err, usuario);
    });
});

module.exports = passport;
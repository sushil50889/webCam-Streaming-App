const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/userModel');
var bcrypt = require('bcryptjs');


module.exports = passport.use('local', new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'userPassword'
    },
    
    function(username, password, done) {
      User.findOne({ userName: username }, function(err, user) {
        if (err) { 
          return done(err); 
        }

        if (!user) {
          return done(null, false, { msg: 'Username Not Found.' });
        }

        if (!bcrypt.compareSync(password, user.userPassword)) {
          return done(null, false, { msg: 'Incorrect password.' });
        }
        
        return done(null, user);
      });
    }
));
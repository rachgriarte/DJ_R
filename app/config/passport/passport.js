// NPM Dependencies
const bCrypt = require('bcrypt-nodejs');
const db = require('../../models');

module.exports = (passport, user) => {
  var User = user;

  const LocalStrategy = require('passport-local').Strategy;

  // Local Register
  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },

    (req, email, password, done) => {
      // Generates a hashed password
      var generateHash = (password) => {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };

      // Identifies if user exists already in DB
      User.findOne({
        where: {
          email: email
        }
      }).then((user) => {
        // Checks to see if user already exists
        if (user)
        {
          return done(null, false, 
            // Displays error message if user already exists
            req.flash('error_msg', 'Email address is taken. Please enter a new email address.')
          );
        } else {
          // Stores hashed password if user does not already exist
          var userPassword = generateHash(password);

          // Stores user information for new user
          var data = {
            email: email,
            password: userPassword,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            Account: [{}]
          };
          
          // Creates new user data in DB
          User.create(data, {include: [db.Account]}).then((newUser, created) => {
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

  // Local Signin
  passport.use('local-signin', new LocalStrategy(
    {
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    
    (req, email, password, done) => {
      var User = user;

      var isValidPassword = (userpass, password) => {
        // Compares passwords to ensure they are valid
        return bCrypt.compareSync(password, userpass);
      }
  
      // Searches DB to see if logged in email exists
      User.findOne({
        where: {
          email: email
        }
      }).then((user) => {
        // Checks to see if email exists in DB
        if (!user) {
          return done(null, false, 
            // Displays error message if email does not exist
            req.flash('error_msg', 'Email does not exist. Please enter in a valid email address.')
          );
        }

        // Checks to see if password is valid
        if (!isValidPassword(user.password, password)) {
          return done(null, false, 
            // Displays error message if password is incorrect
            req.flash('error_msg', 'Password is incorrect. Please enter in the correct password.')
          );
        }

        // Stores user information
        var userinfo = user.get();

        // Returns and provides user information as a cb
        return done(null, userinfo);
      }).catch((err) => {
        // Displays error message
        console.log("Error:", err);

        return done(null, false, 
          // Displays error message if there is an error with logging in
          req.flash('error_msg', 'Error occurred: ' + err)
        );
      });
    }
  ));

  // Serialize user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user 
  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });
}
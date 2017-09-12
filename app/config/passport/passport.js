// NPM Dependencies
const bCrypt = require('bcrypt-nodejs');

module.exports = (passport, user) => {
  var User = user;

  const LocalStrategy = require('passport-local').Strategy;

  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },

    (req, email, password, done) => {
      var generateHash = (password) => {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };

      User.findOne({
        where: {
          email: email
        }
      }).then((user) => {
        if (user)
        {
          return done(null, false, 
            req.flash('error_msg', 'Email address is taken. Please enter a new email address.')
          );
        } else {
          var userPassword = generateHash(password);

          var data = {
            email: email,
            password: userPassword,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username
          };
          
          User.create(data).then((newUser, created) => {
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

  //LOCAL SIGNIN
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
        return bCrypt.compareSync(password, userpass);
      }
  
      User.findOne({
        where: {
          email: email
        }
      }).then((user) => {
        if (!user) {
          return done(null, false, 
            req.flash('error_msg', 'Email does not exist. Please enter in a valid email address.')
          );
        }

        if (!isValidPassword(user.password, password)) {
          return done(null, false, 
            req.flash('error_msg', 'Password is incorrect. Please enter in the correct password.')
          );
        }

        var userinfo = user.get();

        return done(null, userinfo);

      }).catch((err) => {
        console.log("Error:", err);

        return done(null, false, {
            message: 'Something went wrong with your Signin'
        });
      });
    }
  ));

  //serialize
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // deserialize user 
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
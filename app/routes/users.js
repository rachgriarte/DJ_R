// NPM dependencies
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local');

// Get register route
router.get('/register', (req, res) => {
  res.render('register', { css2: ['login.css'] });
});

// Get login route
router.get('/login', (req, res) => {
  res.render('login', { css2: ['login.css'] });
});

// Register User
router.post('/register', (req, res) => {
  // Variables housing submitted information
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  // Validations
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if(errors) {
    res.render('register', {
      // Pass along errors
      errors: errors
    })
  } else {
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password
    });

    User.createUser(newUser, (error, user) => {
      if(error) throw error;
      console.log(user);
    });

    req.flash('success_msg', 'You are registered and can now login.');

    // Redirects to login page
    res.redirect('/users/login');
  }
});

// Gets username and validates password
passport.use(new LocalStrategy(
  (username, password, done) => {
    User.getUserByUsername(username, (error, user) => {
      if (error) throw error;
      
      // If no user, return null and false
      if (!user) {
        return done(null, false, { message: 'Unknown User' });
      }

      // If there is a user
      User.comparePassword(password, user.password, (error, match) => {
        if (error) throw (error);

        // Pass in user
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Invalid Password '});
        }
      })
    });
  }
));

// Serializes user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(function(id, done) {
  User.getUserById(id, (error, user) => {
    done(error, user);
  });
});

// Authenticate
router.post('/login',
  passport.authenticate('local', 
    {
      successRedirect: '/', 
      failureRedirect: '/users/login', 
      failureFlash: true
    }
  ),
  (req, res) => {
    // Redirect to main page
    res.redirect('/');
  }
);

// Get for Logout
router.get('/logout', (req, res) => {
  req.logout();

  req.flash('success_msg', 'You have successfully logged out');

  res.redirect('/users/login');
});

// Exports router
module.exports = router;
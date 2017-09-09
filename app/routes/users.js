// NPM dependencies
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');

// Get register route
router.get('/register', (req, res) => {
  res.render('register');
});

// Get login route
router.get('/login', (req, res) => {
  res.render('login');
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
    res.render('/register', {
      // Pass along errors
      errors: errors
    })
  } else {
    console.log('There are no errors');
  }
});

// Exports router
module.exports = router;
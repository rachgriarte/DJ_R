// NPM dependencies
const express = require('express');
const router = express.Router();

// Get register route
router.get('/register', (req, res) => {
  res.render('register');
});

// Get login route
router.get('/login', (req, res) => {
  res.render('login');
});

// Exports router
module.exports = router;
// NPM dependencies
const express = require('express');
const router = express.Router();

// Get homepage
router.get('/', ensureAuth, (req, res) => {
  // Renders the index page and loads the style.css file
  res.render('index', {css: ['style.css'] });
});

// Prevents accessing homepage if user is not logged in
function ensureAuth(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/users/login');
  }
}

// Exports router
module.exports = router;
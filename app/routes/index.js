// NPM dependencies
const express = require('express');
const router = express.Router();

// Get homepage
router.get('/', (req, res) => {
  // Renders the index page and loads the style.css file
  res.render('index', {css: ['style.css'] });
});

// Exports router
module.exports = router;
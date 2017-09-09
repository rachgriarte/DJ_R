// NPM dependencies
const express = require('express');
const router = express.Router();

// Get homepage
router.get('/', (req, res) => {
  res.render('index');
});

// Exports router
module.exports = router;
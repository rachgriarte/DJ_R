var express = require('express');
var router = express.Router();

router.get('/', (req,res) => {
    res.render('index')
})

router.get('/show/:id', (req,res) => {
    res.render('show')
})

router.get('/edit/:id', (req,res) => {
    res.render('edit')
})

module.exports = router;


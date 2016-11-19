var express = require('express');
var router = express.Router();
var passport = require('passport');

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) return next();
    else res.redirect('/login');
}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect('layout/index');
});

module.exports = router;

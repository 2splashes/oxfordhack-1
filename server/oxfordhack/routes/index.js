var express = require('express');
var router = express.Router();
var passport = require('passport');

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) return next();
    else res.redirect('/login');
};

router.use(isAuthenticated);

/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect('layouts/index');
});

module.exports = router;

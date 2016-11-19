var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res, next) {
    res.render('layouts/auth/login');
});

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/return',
    passport.authenticate('facebook', {failureRedirect: '/login'}),
    function (req, res) {
        res.redirect('/');
});

module.exports = router;

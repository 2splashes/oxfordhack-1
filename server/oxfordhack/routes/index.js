var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/',
    passport.authenticate('facebook', {failureRedirect: '/login', successRedirect: '/home'})
);

router.get('/home', function (req, res, next) {
  res.render('layout/index');
});

module.exports = router;

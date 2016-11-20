var express = require('express');
var router = express.Router();
var Users = require('../models/users');

router.get('/', function (req, res, next) {
    Users.getHistory(req.user.id, function (history) {
        if (history[0].sadness > history[1].sadness) {
            res.render('layouts/result', {message: 'You seem a little down. Do you want to talk to someone about it?'});
            next();
        } else {
            res.render('layouts/result', {message: 'Thanks for playing! Have a wonderful day.'});
            next();
        }
    });
});

module.exports = router;
var express = require('express');
var router = express.Router();
var Users = require('../models/users');
var EmotionModel = require('../models/emotion_model');

router.get('/', function (req, res, next) {
    EmotionModel.depressedProbability(req.user.id, function (prob) {
        if (prob < 0.5) {
            res.render('layouts/result', {message: 'Thanks for playing! Have a wonderful day.'});
        } else if (prob < 0.8) {
            res.render('layouts/result', {message: 'You seem a little down. Need some more cat gifs?'});
        } else {
            res.render('layouts/result', {message: "We're having trouble making you smile. If something's wrong, you know you can always talk to your friends or family."})
        }
    });
});

module.exports = router;
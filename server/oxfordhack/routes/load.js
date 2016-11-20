var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: 'public/uploads'});
var request = require('request');
var fs = require('fs');
var Users = require('../models/users');

var options = {
    url: 'https://api.projectoxford.ai/emotion/v1.0/recognize',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': "1521013cecd149fca7543bac79c8784d"
    },
    method: 'POST',
    json: true
};

router.post('/', upload.single('webcam'), function (req, res, next) {
    fs.rename(req.file.path, req.file.path + '.jpeg', function () {
        options.body = {
            url: 'http://ec2-54-191-173-129.us-west-2.compute.amazonaws.com/uploads/' + req.file.filename + '.jpeg'
        };
        console.log(options);
        request(options, function (err, res, body) {
            if (err) return;
            Users.addResult(req.user.id, body[0].scores);
            console.log(body);
        });
    });
});

module.exports = router;

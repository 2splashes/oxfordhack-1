var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: 'public/uploads'});
var request = require('request');
var fs = require('fs');

var options = {
    url: 'https://api.projectoxford.ai/emotion/v1.0/recognize',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': "1521013cecd149fca7543bac79c8784d"
    }
};

router.post('/', upload.single('webcam'), function (req, res, next) {
    fs.rename(req.file.path, req.file.path + '.jpeg', function () {
        var body = {
            url: 'ec2-54-191-173-129.us-west-2.compute.amazonaws.com/uploads/' + req.file.filename + '.jpeg'
        };
        console.log(body);
        request(options, function (err, res, body) {
            console.log(body);
        }).json(body);
    });
});

module.exports = router;

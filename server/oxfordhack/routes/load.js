var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: 'uploads'});
var request = require('request');

var options = {
    url: 'https://api.projectoxford.ai/emotion/v1.0/recognize',
    headers: {
        'Content-Type': 'image/jpeg',
        'Ocp-Apim-Subscription-Key': "1521013cecd149fca7543bac79c8784d"
    }
};

router.post('/', upload.single('webcam'), function (req, res, next) {
    options.form = {
        url: 'https://ec2-54-191-173-129.us-west-2.compute.amazonaws.com/' + req.file.path
    };
    console.log(options.form.url);
    request(options, function (err, res, body) {
        console.log(body);
    });
});

module.exports = router;

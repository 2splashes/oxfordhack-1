var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
	res.render('layouts/image', {count: 0});
});

router.get('/:count', function (req, res, next){
	if (req.params.count < 3) {
		res.render('layouts/image', {count: req.params.count+1});
	} else {
		res.redirect('/results');
	}
});

module.exports = router;
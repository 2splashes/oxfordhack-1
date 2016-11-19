var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
	res.render('layouts/image', {count: 1});
});

router.get('/:count', function (req, res, next){
	var count = parseInt(req.params.count);
	if (count < 3) {
		res.render('layouts/image', {count: count+1});
	} else {
		res.redirect('/results');
	}
});

module.exports = router;
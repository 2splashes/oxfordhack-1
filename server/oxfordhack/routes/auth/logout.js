var express = require('express');
var router = express.Router();

router.get('/logout', function(req, res, next) {
    res.render('auth/logout');
});

module.exports = router;

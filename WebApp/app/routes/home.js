var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/nav', function(req, res, next) {
//  res.sendFile(path.join( __dirname, '../', 'views', 'home.html'));
  res.sendFile(path.join( __dirname, '../', 'views', 'navbar.html'));
});

router.get('/', function(req, res, next) {
//  res.sendFile(path.join( __dirname, '../', 'views', 'home.html'));
  res.sendFile(path.join( __dirname, '../', 'views', 'home.html'));
});

module.exports = router;

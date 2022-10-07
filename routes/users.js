var express = require('express');
var router = express.Router();

/* GET users page. */
router.get('/', function(req, res, next) {
  res.render("users.js");
  //res.render('index', { title: 'Express' });
});

module.exports = router;
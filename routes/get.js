var express = require('express');
var router = express.Router();

/* GET vacc page. */
router.get('/', function(req, res, next) {
  console.log("Running get.js")
  res.render("get");
  //res.render('index', { title: 'Express' });
});

module.exports = router;
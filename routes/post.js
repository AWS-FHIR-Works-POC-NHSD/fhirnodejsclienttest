var express = require('express');
var router = express.Router();

/* POST vacc page. */
router.get('/', function(req, res, next) {
  res.render("post");
  //res.render('index', { title: 'Express' });
});

module.exports = router;
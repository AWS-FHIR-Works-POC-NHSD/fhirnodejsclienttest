var express = require('express');
var router = express.Router();

/* POST vacc page. */
router.get('/', function(req, res, next) {
  console.log("Running post.js")
  res.render("post");
  //res.render('index', { title: 'Express' });
});

module.exports = router;
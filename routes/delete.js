var express = require('express');
var router = express.Router();

/* DELETE vacc page. */
router.get('/', function(req, res, next) {
  res.render("delete");
  //res.render('index', { title: 'Express' });
});

module.exports = router;
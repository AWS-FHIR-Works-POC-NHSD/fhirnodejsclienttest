var express = require('express');
var router = express.Router();

/* DELETE vacc page. */
router.get('/', function(req, res, next) {
  console.log("Running delete.js")
  var todelete = req.query.id;
  res.render("delete",{todelete : todelete});
  //res.render('index', { title: 'Express' });
});

module.exports = router;
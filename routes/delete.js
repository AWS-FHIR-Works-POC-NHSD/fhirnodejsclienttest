var express = require('express');
var router = express.Router();

/* DELETE vacc page. */
router.get('/', function(req, res, next) {

  console.log("Running delete.js")
  var todelete = req.query.id;

  res.render("delete",{
    todelete : todelete,
    user: req.user, 
    authenticated: req.isAuthenticated()
  });

});

module.exports = router;
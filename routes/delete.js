var express = require('express');
var router = express.Router();

/* DELETE vacc page. */
router.get('/', function(req, res, next) {

  console.log("Running delete.js")
  var todelete = req.query.id;

  if ( process.env.AUTHENTICATE == "false" || req.isAuthenticated() ) {
    res.render("delete", {
      todelete: todelete,
      user: req.user,
      authenticated: process.env.AUTHENTICATE == "false" || req.isAuthenticated(),
      username: req.user ? req.user.username : ""
    });
  } else {
    res.redirect('/login');
  }

});

module.exports = router;
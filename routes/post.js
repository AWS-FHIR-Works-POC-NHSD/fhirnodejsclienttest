var express = require('express');
var router = express.Router();

/* POST vacc page. */
router.get('/', function(req, res, next) {

  console.log("Running post.js")

  if ( process.env.AUTHENTICATE == "false" || req.isAuthenticated() ) {
    res.render("post", {
      user: req.user,
      authenticated: process.env.AUTHENTICATE == "false" || req.isAuthenticated(),
      username: req.user ? req.user.username : ""
    });
  } else {
    res.redirect('/login');
  }

});

module.exports = router;
var express = require('express');
var router = express.Router();

/* HISTORY home page. */
router.get('/', function(req, res, next) {

  console.log("Running history.js");
  if (process.env.AUTHENTICATE == "false" || req.isAuthenticated()) {
    res.render("history", {
      user: req.user,
      authenticated: process.env.AUTHENTICATE == "false" || req.isAuthenticated(),
      username: req.user ? req.user.username : ""
    });
  } else {
    res.redirect('/login');
  }

});

module.exports = router;
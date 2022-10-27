var express = require('express');
var router = express.Router();

/* Immunization Recommendation initial page. */
router.get('/', function(req, res, next) {

  console.log("Running immrecommend.js");
  if (process.env.AUTHENTICATE == "false" || req.isAuthenticated()) {
    res.render("immrecommend", {
      user: req.user,
      authenticated: process.env.AUTHENTICATE == "false" || req.isAuthenticated(),
      username: req.user ? req.user.username : ""
    });
  } else {
    res.redirect('/login');
  }

});

module.exports = router;
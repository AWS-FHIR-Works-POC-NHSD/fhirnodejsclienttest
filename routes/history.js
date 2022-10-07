var express = require('express');
var router = express.Router();

/* HISTORY home page. */
router.get('/', function(req, res, next) {

  console.log("Running history.js");
  res.render("history", {
    user: req.user, 
    authenticated: req.isAuthenticated()
  });

});

module.exports = router;
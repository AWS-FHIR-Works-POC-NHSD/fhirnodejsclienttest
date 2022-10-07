var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

console.log("req.isAuthenticated()=" + req.isAuthenticated() )

 if ( req.isAuthenticated() == true ) {
    var user= req.user;
    var username= req.user.username;
 } else {
    var user= "";
    var username= "";
 }

   res.render("home", { 
    user: user, 
    username: username,
    authenticated: req.isAuthenticated() 
  });


/*
  res.render("home", { 
    user: req.user, 
    username: req.user.username,
    authenticated: req.isAuthenticated() 
  });
    */


});

module.exports = router;
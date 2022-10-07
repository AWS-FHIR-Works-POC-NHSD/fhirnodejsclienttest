var express = require('express');
var router = express.Router();
const axios = require('axios');

// Load environment variables from .env
var dotenv = require('dotenv');
dotenv.config();

/* GET Patient (retrieve) page. */
router.get('/', function(req, res, next) {

console.log("Inside /getpatient");

    var id                          = "";
    var identifier                  = "";
    var identifierSystem            = "";
    var givenName                   = "";   
    var lastName                   = "";   
    var gender                      = "";
    var birthDate                   = "";
    var deceasedDateTime            = "";
    
    res.render("patient",{
      id : id,
      identifier : identifier,
      identifierSystem : identifierSystem,
      givenName : givenName,
      lastName : lastName,
      gender : gender,
      birthDate : birthDate,
      deceasedDateTime : deceasedDateTime,
      user: req.user, 
      authenticated: req.isAuthenticated()
    })

});

module.exports = router;
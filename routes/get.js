var express = require('express');
var router = express.Router();

/* GET vacc page. */
router.get('/', function(req, res, next) {
  console.log("Running get.js");

    var id = "";
    var identifier = "";
    var identifierSystem = "";
    var nhsNumber = "";
    var vaccineProcedureCode = "";
    var vaccineProcedureDisplay = "";
    var vaccineProductCode          = "";
    var vaccineProductDisplay   = "";
    var date                        = "";
    var bodysite                    = "";
    var bodysiteCode                = "";
    var bodysiteDisplay             = "";
    var recorded                    = "";
    var batchNumber                 = "";
    var expirationDate              = "";
    var reasonCode                  = "";
    var reasonDisplay           = "";

    if ( process.env.AUTHENTICATE == "false" || req.isAuthenticated() ) {
        res.render("get", {
            id: id,
            identifier: identifier,
            identifierSystem: identifierSystem,
            nhsNumber: nhsNumber,
            date: date,
            bodysite: bodysite,
            bodysiteCode: bodysiteCode,
            bodysiteDisplay: bodysiteDisplay,
            recorded: recorded,
            vaccineProcedureCode: vaccineProcedureCode,
            vaccineProcedureDisplay: vaccineProcedureDisplay,
            vaccineProductCode: vaccineProductCode,
            vaccineProductDisplay: vaccineProductDisplay,
            batchNumber: batchNumber,
            expirationDate: expirationDate,
            reasonCode: reasonCode,
            reasonDisplay: reasonDisplay,
            authenticated: process.env.AUTHENTICATE == "false" || req.isAuthenticated(),
            user: req.user,
            username: req.user ? req.user.username : "" 
        }); 
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
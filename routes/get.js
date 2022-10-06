var express = require('express');
var router = express.Router();

/* GET vacc page. */
router.get('/', function (req, res, next) {
  console.log("Running get.js");

  var id = "";
  var identifier = "";
  var identifierSystem = "";
  var nhsNumber = "";
  var vaccineProcedureCode = "";
  var vaccineProcedureDescription = "";
  var vaccineProductCode = "";
  var vaccineProductDescription = "";
  var date = "";
  var recorded = "";
  var batchNumber = "";
  var expirationDate = "";
  var reasonCode = "";
  var reasonDescription = "";

  res.render("get", {
    id: id,
    identifier: identifier,
    identifierSystem: identifierSystem,
    nhsNumber: nhsNumber,
    date: date,
    recorded: recorded,
    vaccineProcedureCode: vaccineProcedureCode,
    vaccineProcedureDescription: vaccineProcedureDescription,
    vaccineProductCode: vaccineProductCode,
    vaccineProductDescription: vaccineProductDescription,
    batchNumber: batchNumber,
    expirationDate: expirationDate,
    reasonCode: reasonCode,
    reasonDescription: reasonDescription
  });

});

module.exports = router;
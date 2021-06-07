var express = require('express');
var router = express.Router();

/* GET vacc page. */
router.get('/', function(req, res, next) {
  console.log("Running get.js");

    var FHIRId = "";
    var nhsNumber = "";
    var vaccineProcedureCode = "";
    var vaccineProcedureDescription = "";
    var vaccineProductCode          = "";
    var vaccineProductDescription   = "";
    var batchNumber                 = "";
    var expirationDate              = "";

  res.render("get",{ 
      FHIRId : FHIRId,
      nhsNumber : nhsNumber,
      vaccineProcedureCode : vaccineProcedureCode,
      vaccineProcedureDescription : vaccineProcedureDescription,
      vaccineProductCode : vaccineProductCode,
      vaccineProductDescription : vaccineProductDescription,
      batchNumber : batchNumber,
      expirationDate : expirationDate
  });
  
});

module.exports = router;
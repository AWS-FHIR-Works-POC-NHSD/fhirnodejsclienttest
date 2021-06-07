var express = require('express');
var router = express.Router();
const axios = require('axios');

const methodOverride = require('method-override')

// Load environment variables from .env
var dotenv = require('dotenv');
dotenv.config();

axios.defaults.baseURL = process.env.HOSTNAME;
axios.defaults.headers.common['Authorization'] = process.env.AUTH_TOKEN;
axios.defaults.headers.common['x-api-key'] = process.env.XAPIKEY;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

/* UPDATE vacc page. */
router.get('/', function(req, res, next) {

console.log("Inside Running update.js");
console.log("REQ body:" + req.body)

/*
var POCidentifier = req.query.POCidentifier;
console.log("The Immunization_Id is " + POCidentifier );
*/

var id = req.query.id;
console.log("The FHIR resource id " + id );

axios.get('/Immunization/' + id )
  .then(function (response) {
    // handle success
    //console.log(response);

    var id                          = response.data.id;
    var nhsNumber                   = response.data.patient.identifier.value;
    var POCidentifier               = response.data.identifier[0].value;
    var vaccineProcedureCode        = response.data.extension[0].valueCodeableConcept.coding[0].code;
    var vaccineProcedureDescription = response.data.extension[0].valueCodeableConcept.coding[0].display;
    var vaccineProductCode          = response.data.vaccineCode.coding[0].code;
    var vaccineProductDescription   = response.data.vaccineCode.coding[0].display;
    var batchNumber                 = response.data.lotNumber;
    var expirationDate              = response.data.expirationDate;
    
    console.log("Update.js values before render");
    console.log("id: " + id );
    console.log("POCidentifier: " + POCidentifier );

    res.render("update", { 
      id : id,
      POCidentifier : POCidentifier,
      nhsNumber : nhsNumber,
      vaccineProcedureCode : vaccineProcedureCode,
      vaccineProcedureDescription : vaccineProcedureDescription,
      vaccineProductCode : vaccineProductCode,
      vaccineProductDescription : vaccineProductDescription,
      batchNumber : batchNumber,
      expirationDate : expirationDate
    })
  })
  .catch(function (error) {
    // handle error
    //console.log(error);
  })
  .then(function () {
    // always executed
  });

});

module.exports = router;
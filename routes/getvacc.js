var express = require('express');
var router = express.Router();
const axios = require('axios');

// Load environment variables from .env
var dotenv = require('dotenv');
dotenv.config();

axios.defaults.baseURL = process.env.HOSTNAME;
axios.defaults.headers.common['Authorization'] = process.env.AUTH_TOKEN;
axios.defaults.headers.common['x-api-key'] = process.env.XAPIKEY;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

/* GET VACC (retrieve) page. */
router.get('/', function(req, res, next) {

console.log("Inside /getvacc!");

//console.log("req.query :" + req.body)
var id = req.query.id;
console.log("The FHIR resource id " + id );

axios.get('/Immunization/' + id )
  .then(function (response) {
    // handle success
    //console.log(response);

    var id                          = response.data.id;
    var POCidentifier               = response.data.identifier[0].value;
    var fulldate                    = response.data.occurrenceDateTime;
    var date                        = fulldate.substring(0, 10);
    var nhsNumber                   = response.data.patient.identifier.value;
    var vaccineProcedureCode        = response.data.extension[0].valueCodeableConcept.coding[0].code;
    var vaccineProcedureDescription = response.data.extension[0].valueCodeableConcept.coding[0].display;
    var vaccineProductCode          = response.data.vaccineCode.coding[0].code;
    var vaccineProductDescription   = response.data.vaccineCode.coding[0].display;
    var batchNumber                 = response.data.lotNumber;
    var expirationDate              = response.data.expirationDate;
    var reasonCode                  = response.data.reasonCode[0].coding[0].code;
    var reasonDescription           = response.data.reasonCode[0].coding[0].display;

/*
    console.log(id);
    console.log(POCidentifier);
    console.log(fulldate);
    console.log(date);
    console.log(nhsNumber);
    console.log(vaccineProcedureCode);
    console.log(vaccineProcedureDescription);
    console.log(vaccineProductCode);
    console.log(vaccineProductDescription);
    console.log(batchNumber);
    console.log(expirationDate);
*/

    res.render("get", { 
      id : id,
      POCidentifier : POCidentifier,
      nhsNumber : nhsNumber,
      date : date,
      vaccineProcedureCode : vaccineProcedureCode,
      vaccineProcedureDescription : vaccineProcedureDescription,
      vaccineProductCode : vaccineProductCode,
      vaccineProductDescription : vaccineProductDescription,
      batchNumber : batchNumber,
      expirationDate : expirationDate,
      reasonCode : reasonCode,
      reasonDescription : reasonDescription
    })
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

});

module.exports = router;
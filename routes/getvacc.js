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

console.log("req.query :" + req.body)
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
      expirationDate : expirationDate
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
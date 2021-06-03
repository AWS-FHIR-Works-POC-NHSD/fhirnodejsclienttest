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

//var immunization_id = "";
var immunization_id = req.query.immunizationid;
console.log("The Immunization_Id is " + immunization_id );

axios.get('/Immunization/' + immunization_id )
  .then(function (response) {
    // handle success
    //console.log(response);

    var FHIRId = response.data.id;
    var vaccineProcedureCode        = response.data.extension[0].valueCodeableConcept.coding[0].code;
    var vaccineProcedureDescription = response.data.extension[0].valueCodeableConcept.coding[0].display;
    var vaccineProductCode          = response.data.vaccineCode.coding[0].code;
    var vaccineProductDescription   = response.data.vaccineCode.coding[0].display;
    var batchNumber                 = response.data.lotNumber;
    var expirationDate              = response.data.expirationDate;
    /*
    console.log("FHIRId=" + FHIRId);
    console.log("vaccineProcedureCode=" + vaccineProcedureCode);
    console.log("vaccineProcedureDescription=" + vaccineProcedureDescription);
    console.log("vaccineProductCode=" + vaccineProcedureCode);
    console.log("vaccineProductDescription=" + vaccineProcedureDescription);
    */
    
    res.render("get", { 
      FHIRId : FHIRId,
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
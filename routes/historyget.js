var express = require('express');
var router = express.Router();
const axios = require('axios');
var bodyParser = require("body-parser");

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

    console.log("Inside /historyget!");

    console.log("req.query :" + req.query)
    //console.log("req.query :" + req.body)
    var id = req.query.id;
    //global id = req.query.id;
    console.log("The Patient FHIR resource id " + id );

    //console.log( "axios.defaults.baseURL" + axios.defaults.baseURL );
    //console.log( "process.env.HOSTNAME" + process.env.HOSTNAME );
    var URL =  axios.defaults.baseURL + '/Immunization/?patient=https://sandbox.api.service.nhs.uk/personal-demographics/Patient/' + id;
    console.log( "Axios get call URL: " + URL );

/* axios.get('/Immunization/?patient=Patient/' + id ) */
/* axios.get('/Immunization/?patient=https://sandbox.api.service.nhs.uk/personal-demographics/Patient/' + process.env.PATIENT) */
 axios.get( URL )
    .then(function (response) {
        // handle success
        console.log(response.data);
        console.log("success");
        
        //var numberOfResources = "3";
        var numberOfResources = response.data.total;
        console.log("numberOfResources : " + numberOfResources);

global.immCounter = 0;
global.id = [];
global.nhsnumber = [];
global.identifierSystem = [];
global.identifierValue = [];
global.status = [];
global.vaccineProcedureCode = [];
global.vaccineProcedureDisplay = [];
global.vaccineCodeSNOMED = []; 
global.vaccineCodeDisplay = []; 
global.occurrenceDateTime = [];
global.recorded = [];
global.primarySource = [];
global.reasonCode = [];
global.reasonDescription = [];

for (i = 0; i < numberOfResources; i++) {

    console.log("i : " + i);

    var resource = response.data.entry[i].resource.resourceType;
    console.log( "this is the resource " + resource );

   if (resource == "Immunization")  {

      global.immCounter++;

      console.log("i is " + i );

      global.id[i]                      = response.data.entry[i].resource.id;
      //global.id[i]                    = 1;
      //global.nhsnumber[i]               = response.data.entry[i].resource.patient.reference;
      global.nhsnumber[i]               = response.data.entry[i].resource.patient.identifier.value;
      global.identifierSystem[i]        = response.data.entry[i].resource.identifier[0].system;
      global.identifierValue[i]         = response.data.entry[i].resource.identifier[0].value;
      global.status[i]                  = response.data.entry[i].resource.status;
      global.vaccineProcedureCode[i]    = response.data.entry[i].resource.extension[0].valueCodeableConcept.coding[0].code;   
      global.vaccineProcedureDisplay[i] = response.data.entry[i].resource.extension[0].valueCodeableConcept.coding[0].display;
      global.vaccineCodeSNOMED[i]       = response.data.entry[i].resource.vaccineCode.coding[0].code;
      global.vaccineCodeDisplay[i]      = response.data.entry[i].resource.vaccineCode.coding[0].display;
      global.occurrenceDateTime[i]      = response.data.entry[i].resource.occurrenceDateTime;
      global.recorded[i]                = response.data.entry[i].resource.recorded;
      global.primarySource[i]           = response.data.entry[i].resource.primarySource;
      global.reasonCode[i]              = response.data.entry[i].resource.reasonCode[0].coding[0].code;
      global.reasonDescription[i]       = response.data.entry[i].resource.reasonCode[0].coding[0].display;

      console.log("Immcounter " + immCounter);

    }

}

    res.render("historyget", { 
      user: req.user, 
      authenticated: req.isAuthenticated()
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
var express = require('express');
var router = express.Router();
const axios = require('axios');
var bodyParser = require("body-parser");

// Load environment variables from .env
var dotenv = require('dotenv');
dotenv.config();

/* GET VACC (retrieve) page. */
router.get('/', function(req, res, next) {

    console.log("Inside /historyget!");
    //console.log("Axios bearer token is as follows : " +  );

    if ( process.env.AUTHENTICATE == "false" || req.isAuthenticated() ) {

        console.log("req.query :" + req.query)
        //console.log("req.query :" + req.body)
        var id = req.query.id;
        //global id = req.query.id;
        console.log("The Patient FHIR resource id " + id);

        //console.log( "axios.defaults.baseURL" + axios.defaults.baseURL );
        //console.log( "process.env.HOSTNAME" + process.env.HOSTNAME );
        var URL = '/Immunization/?patient=' + process.env.PDSENDPOINT + '/Patient/' + id;
        console.log("Axios get call URL: " + URL);

         axios.get(URL)
            .then(function (response) {
                // handle success
                //console.log(response.data);
                console.log("success");

                var numberOfResources = 0;
                if (JSON.stringify(response.data).indexOf("entry") > 0 ) {
                    console.log("Vaccination entry or entries exists");
                    numberOfResources = response.data.entry.length;
                } else {
                    console.log("No vaccination  entry exists");
                    numberOfResources =0;
                }
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
                global.bodysiteCode = [];
                global.bodysiteDisplay = [];
                global.recorded = [];
                global.primarySource = [];
                global.reasonCode = [];
                global.reasonDescription = [];

                 for (i = 0; i < numberOfResources; i++) { 

                    console.log("i : " + i);

                    var resource = response.data.entry[i].resource.resourceType;
                    console.log("this is the resource " + resource);

                    if (resource == "Immunization") {

                        global.immCounter++;

                        console.log("i is " + i);
                        //console.log( JSON.stringify( response.data.entry[i] ) );

                        global.id[i] = response.data.entry[i].resource.id;
                        //global.nhsnumber[i] = response.data.entry[i].resource.patient.identifier.value;
                        global.nhsnumber[i] = response.data.entry[i].resource.patient.reference;
                        global.identifierSystem[i] = response.data.entry[i].resource.identifier[0].system;
                        global.identifierValue[i] = response.data.entry[i].resource.identifier[0].value;
                        global.status[i] = response.data.entry[i].resource.status;
                        global.vaccineProcedureCode[i] = response.data.entry[i].resource.extension[0].valueCodeableConcept.coding[0].code;
                        global.vaccineProcedureDisplay[i] = response.data.entry[i].resource.extension[0].valueCodeableConcept.coding[0].display;
                        global.vaccineCodeSNOMED[i] = response.data.entry[i].resource.vaccineCode.coding[0].code;
                        global.vaccineCodeDisplay[i] = response.data.entry[i].resource.vaccineCode.coding[0].display;
                        global.occurrenceDateTime[i] = response.data.entry[i].resource.occurrenceDateTime;
                        global.bodysiteCode[i] = response.data.entry[i].resource.site.coding[0].code;
                        global.bodysiteDisplay[i] = response.data.entry[i].resource.site.coding[0].display;
                        global.recorded[i] = response.data.entry[i].resource.recorded;
                        global.primarySource[i] = response.data.entry[i].resource.primarySource;
                        global.reasonCode[i] = response.data.entry[i].resource.reasonCode[0].coding[0].code;
                        global.reasonDescription[i] = response.data.entry[i].resource.reasonCode[0].coding[0].display;

                        console.log("Immcounter " + immCounter);

                    }

                }
                if (process.env.AUTHENTICATE == "false" || req.isAuthenticated()) {
                    res.render("historyget", {
                        user: req.user,
                        authenticated: process.env.AUTHENTICATE == "false" || req.isAuthenticated(),
                        username: req.user ? req.user.username : ""
                    })
                } else {
                    res.redirect('/login');
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    } else {
        res.redirect('/login');
    }
});


module.exports = router;
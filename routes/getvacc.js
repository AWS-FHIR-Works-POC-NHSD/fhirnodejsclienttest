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
if ( process.env.AUTHENTICATE == "false" || req.isAuthenticated() ) {
//console.log("req.query :" + req.body)
    var id = req.query.id;
    console.log("The FHIR resource id " + id);

    axios.get('/Immunization/' + id)
        .then(function (response) {
            // handle success
            //console.log(response);

            var id = "";
            var identifier = "";
            var identifierSystem = "";
            var fulldate = "";
            var date = "";
            var bodysiteCode = "";
            var bodysiteDisplay = "";
            var recorded = "";
            var nhsNumber = "";
            var vaccineProcedureCode = "";
            var vaccineProcedureDisplay = "";
            var vaccineProductCode = "";
            var vaccineProductDisplay = "";
            var batchNumber = "";
            var expirationDate = "";
            var reasonCode = "";
            var reasonDisplay = "";

            id = response.data.id;
            identifier = response.data.identifier[0].value;
            identifierSystem = response.data.identifier[0].system;
            fulldate = response.data.occurrenceDateTime;
            date = fulldate.substring(0, 10);
            bodysiteCode = response.data.site.coding[0].code;
            bodysiteDisplay = response.data.site.coding[0].display;
            recorded = response.data.recorded;
            //nhsNumber                   = response.data.patient.identifier.value;
            nhsNumber = response.data.patient.reference;
            vaccineProcedureCode = response.data.extension[0].valueCodeableConcept.coding[0].code;
            vaccineProcedureDisplay = response.data.extension[0].valueCodeableConcept.coding[0].display;
            vaccineProductCode = response.data.vaccineCode.coding[0].code;
            vaccineProductDisplay = response.data.vaccineCode.coding[0].display;
            batchNumber = response.data.lotNumber;
            expirationDate = response.data.expirationDate;
            reasonCode = response.data.reasonCode[0].coding[0].code;
            reasonDisplay = response.data.reasonCode[0].coding[0].display;

            res.render("get", {
                id: id,
                identifier: identifier,
                identifierSystem: identifierSystem,
                nhsNumber: nhsNumber,
                date: date,
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
                user: req.user,
                authenticated: process.env.AUTHENTICATE == "false" || req.isAuthenticated(),
                username: req.user ? req.user.username : ""
            })
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
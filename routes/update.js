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

    if ( process.env.AUTHENTICATE == 'false' || req.isAuthenticated() ) {

        var id = req.query.id;
        console.log("The FHIR resource id " + id);

        axios.get('/Immunization/' + id)
            .then(function (response) {
                // handle success
                //console.log(response);
                console.log("Inside update.js get Immunization call");

                var id = response.data.id;
                var nhsNumber = response.data.patient.identifier.value;
                var pocidentifier = response.data.identifier[0].value;
                console.log("pocidentifier = " + pocidentifier);

                var fulldate = response.data.occurrenceDateTime;
                var date = fulldate.substring(0, 10);

                var vaccineProcedureCode        = response.data.extension[0].valueCodeableConcept.coding[0].code;
                var vaccineProcedureDescription = response.data.extension[0].valueCodeableConcept.coding[0].display;
                var vaccineProductCode          = response.data.vaccineCode.coding[0].code;
                var vaccineProductDescription   = response.data.vaccineCode.coding[0].display;
                var bodysite                    = response.data.bodysite;
                var batchNumber                 = response.data.lotNumber;
                var expirationDate              = response.data.expirationDate;
                var vaccineProcedure = "";
                var vaccineProduct = "";
                //var reason                      = response.data.reasonCode.coding[0].display;

                res.render("update", {
                    id: id,
                    pocidentifier: pocidentifier,
                    nhsNumber: nhsNumber,
                    date: date,
                    vaccineProcedure: vaccineProcedure,
                    vaccineProduct: vaccineProduct,
                    bodysite: bodysite,
                    batchNumber: batchNumber,
                    expirationDate: expirationDate,
                    user: req.user,
                    authenticated: process.env.AUTHENTICATE == "false" || req.isAuthenticated(),
                    username: req.user ? req.user.username : "" /*,
                    reason : reason */
                })
            })
            .catch(function (error) {
                // handle error
                //console.log(error);
            })
            .then(function () {
                // always executed
            });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
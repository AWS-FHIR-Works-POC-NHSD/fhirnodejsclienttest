var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET ImmunizationRecommendation (retrieve) page. */

router.get('/', function(req, res, next) {

    console.log("Inside /immrecommendget!");
    //console.log("Axios bearer token is as follows : " +  );

    if ( process.env.AUTHENTICATE == "false" || req.isAuthenticated() ) {

        console.log("req.query :" + req.query)
        //console.log("req.query :" + req.body)
        var id = req.query.id;
        //global id = req.query.id;
        console.log("The Patient FHIR resource id " + id);

        var URL = '/ImmunizationRecommendation/?patient=' + process.env.PDSENDPOINT + '/Patient/' + id;
        console.log("Axios get call URL: " + URL);

         axios.get(URL)
            .then(function (response) {
                // handle success
                //console.log(response.data);
                console.log("success");

                var numberOfResources = 0;
                if (JSON.stringify(response.data).indexOf("entry") > 0 ) {
                    console.log("ImmunizationRecommendation entry or entries exists");
                    numberOfResources = response.data.entry.length;
                } else {
                    console.log("No ImmunizationRecommendation entry exists");
                    numberOfResources =0;
                }
                console.log("numberOfResources : " + numberOfResources);

                global.immrecCounter = 0;
                global.id = [];
                global.identifierSystem = [];
                global.identifierValue = [];
                global.date = [];
                global.vaccineCodeSNOMED = [];
                global.vaccineCodeDisplay = [];
                global.diseaseCodeSNOMED = [];
                global.diseaseCodeDisplay = [];
                global.dateCriterionDisplay = [];
                global.dateCriterionValue = [];

                 for (i = 0; i < numberOfResources; i++) { 

                    console.log("i : " + i);

                    var resource = response.data.entry[i].resource.resourceType;
                    console.log("this is the resource " + resource);

                    if (resource == "ImmunizationRecommendation") {

                        global.immrecCounter++;

                        console.log("i is " + i);
                        //console.log( JSON.stringify( response.data.entry[i] ) );

                        global.id[i] = response.data.entry[i].resource.id;
                        global.identifierSystem[i] = response.data.entry[i].resource.identifier[0].system;
                        global.identifierValue[i] = response.data.entry[i].resource.identifier[0].value;
                        global.date[i] = response.data.entry[i].resource.date;
                        global.vaccineCodeSNOMED[i] = response.data.entry[i].resource.recommendation[0].vaccineCode[0].coding[0].code;
                        global.vaccineCodeDisplay[i] = response.data.entry[i].resource.recommendation[0].vaccineCode[0].coding[0].display;
                        global.diseaseCodeSNOMED[i] = response.data.entry[i].resource.recommendation[0].targetDisease.coding[0].code;
                        global.diseaseCodeDisplay[i] = response.data.entry[i].resource.recommendation[0].targetDisease.coding[0].display;
                        global.dateCriterionDisplay[i] = response.data.entry[i].resource.recommendation[0].dateCriterion[0].code.coding[0].display;
                        global.dateCriterionValue[i] = response.data.entry[i].resource.recommendation[0].dateCriterion[0].value;

/*
                        console.log("identifierSystem " + identifierSystem[i]);
                        console.log("identifierValue " + identifierValue[i]);
                        console.log("vaccineCodeSNOMED " + vaccineCodeSNOMED[i]);
                        console.log("vaccineCodeDisplay " + vaccineCodeDisplay[i]);
                        console.log("diseaseCodeSNOMED " + diseaseCodeSNOMED[i]);
                        console.log("diseaseCodeDisplay " + diseaseCodeDisplay[i]);
                        console.log("dateCriterionDisplay " + dateCriterionDisplay[i]);
                        console.log("dateCriterionValue " + dateCriterionValue[i]);
*/
                        console.log("immrecCounter " + immrecCounter);

                    }

                }

                if (process.env.AUTHENTICATE == "false" || req.isAuthenticated()) {
                    res.render("immrecommendget", {
                        identifierSystem: identifierSystem,
                        identifierValue: identifierValue,
                        date: date,
                        vaccineCodeSNOMED: vaccineCodeSNOMED,
                        vaccineCodeDisplay: vaccineCodeDisplay,
                        diseaseCodeSNOMED: diseaseCodeSNOMED,
                        diseaseCodeDisplay: diseaseCodeDisplay,
                        dateCriterionDisplay: dateCriterionDisplay,
                        dateCriterionValue: dateCriterionValue,
                        authenticated: process.env.AUTHENTICATE == "false" || req.isAuthenticated()
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
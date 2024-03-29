var express = require('express');
var router = express.Router();
const axios = require('axios');
//const {v4 : uuidv4} = require('uuid')

/*
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
*/

/* UPDATE (put) vacc page. */
router.post('/', function(req, res, next) {

  console.log("Inside updatevacc.js")
  console.log(req.body);

  if ( process.env.AUTHENTICATE == 'false' || req.isAuthenticated() ) {

      var id = req.body.id;
      var POCidentifier = req.body.pocidentifier;
      var nhsNumber = req.body.nhsnumber;
      var vaccineProcedure = req.body.vaccprocedure;
      var date = req.body.date + "T00:00:00.000+00:00";
      var bodysite = req.body.bodysite;
      var expirationDate = req.body.expirydate;
      var lotNumber = req.body.batchnumber;
      var reason = req.body.reason;
      var recordedDate = req.body.recorded;

      /* vaccination procedures */

      if (vaccineProcedure == "mmrdose1") {
          vaccineProcedureCode = "308081000000105";
          vaccineProcedureDescription = "Measles mumps and rubella vaccination - first dose";
      }
      if (vaccineProcedure == "mmrdose2") {
          vaccineProcedureCode = "170433008";
          vaccineProcedureDescription = "Administration of second dose of measles and mumps and rubella vaccine";
      }
      if (vaccineProcedure == "polioboostercampaign") {
          vaccineProcedureCode = "170356000";
          vaccineProcedureDescription = "Administration of booster dose of vaccine product containing only Human poliovirus antigen";
      }
      if (vaccineProcedure == "covdose1") {
          vaccineProcedureCode = "1324681000000101";
          vaccineProcedureDescription = "Administration of first dose of SARS-CoV-2 (severe acute respiratory syndrome coronavirus 2) vaccine";
      }
      if (vaccineProcedure == "covdose2") {
          vaccineProcedureCode = "1324691000000104";
          vaccineProcedureDescription = "Administration of second dose of SARS-CoV-2 (severe acute respiratory syndrome coronavirus 2) vaccine";
      }
      if (vaccineProcedure == "covbooster") {
          vaccineProcedureCode = "1362591000000103";
          vaccineProcedureDescription = "Immunisation course to maintain protection against SARS-CoV-2 (severe acute respiratory syndrome coronavirus 2)";
      }
      if (vaccineProcedure == "hpvdose") {
          vaccineProcedureCode = "734152003";
          vaccineProcedureDescription = "Administration of vaccine product containing only Human papillomavirus 6, 11, 16 and 18 antigens";
      }

      /* vaccine types (products) */

      var vaccineProduct = req.body.vaccine;

      if (vaccineProduct == "priorix") {
          vaccineProductCode = "34925111000001104";
          vaccineProductDescription = "Priorix vaccine powder and solvent for solution for injection 0.5ml pre-filled syringes (GlaxoSmithKline UK Ltd)";
      }
      if (vaccineProduct == "mmrvaxpro") {
          vaccineProductCode = "13968211000001108";
          vaccineProductDescription = "M-M-RVAXPRO vaccine powder and solvent for suspension for injection 0.5ml pre-filled syringes (Merck Sharp & Dohme (UK) Ltd)";
      }
      if (vaccineProduct == "infanrixhexa") {
          vaccineProductCode = "34765811000001105";
          vaccineProductDescription = "Infanrix Hexa vaccine powder and suspension for suspension for injection 0.5ml pre-filled syringes (GlaxoSmithKline UK Ltd)";
      }
      if (vaccineProduct == "vaxelis") {
          vaccineProductCode = "39367111000001105";
          vaccineProductDescription = "Vaxelis vaccine suspension for injection 0.5ml pre-filled syringes (Sanofi)";
      }
      if (vaccineProduct == "boostrixipv") {
          vaccineProductCode = "26267211000001100";
          vaccineProductDescription = "Boostrix-IPV suspension for injection 0.5ml pre-filled syringes (GlaxoSmithKline UK Ltd)";
      }
      if (vaccineProduct == "revaxis") {
          vaccineProductCode = "7374311000001101";
          vaccineProductDescription = "Revaxis vaccine suspension for injection 0.5ml pre-filled syringes (Sanofi Pasteur)";
      }
      if (vaccineProduct == "vaxzevria") {
          vaccineProductCode = "39114911000001105";
          vaccineProductDescription = "COVID-19 Vaccine Vaxzevria (ChAdOx1 S [recombinant]) not less than 2.5x100,000,000 infectious units/0.5ml dose suspension for injection multidose vials (AstraZeneca UK Ltd) ";
      }
      if (vaccineProduct == "comirnaty30") {
          vaccineProductCode = "39115611000001103";
          vaccineProductDescription = "COVID-19 mRNA Vaccine Pfizer-BioNTech BNT162b2 30micrograms/0.3ml dose concentrate for suspension for injection multidose vials (Pfizer Ltd)";
      }
      if (vaccineProduct == "comirnaty10") {
          vaccineProductCode = "40384611000001108";
          vaccineProductDescription = "Comirnaty Children 5-11 years COVID-19 mRNA Vaccine 10micrograms/0.2ml dose concentrate for dispersion for injection multidose vials (Pfizer Ltd)";
      }
      if (vaccineProduct == "comirnaty0O") {
          vaccineProductCode = "40851611000001102";
          vaccineProductDescription = "Comirnaty Original/Omicron BA.1 COVID-19 mRNA Vaccine 15micrograms/15micrograms/0.3ml dose dispersion for injection multidose vials (Pfizer Ltd)";
      }
      if (vaccineProduct == "spikevax") {
          vaccineProductCode = "39326911000001101";
          vaccineProductDescription = "Spikevax COVID-19 mRNA (nucleoside modified) Vaccine 0.1mg/0.5ml dose dispersion for injection multidose vials (Moderna, Inc)";
      }
      if (vaccineProduct == "modernabspikevax0O") {
          vaccineProductCode = "40801911000001102";
          vaccineProductDescription = "COVID-19 Vaccine Spikevax 0 (Zero)/O (Omicron) 0.1mg/ml dispersion for injection multidose vials (Moderna, Inc)";
      }
      if (vaccineProduct == "gardasil") {
          vaccineProductCode = "10880211000001104";
          vaccineProductDescription = "Gardasil vaccine suspension for injection 0.5ml pre-filled syringes (Merck Sharp & Dohme (UK) Ltd)";
      }

      /* body site of vaccination */

      if (bodysite == "rightupperarm" ){
          bodysiteCode = "368209003";
          bodysiteDisplay = "Right upper arm structure (body structure)"
      }
      if (bodysite == "leftupperarm" ){
          bodysiteCode = "368208006";
          bodysiteDisplay = "Left upper arm structure (body structure)"
      }
      if (bodysite == "leftthigh" ){
          bodysiteCode = "61396006";
          bodysiteDisplay = "Structure of left thigh (body structure)"
      }
      if (bodysite == "rightthigh" ){
          bodysiteCode = "11207009";
          bodysiteDisplay = "Structure of right thigh (body structure)"
      }
      if (bodysite == "nasalcavity" ){
          bodysiteCode = "279549004";
          bodysiteDisplay = "Nasal cavity structure (body structure)"
      }
      if (bodysite == "leftbuttock" ){
          bodysiteCode = "723979003";
          bodysiteDisplay = "Structure of left buttock (body structure)"
      }
      if (bodysite == "rightbuttock" ){
          bodysiteCode = "723980000";
          bodysiteDisplay = "Structure of right buttock (body structure)"
      }
      if (bodysite == "oralcavity" ){
          bodysiteCode = "74262004";
          bodysiteDisplay = "Oral cavity structure (body structure)"
      }

      /* reason aka indication, for vaccination */

      if (reason == "diseaseoutbreak") {
          reasonCode = "443684005";
          reasonDescription = "Disease outbreak";
      }
      if (reason == "pregnant") {
          reasonCode = "77386006";
          reasonDescription = "Pregnant";
      }
      if (reason == "chocolate") {
          reasonCode = "227610000";
          reasonDescription = "Milk chocolate";
      }

//var uuid = uuidv4();

      console.log("id " + id);
      console.log("vaccineProductCode " + vaccineProductCode);
      console.log("vaccineProductDescription " + vaccineProductDescription);
      console.log("POCidentifier " + POCidentifier);
      console.log("bodysiteCode " + bodysiteCode);
      console.log("bodysiteDisplay " + bodysiteDisplay);
      //console.log("identifier UUID " + uuid);


      axios.put('/Immunization/' + id,
          {
              "resourceType": "Immunization",
              "id": id,
              "meta": {
                  "profile": [
                      "https://fhir.nhs.uk/StructureDefinition/NHSDigital-Immunization"
                  ]
              },
              "extension": [{
                  "url": "https://fhir.hl7.org.uk/StructureDefinition/Extension-UKCore-VaccinationProcedure",
                  "valueCodeableConcept": {
                      "coding": [{
                          "system": "http://snomed.info/sct",
                          "code": vaccineProcedureCode,
                          "display": vaccineProcedureDescription
                      }]
                  }
              }],
              "identifier": [
                  {
                      "system": "https://supplierABC/identifiers/vacc",
                      "value": POCidentifier
                  }
              ],
              "status": "completed",
              "vaccineCode": {
                  "coding": [
                      {
                          "system": "http://snomed.info/sct",
                          "code": vaccineProductCode,
                          "display": vaccineProductDescription
                      }
                  ]
              },
              "patient": {
                  /* "reference": "Patient/" + process.env.PATIENT, */
                  "reference": process.env.PDSENDPOINT + '/Patient/' + nhsNumber,
                  "type": "Patient",
                  "identifier": {
                      "system": "https://fhir.nhs.uk/Id/nhs-number",
                      "value": nhsNumber
                  }
              },
              "occurrenceDateTime": date,
              "recorded": recordedDate,
              "primarySource": true,
              "lotNumber": lotNumber,
              "expirationDate": expirationDate,
              "site": {
                  "coding": [
                      {
                          "system": "http://snomed.info/sct",
                          "code": bodysiteCode,
                          "display": bodysiteDisplay
                      }
                  ]
              },
              "route": {
                  "coding": [
                      {
                          "system": "http://snomed.info/sct",
                          "code": "78421000",
                          "display": "Intramuscular route (qualifier value)"
                      }
                  ]
              },
              "doseQuantity": {
                  "value": 0.5,
                  "unit": "Millilitre",
                  "system": "http://snomed.info/sct",
                  "code": "258773002"
              },
              "performer": [
                  {
                      "function": {
                          "coding": [
                              {
                                  "system": "http://terminology.hl7.org/CodeSystem/v2-0443",
                                  "code": "OP"
                              }
                          ]
                      },
                      "actor": {
                          "reference": "Practitioner/example"
                      }
                  },
                  {
                      "function": {
                          "coding": [
                              {
                                  "system": "http://terminology.hl7.org/CodeSystem/v2-0443",
                                  "code": "AP"
                              }
                          ]
                      },
                      "actor": {
                          "reference": "Practitioner/example"
                      }
                  }
              ],
              "note": [
                  {
                      "text": "Notes on adminstration of vaccine"
                  }
              ],
              "reasonCode": [
                  {
                      "coding": [
                          {
                              "system": "http://snomed.info/sct",
                              "code": reasonCode,
                              "display": reasonDescription
                          }
                      ]
                  }
              ]
          }
      )
          .then(function (response) {
              //console.log(response);
              //var newVaccId = response.data.id;
              //console.log("newVaccId = " + newVaccId);
              res.render("updatedvacc", {id: id, authenticated: process.env.AUTHENTICATE == "false" || req.isAuthenticated(), user: req.user, username: req.user ? req.user.username : ""});
          })
          .catch(function (error) {
              //console.log(error);
          });
  } else {
      res.redirect('/login');
  }
});

module.exports = router;
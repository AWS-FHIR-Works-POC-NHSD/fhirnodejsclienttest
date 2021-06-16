var express = require('express');
var router = express.Router();
const axios = require('axios');
const {v4 : uuidv4} = require('uuid')

require('dotenv').config()

// Load environment variables from .env
var dotenv = require('dotenv');
dotenv.config();

axios.defaults.baseURL = process.env.HOSTNAME;
axios.defaults.headers.common['Authorization'] = process.env.AUTH_TOKEN;
axios.defaults.headers.common['x-api-key'] = process.env.XAPIKEY;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

/* POST CREATE vacc page. */
router.post('/', function(req, res, next) {

  console.log("Running postvacc.js")
  console.log(req.body);

 var POCidentifier    = req.body.pocidentifier
 var nhsNumber        = req.body.nhsnumber;
 var vaccineProcedure = req.body.vaccprocedure;
 var date             = req.body.date + "T00:00:00.000+00:00";
 var expirationDate   = req.body.expirydate;
 var lotNumber        = req.body.batchnumber;

if (vaccineProcedure == "dose1")
 { 
  vaccineProcedureCode = "1324681000000101";
  vaccineProcedureDescription = "Administration of first dose of SARS-CoV-2 (severe acute respiratory syndrome coronavirus 2) vaccine";
}
if (vaccineProcedure == "dose2")
 { 
  vaccineProcedureCode = "1324691000000104";
  vaccineProcedureDescription = "Administration of second dose of SARS-CoV-2 (severe acute respiratory syndrome coronavirus 2) vaccine";
}

 var vaccineProduct = req.body.vaccine;

 if (vaccineProduct == "astrazeneca")
 { 
  vaccineProductCode = "39114911000001105";
  vaccineProductDescription = "COVID-19 Vaccine AstraZeneca (ChAdOx1 S [recombinant]) 5x10,000,000,000 viral particles/0.5ml dose solution for injection multidose vials (AstraZeneca)";
}
 if (vaccineProduct == "pfizer")
 { 
  vaccineProductCode = "39115611000001103";
  vaccineProductDescription = "COVID-19 mRNA Vaccine Pfizer-BioNTech BNT162b2 30micrograms/0.3ml dose concentrate for suspension for injection multidose vials (Pfizer Ltd)";
}
 if (vaccineProduct == "moderna")
 { 
  vaccineProductCode = "39326911000001101";
  vaccineProductDescription = "COVID-19 mRNA (nucleoside modified) Vaccine Moderna 0.1mg/0.5mL dose dispersion for injection multidose vials (Moderna, Inc)";
}

//var POCidentifier = uuidv4();

//console.log("THE VACCINE CHOSEN IN UI IS " + vaccineProduct);
 console.log("vaccineProductCode " + vaccineProductCode);
 console.log("vaccineProductDescription " + vaccineProductDescription);
 console.log("POCidentifier " + POCidentifier);


axios.post('/Immunization', 
{
  "resourceType": "Immunization",
  "id": "696f13f9-a246-4c28-98be-cd979b86bfe2",
  "extension":  [
      {
          "url": "https://fhir.hl7.org.uk/StructureDefinition/Extension-UKCore-VaccinationProcedure",
          "valueCodeableConcept": {
              "coding":  [
                  {
                      "system": "http://snomed.info/sct",
                      "code": vaccineProcedureCode ,  
                      "display": vaccineProcedureDescription
                  }
              ]
          }
      }
  ],
  "identifier":  [
      {
          "system": "https://tools.ietf.org/html/rfc4122",
          "value": POCidentifier  
      }
  ],
  "status": "completed",
  "vaccineCode": {
      "coding":  [
          {
              "system": "http://snomed.info/sct",
              "code": vaccineProductCode ,
              "display": vaccineProductDescription 
          }
      ]
  },
  "patient": {
      "reference": "Patient/1953684",
      "type": "Patient",
      "identifier": {
          "system": "https://fhir.nhs.uk/Id/nhs-number",
          "value": nhsNumber 
      }
  },
  "occurrenceDateTime": date, 
  "recorded": "2020-12-23",
  "primarySource": true,
  "manufacturer": {
      "display": "DREAMLAND Pharmaceuticals Ltd"
  },
  "lotNumber": lotNumber ,
  "expirationDate": expirationDate ,
  "site": {
      "coding":  [
          {
              "system": "http://snomed.info/sct",
              "code": "368208006",
              "display": "Left upper arm structure (body structure)"
          }
      ]
  },
  "route": {
      "coding":  [
          {
              "system": "http://snomed.info/sct",
              "code": "78421000",
              "display": "Intramuscular route (qualifier value)"
          }
      ]
  },
  "doseQuantity": {
      "value": 1,
      "unit": "pre-filled disposable injection",
      "system": "http://snomed.info/sct",
      "code": "3318611000001100"
  },
  "performer":  [
      {
          "actor": {
              "type": "Practitioner",
              "identifier": {
                  "system": "https://fhir.hl7.org.uk/Id/nmc-number",
                  "value": "5566789"
              },
              "display": "HOLDING, Rafferty"
          }
      },
      {
          "function": {
              "coding":  [
                  {
                      "system": "http://terminology.hl7.org/CodeSystem/v2-0443",
                      "code": "AP",
                      "display": "Administering Provider"
                  }
              ]
          },
          "actor": {
              "type": "Organization",
              "identifier": {
                  "system": "https://fhir.nhs.uk/Id/ods-organization-code",
                  "value": "RX809"
              }
          }
      }
  ],
  "reasonCode":  [
      {
          "coding":  [
              {
                  "system": "http://snomed.info/sct",
                  "code": "443684005",
                  "display": "Disease outbreak (event)"
              }
          ]
      }
  ],
  "protocolApplied":  [
      {
          "doseNumberPositiveInt": 1
      }
  ]
}
  )
  .then(function (response) {
    //console.log(response);
    var newVaccId = response.data.id;
    console.log("newVaccId = " + newVaccId);
    res.render("postcreated", { newVaccId : newVaccId } );
  })
  .catch(function (error) {
    console.log(error);
  });
 
});

module.exports = router;

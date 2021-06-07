var express = require('express');
var router = express.Router();
const axios = require('axios');
//const {v4 : uuidv4} = require('uuid')

/*
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
*/

require('dotenv').config()

// Load environment variables from .env
var dotenv = require('dotenv');
dotenv.config();

axios.defaults.baseURL = process.env.HOSTNAME;
axios.defaults.headers.common['Authorization'] = process.env.AUTH_TOKEN;
axios.defaults.headers.common['x-api-key'] = process.env.XAPIKEY;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

/* UPDATE (put) vacc page. */
router.post('/', function(req, res, next) {

  console.log("Inside updatevacc.js")
  console.log(req.body);

 var id               = req.body.id;
 var POCidentifier    = req.body.pocidentifier;
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

//var uuid = uuidv4();

 console.log("id " + id);
 console.log("vaccineProductCode " + vaccineProductCode);
 console.log("vaccineProductDescription " + vaccineProductDescription);
 console.log("POCidentifier " + POCidentifier);
 //console.log("identifier UUID " + uuid);



axios.put('/Immunization/' + id, 
{
  "resourceType": "Immunization",
  "id": id,
  "meta": {
       "profile":  [
          "https://fhir.nhs.uk/StructureDefinition/NHSDigital-Immunization"
        ]
   },
  "extension": [ {
        "url": "https://fhir.hl7.org.uk/StructureDefinition/Extension-UKCore-VaccinationProcedure",
        "valueCodeableConcept": {
          "coding": [ {
            "system": "http://snomed.info/sct",
            "code": vaccineProcedureCode,
            "display": vaccineProcedureDescription
          } ]
        }
      } ],
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
    "reference": "Patient/1953684",
    "type": "Patient",
    "identifier": {
      "system": "https://fhir.nhs.uk/Id/nhs-number",
      "value": nhsNumber
      }
  },
  "encounter": {
    "reference": "Encounter/example"
  },
  "occurrenceDateTime": date,
  "primarySource": true,
  "location": {
    "reference": "Location/1"
  },
  "manufacturer": {
    "reference": "Organization/hl7"
  },
  "lotNumber": lotNumber,
  "expirationDate": expirationDate,
  "site": {
    "coding": [
      {
        "system": "http://snomed.info/sct",
        "code": "368208006",
        "display": "Left upper arm structure (body structure)"
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
          "code": "443684005",
          "display": "Disease outbreak (event)"
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
    res.render("updatedvacc", { id : id } );
  })
  .catch(function (error) {
    //console.log(error);
  });
 
});

module.exports = router;
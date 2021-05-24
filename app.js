var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require("body-parser")
const https = require('https')
const axios = require('axios');

require('dotenv').config()

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine","ejs");

// Load environment variables from .env
var dotenv = require('dotenv');
dotenv.config();

axios.defaults.baseURL = process.env.HOSTNAME;
axios.defaults.headers.common['Authorization'] = process.env.AUTH_TOKEN;
axios.defaults.headers.common['x-api-key'] = process.env.XAPIKEY;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';


app.get("/", function(req, res){
	res.render("home");
});


app.post("/postvacc", function(req, res){
	console.log(req.body);

const createVacc = async () => {
    try {
        const res = await axios.post('/dev/Immunization', 

{
  "resourceType": "Immunization",
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
            "code": "1324681000000101",
            "display": "Administration of first dose of SARS-CoV-2 (severe acute respiratory syndrome coronavirus 2) vaccine"
          } ]
        }
      } ],
  "identifier": [
    {
      "system": "https://supplierABC/identifiers/vacc",
      "value": "7718dda1-b5ff-4192-b441-273d9639643a"
    }
  ],
  "status": "completed",
  "vaccineCode": {
  "coding": [
   {
     "system": "http://snomed.info/sct",
     "code": "39326911000001101",
     "display": "COVID-19 mRNA (nucleoside modified) Vaccine Moderna 0.1mg/0.5mL dose dispersion for injection multidose vials (Moderna, Inc)"
}
]
},
  "patient": {
    "reference": "Patient/example"
  },
  "encounter": {
    "reference": "Encounter/example"
  },
  "occurrenceDateTime": "2021-02-23T13:00:08.476+00:00",
  "primarySource": true,
  "location": {
    "reference": "Location/1"
  },
  "manufacturer": {
    "reference": "Organization/hl7"
  },
  "lotNumber": "AAJN11K",
  "expirationDate": "2021-06-23",
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
          );
        console.log(res.data);
    } catch (err) {
        console.error(err);
    }
};


createVacc();

	res.redirect("/");
});


app.listen(port, () => console.log("Server listening on port " + port ));
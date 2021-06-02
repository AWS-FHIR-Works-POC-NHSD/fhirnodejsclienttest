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

const getvacc = async () => {
    try {
        var immunization_id = "";
        var immunization_id = req.query.immunizationid;
        console.log("The Immunization_Id is " + immunization_id );
        const res = await axios.get('/dev/Immunization/' + immunization_id );
        //console.log(res.data);
        global.FHIRId                      = res.data.id;
        global.vaccineProcedureCode        = res.data.extension[0].valueCodeableConcept.coding[0].code;
        global.vaccineProcedureDescription = res.data.extension[0].valueCodeableConcept.coding[0].display;
        global.vaccineProductCode          = res.data.vaccineCode.coding[0].code;
        global.vaccineProductDescription   = res.data.vaccineCode.coding[0].display;
    } catch (err) {
        console.error(err);
    }
};

 getvacc();

 //res.redirect("/getvacc");
 res.render("get", { vaccineProcedureDescription : global.vaccineProcedureDescription } );

  //res.render("get");
});

module.exports = router;
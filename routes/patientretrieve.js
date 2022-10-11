var express = require('express');
var router = express.Router();
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

// Load environment variables from .env
var dotenv = require('dotenv');
dotenv.config();

axios.defaults.baseURL = process.env.HOSTNAME;
axios.defaults.headers.common['Authorization'] = process.env.AUTH_TOKEN;
axios.defaults.headers.common['x-api-key'] = process.env.XAPIKEY;
axios.defaults.headers.common['x-request-id'] = uuidv4();
axios.defaults.headers.common['x-correlation-id'] = uuidv4();
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

/* GET Patient (retrieve) page. */
router.get('/', function (req, res, next) {

    if ( process.env.AUTHENTICATE == "false" || req.isAuthenticated() ) {

        console.log("Inside /getpatientretireve!");

        var id = req.query.id;
        console.log("The FHIR resource id " + id);
        //var id = 9000000009;

        var pds = process.env.HOSTNAMEPDS + 'Patient/' + id;
        //console.log("pds = " + pds );

        // local instance
        const instance = axios.create({
            baseURL: process.env.PDSENDPOINT,
            headers: {
                common: {
                    Authorization: process.env.AUTH_TOKEN_PDS,
                    'x-api-key': process.env.XAPIKEY_PDS,
                    Accept: 'application/fhir+json'
                }
            }
        });

        instance.get('/Patient/' + id)
            .then(function (response) {
                // handle success
                //console.log(response);


                var id = "";
                var identifier = "";
                var identifierSystem = "";
                var gender = "";
                var birthDate = "";
                var deceasedDateTime = "";


                id = response.data.id;
                identifier = response.data.identifier[0].value;
                identifierSystem = response.data.identifier[0].system;
                givenName = response.data.name[0].given;
                lastName = response.data.name[0].family;
                gender = response.data.gender;
                birthDate = response.data.birthDate;
                deceasedDateTime = response.data.deceasedDateTime

                res.render("patient", {
                    id: id,
                    identifier: identifier,
                    identifierSystem: identifierSystem,
                    givenName: givenName,
                    lastName: lastName,
                    gender: gender,
                    birthDate: birthDate,
                    deceasedDateTime: deceasedDateTime,
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
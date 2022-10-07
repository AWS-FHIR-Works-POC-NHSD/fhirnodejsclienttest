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

/* DELETE vacc page. */
router.get('/', function(req, res, next) {

console.log("Inside /deletevacc!");

//var immunization_id = "";
var id = req.query.id;
console.log("The Immunization_Id is " + id );

axios.delete('Immunization/' + id )
  .then(function (response) {
    // handle success
    res.render("deletevacc", {
     id : id,
     user: req.user, 
     authenticated: req.isAuthenticated()
   });
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

});

module.exports = router;
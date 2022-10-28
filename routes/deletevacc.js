var express = require('express');
var router = express.Router();
const axios = require('axios');

/* DELETE vacc page. */
router.get('/', function(req, res, next) {

    if ( process.env.AUTHENTICATE == 'false' || req.isAuthenticated() ) {

        console.log("Inside /deletevacc!");

//var immunization_id = "";
        var id = req.query.id;
        console.log("The Immunization_Id is " + id);

        axios.delete('Immunization/' + id)
            .then(function (response) {
                // handle success
                res.render("deletevacc", {
                    id: id,
                    user: req.user,
                    authenticated: process.env.AUTHENTICATE == "false" || req.isAuthenticated(),
                    username: req.user ? req.user.username : ""
                });
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
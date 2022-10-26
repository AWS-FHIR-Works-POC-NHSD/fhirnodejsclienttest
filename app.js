var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require("body-parser")
//const https = require('https')
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');

const session = require('express-session');
const passport = require('passport');
const { Strategy } = require('passport-openidconnect');
const axios = require('axios');
const qs = require('qs');

var authenticated = false;

const methodOverride = require('method-override')

var homeRouter = require('./routes/home');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getPatientRouter = require('./routes/getpatient');
var getPatientRetrieveRouter = require('./routes/patientretrieve');
var getRouter = require('./routes/get');
var getvaccRouter = require('./routes/getvacc');
var postRouter = require('./routes/post');
var postvaccRouter = require('./routes/postvacc');
var updateRouter = require('./routes/update');
var updatevaccRouter = require('./routes/updatevacc');
var deleteRouter = require('./routes/delete');
var deletevaccRouter = require('./routes/deletevacc');
var historyRouter = require('./routes/history');
var historyretrievedRouter = require('./routes/historyget');

require('dotenv').config()

// Load environment variables from .env
var dotenv = require('dotenv');
dotenv.config();

// view engine setup
//app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.use(methodOverride('_method'))


app.use(session({
  secret: process.env.PASSPORTSECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// set up passport
passport.use('oidc', new Strategy({
  issuer: process.env.SSOISSUER,
  authorizationURL: process.env.SSOISSUER + '/v1/authorize',
  tokenURL: process.env.SSOISSUER + '/v1/token',
  userInfoURL: process.env.SSOISSUER + '/v1/userinfo',
  clientID: process.env.SSOCLIENTID,
  clientSecret: process.env.SSOCLIENTSECRET,
  callbackURL: process.env.SSOCALLBACKURL,
  scope: 'openid profile'
}, (issuer, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, next) => {
  next(null, user);
});

passport.deserializeUser((obj, next) => {
  next(null, obj);
});


app.use('/authorization-code/callback',
    passport.authenticate('oidc', { failureRedirect: '/error' }),
    (req, res) => {
      console.log("req.user=" + req.user);
      res.redirect('/');
    }
);

app.post('/logout', function(req, res, next) {
  console.log("POST logout")
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

/*
app.post('/logout', (req, res) => {
  console.log("POST logout")
  req.logout();
  req.session.destroy();
  res.redirect('/');
});
*/

app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use('/login', passport.authenticate('oidc'));
//app.use('/logout', homeRouter);
app.use('/patient', getPatientRouter);
app.use('/patientretrieve', getPatientRetrieveRouter);
app.use('/get', getRouter);
app.use('/getvacc', getvaccRouter);
app.use('/post', postRouter);
app.use('/postvacc', postvaccRouter);
app.use('/update', updateRouter);
app.use('/updatevacc', updatevaccRouter);
app.use('/delete', deleteRouter);
app.use('/deletevacc', deletevaccRouter);
app.use('/history', historyRouter);
app.use('/historyget', historyretrievedRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Get Azure Access token

const APP_ID = process.env.FHIRCLIENTID;
const APP_SECRET = process.env.FHIRCLIENTSECRET;
const TOKEN_ENDPOINT ='https://login.microsoftonline.com/' + process.env.FHIRTENANTID + '/oauth2/token';
const FHIR_SERVER = process.env.FHIRSERVER;

const postData = {
  client_id: APP_ID,
  client_secret: APP_SECRET,
  grant_type: 'Client_Credentials',
  resource: FHIR_SERVER
};

axios.defaults.baseURL = process.env.HOSTNAME;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Accept'] = 'application/json';

let token = '';

try {
  axios
      .post(TOKEN_ENDPOINT, qs.stringify(postData))
      .then(response => {
        //console.log(response.data);
        //console.log("Bearer token is this :" + response.data.access_token );
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
      })
      .catch(error => {
        console.log(error);
      });
} catch(e) {
  console.log('Error raised when fetching bearer token');
  console.log(e);
}

// Get list of vaccination bodysite codes from
// SCTID: 1127941000000100 Vaccine body site of administration simple reference set (foundation metadata concept) 

/*
    axios.get('https://termbrowser.nhs.uk/sct-browser-api/snomed/uk-edition/v20220928/concepts/1127941000000100/members')
        .then(function (response) {
            // handle success
            //console.log(response.data);
            numberOfResources = response.data.members.length;
            console.log("Vaccine body site refset numberOfResources : " + numberOfResources);
            
            global.bodysiteCounter = 0;
            global.bodysiteCode = [];
            global.bodysiteDisplay = [];

            for (i = 0; i < numberOfResources; i++) { 

                    console.log("i : " + i);

                        global.bodysiteCounter++;

                        //console.log("i is " + i);
                        
                        for (i = 0; i < numberOfResources; i++) { 

                          //console.log( JSON.stringify( response.data.members[i] ) );

                          //console.log("bodysiteCounter " + i);
                          global.bodysiteCode[i] = response.data.members[i].conceptId;
                          global.bodysiteDisplay[i] = response.data.members[i].defaultTerm;
                          console.log("SCTID:" + global.bodysiteCode[i] + " " + global.bodysiteDisplay[i]);
                      }

                }

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });

*/

module.exports = app;

//app.listen(port, () => console.log("Server listening on port " + port ));
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

var homeRouter = require('./routes/home');
var getRouter  = require('./routes/get');
var getvaccRouter  = require('./routes/getvacc');
var postRouter  = require('./routes/post');
var postvaccRouter  = require('./routes/postvacc');
var deleteRouter  = require('./routes/delete');

require('dotenv').config()

// Load environment variables from .env
var dotenv = require('dotenv');
dotenv.config();

// view engine setup
//app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));

app.use('/', homeRouter);
app.use('/get', getRouter);
app.use('/getvacc', getvaccRouter);
app.use('/post', postRouter);
app.use('/postvacc', postvaccRouter);
app.use('/delete', deleteRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

        global.FHIRId                      = "";
        global.vaccineProcedureCode        = "";
        global.vaccineProcedureDescription = "";
        global.vaccineProductCode          = "";
        global.vaccineProductDescription   = "";

/*
app.get("/getvacc", function(req, res){

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
});
*/

app.delete('/delete', (req, res) => {
  /*
  res.render("delete");
  const {id} = req.params
  comments = comments.filter(c => c.id !== id)
  res.redirect('/comments')
  */
})

app.get("/deletevacc", function(req, res){

const deletevacc = async () => {
    try {
        var immunization_id = req.query.immunizationid;
        console.log("The Immunization_Id is " + immunization_id );
        const res = await axios.delete('/dev/Immunization/' + immunization_id );
        console.log(res.data);
    } catch (err) {
        console.error(err);
    }
};

 deletevacc();

  res.render("deletevacc", { newVaccId : global.newVaccId } );
  //res.render("deletevacc", { newVaccId : global.newVaccId } );

});

app.listen(port, () => console.log("Server listening on port " + port ));
var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine","ejs");

var friends = ["Tony", "Miranda","Justin","Pierre","Lily"];

app.get("/friends", function(req, res){

	res.render("friends", {friends: friends});
});

app.post("/addfriend", function(req, res){
	var newFriend = req.body.newfriend;
	friends.push(newFriend);
	res.redirect("/friends");
});

app.get("/", function(req, res){
	res.render("home");
});

app.listen(port, () => console.log("Server listening on port " + port ));
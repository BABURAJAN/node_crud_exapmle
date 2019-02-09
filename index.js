var express = require('express');
var app = express();
var fs = require("fs");
var engine = require('ejs-locals');
var path = require('path');
var bodyParser = require('body-parser');

app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})

app.get('/toAddUser', function (req, res) {
        res.render('template/login');
    });

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})



app.post('/addUser', function (req, res) {
	console.log("************addUser************");
	console.log("req.body ",req.body);
	var user = {
   "user4" : {
      "name" : req.body.name,
      "password" : req.body.pswd,
      "profession" : req.body.profession,
      "id": req.body.id
   }
}
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      data["user4"] = user["user4"];
      console.log( 'data', data );
	  fs.writeFile("users.json", JSON.stringify(data));
      res.end( JSON.stringify(data));
   });
})


app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      var users = JSON.parse( data );
      var user = users["user" + req.params.id] 
      console.log( user );
      res.end( JSON.stringify(user));
   });
})


app.delete('/deleteUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      delete data["user" + 2];
      console.log( data );
      res.end( JSON.stringify(data));
   });
})



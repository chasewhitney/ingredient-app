var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var request = require('request');
var port = 5001;
var cheerio = require('cheerio');

//var ingredientList = [];
//var url = process.env.URL || require('../config.js').url;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('./server/public'));

app.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, '/public/', file));
});

app.listen(port, function(){
  console.log('Listening on port:', port);
});

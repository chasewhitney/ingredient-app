var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var request = require('request');
var port = 5001;
var cheerio = require('cheerio');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('./server/public'));

app.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, '/public/', file));
});

var ingredientList = [];
var url = process.env.URL || require('../config.js').url;

// Pull data from website and create an array of objects with name and rating of ingredients
request(url, function(err, resp, html) {
  if (!err){
    const $ = cheerio.load(html);
    $('.ingredient-result').each(function(index, element){
      ingredientList[index] = {};
      ingredientList[index]['name'] = $(element).find('.ingredient-info .ingredient-name a').text();
      ingredientList[index]['rating'] = $(element).find('.ingredient-rating').text();
    });
  }
});

app.listen(port, function(){
  console.log('Listening on port:', port);
});

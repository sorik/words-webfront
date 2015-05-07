
var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname));
app.use(express.static('bower_components'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

require('./routes')(app);

app.listen(process.env.PORT || 8004);
console.log('server is running');


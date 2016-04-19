var express = require('express');
var app = express();
var validateTokenFunc = require('./validateToken').validateToken;

app.get('/', function (req, res) {
  validateTokenFunc(req, res);
});

app.listen(80, '120.26.38.84');

var express = require('express');
var app = express();
var validateTokenFunc = require('./validateToken').validateToken;

app.get('/', function (req, res) {
  validateTokenFunc(req, res);
});

app.listen(process.env.PORT || 5050)

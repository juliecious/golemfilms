require('dotenv').config();

var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port);

console.log('Running at Port', port);
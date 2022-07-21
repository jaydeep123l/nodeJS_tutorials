"use strict";

var express = require('express');

var app = express();

var bot = require('./bot');

bot.setup(app);

var port = process.env.PORT || 3333;

app.listen(port, function() {

console.log(`App started listening on port ${port}`);

});


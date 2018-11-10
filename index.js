var express = require("express");
var app = express();

const alpha = require('alphavantage')({key: '60BR33CT7KNKZ0XS'});


alpha.data.quote('GOOGL', 'compact', 'json').then(data => {
  console.log(data);
})


const dbreset = require('./server/db/schema.js');
const db = require('./server/db/db.js');

db.connect();
dbreset.reset();


var PORT = process.env.PORT || 3000
app.listen(PORT, process.env.IP, function() {
  console.log("Market Sentiment Analysis has started at port: " + PORT);
});

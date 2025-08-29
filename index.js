// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
  // res.send("Hello Express");
});

app.get("/api/:year-:month-:day", (req, res, next) => {
  const date = new Date(Date.UTC(req.params.year, req.params.month-1, req.params.day));
  const utcTime = date.toUTCString();
  console.log(req.params);
  req.time = {
    "unix" : date.valueOf(),
    "utc" : utcTime
  }
  next();
}, (req, res) => {
  res.send(req.time);
});

app.get("/api/:unixTime", (req, res, next) => {
  const unixTime = parseInt(req.params.unixTime);
  const utcTime = new Date(unixTime).toUTCString();
  console.log(unixTime);
  req.time = {
    "unix" : unixTime,
    "utc" : utcTime
  }
  next();
}, (req, res) => {
  res.send(req.time);
});





// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

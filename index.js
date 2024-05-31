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

app.get('/api/:dateString?', (req, res) => {
  let dateString = req.params.dateString;
  
  // If dateString is undefined, use the current date
  if (!dateString) {
      dateString = new Date().toISOString();
  }

  // Check if dateString is a number (timestamp) or a valid date string
  let date;
  if (!isNaN(dateString)) {
      date = new Date(parseInt(dateString));
  } else {
      date = new Date(dateString);
  }

  // Respond with the appropriate JSON
  if (date.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
  } else {
      res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});





// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

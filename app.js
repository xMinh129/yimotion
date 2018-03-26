// Using express for server connection
var express = require('express');
// Listening on port 3000 from config file
var config = require('./config');

var app = express();
var path = require('path');

// Body-parser for json data processing
var bodyParser = require('body-parser');

// Using mongodb for database
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;


mongoose.connect('mongodb://test:test@ds159662.mlab.com:59662/medslack')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

// Requiring routing

var apiRouter = require('./routes/classes');

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.set('view engine', 'jsx');
//app.engine('jsx', require('express-react-views').createEngine());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var webpack = require("webpack");

// Serving static file

app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', apiRouter);

app.get('*', (req, res) => {
  res.render('../views/patients/index', {
    content: ''
  });
  
});


app.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
});

module.exports = app;


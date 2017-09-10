// NPM Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
const session = require('express-session');
const env = require('dotenv').load();
const exphbs = require('express-handlebars');
const path = require('path');
const LocalStrategy = require('passport-local').Strategy;

var PORT = process.env.PORT || 8080;

// Folder views will handle all of the views
app.set('views', path.join(__dirname, 'views'));

// handlebars app engine
// default layout = layout
app.engine('handlebars', exphbs({ defaultLayout:'layout' }));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware for Express sessions
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Set static public folder
app.use(express.static(path.join(__dirname, 'public')));

// Models
var models = require("./models");

// Routes
var authRoute = require('./routes/auth.js')(app, passport);

// Load passport strategies
require('./config/passport/passport.js')(passport, models.user);

// Sync Database
models.sequelize.sync().then(function() {
  console.log('Database is synced.')
}).catch(function(err) {
  console.log(err, "There is a database error.");
});

// Set Port
app.set('port', (process.env.PORT || 3000));

// Port Listener
app.listen(app.get('port'), () => {
  console.log('Server is running on port ' + app.get('port'));
});
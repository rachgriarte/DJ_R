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
const cookieParser = require('cookie-parser');
const models = require('./app/models');
const fs = require('fs');
const methodOverride = require('method-override');
const flash = require('connect-flash');

// Established port
var PORT = process.env.PORT || 3000;

// Handlebars app engine
app.engine('handlebars', exphbs({ 
  defaultLayout:'layout',
  layoutsDir: path.join(__dirname, 'app/views/layouts')
}));
app.set('view engine', 'handlebars');

// Folder views will handle all of the views
app.set('views', path.join(__dirname, 'app/views'));

// Initialize cookieParser
app.use(cookieParser());

// method-override to use with post actions in handlebars
app.use(methodOverride('_method'));

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware for Express sessions
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Connect Flash
app.use(flash());

// Global variables (res.locals)
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Set static public folder
app.use(express.static(path.join(__dirname, '/app/public')));

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
var authRoute = require('./app/routes/auth.js')(app, passport);

// Load passport strategies
require('./app/config/passport/passport.js')(passport, models.User);

if (sequelize)
  {
      sequelize.authenticate().then( function() {
          var config = sequelize.connectionManager.config;
          console.log('sequelize-heroku: Connected to '+config.host+' as '+config.username+'.');
          
          sequelize.query('SELECT 1+1 as test').then( function(res) {
              
              console.log('1+1='+res[0].test);
              
          });
          
      }).catch( function(err) {
          var config = sequelize.connectionManager.config;
          console.log('Sequelize: Error connecting '+config.host+' as '+config.user+': '+err);
      });
  }
else
  {
      console.log('No environnement variable found.');
  }

//Sync Database
models.sequelize.sync({ force: true }).then(() => {
  console.log('Database is synced.')
}).catch((err) => {
  console.log(err, "Database sync error has occurred.")
});

// App listener
app.listen(PORT, (err) => {
  if (!err)
      console.log('Server is running on port ' + PORT);
  else console.log(err)
});
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

// Established port
var PORT = process.env.PORT || 3000;

// handlebars app engine
// default layout = layout
app.engine('handlebars', exphbs({ 
  defaultLayout:'layout',
  layoutsDir: path.join(__dirname, 'app/views/layouts')
}));
app.set('view engine', 'handlebars');

// Folder views will handle all of the views
app.set('views', path.join(__dirname, 'app/views'));

app.use(cookieParser('whatever'));
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
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Set static public folder
app.use(express.static(path.join(__dirname, '/app/public')));

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/', require(path.join(__dirname, '/app/routes/auth.js')));

// Routes
var authRoute = require('./app/routes/auth.js')(app, passport);

// Load passport strategies
require('./app/config/passport/passport.js')(passport, models.user);

//Sync Database
models.sequelize.sync().then(function() {
  
     console.log('Nice! Database looks fine')
  
  }).catch(function(err) {
  
     console.log(err, "Something went wrong with the Database Update!")
  
  });   
   
  app.listen(PORT, (err) => {
      if (!err)
          console.log('Server is running on port ' + app.get(PORT));
      else console.log(err)
   
  });
// NPM dependencies
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const expVal = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');

// Connect with MongoDB
mongoose.connect('mongodb://localhost/betterapp');

const db = mongoose.connection;

// Connect routes
const routes = require('./routes/index');
const users = require('./routes/users');

// Initialize app
const app = express();

// View engine
// Folder views will handle all of the views
app.set('views', path.join(__dirname, 'views'));
// handlebars app engine
// default layout = layout
app.engine('handlebars', exphbs({ defaultLayout:'layout' }));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set static public folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for Express sessions
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Initialize PassportJS
app.use(passport.initialize());
app.use(passport.session());

// Express Validator Middleware Options
app.use(expVal({
  errorFormatter: (param, msg, value) => {
    var namespace = param.split('.'),
    root = namespace.shift(),
    formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }

    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global variables (res.locals)
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Map route files
app.use('/', routes);
app.use('/users', users);

// Set port
app.set('port', (process.env.PORT || 3000));

// Port listener
app.listen(app.get('port'), () => {
  console.log('Server is running on port ' + app.get('port'));
});
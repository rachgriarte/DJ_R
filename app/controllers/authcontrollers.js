var exports = module.exports = {}

// THIS IS JUST A TEST TO SEE IF user DATA CAN BE STORED
var con = require('../config/passport/passport.js');

// THIS IS UNDEFINED. NEED TO FIX
console.log("conUser: " + con.userData);

exports.register = function(req, res) {
  res.render('register', { css2: ['login.css'] });
}

exports.login = function(req, res) {
  res.render('login', { css2: ['login.css'] });
}

exports.logout = function(req, res) {
  req.logout();
  req.flash('success_msg', 'You have successfully logged out');
  res.redirect('/login');
}

exports.dashboard = function(req, res) {
  // users.findOne({
  //   where: {
  //     email: email
  //   }
  // })
  // console.log(con.userData.firstname);

  res.render('index', {
    css: ['style.css'],
    // firstname: con.userData.firstname
  });
}
var exports = module.exports = {}

exports.register = function(req, res) {
  res.render('register', { css2: ['login.css'] });
}

exports.login = function(req, res) {
  res.render('login', { css2: ['login.css'] });
}

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/login');
}

exports.dashboard = function(req, res) {
  // users.findOne({
  //   where: {
  //     email: email
  //   }
  // })

  res.render('index', {
    css: ['style.css'],
    // firstname: req.body.email
  });

}
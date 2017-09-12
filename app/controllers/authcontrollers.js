var exports = module.exports = {}

exports.register = (req, res) => {
  res.render('register', { css2: ['login.css'] });
}

exports.login = (req, res) => {
  res.render('login', { css2: ['login.css'] });
}

exports.logout = (req, res) => {
  req.logout();
  req.flash('success_msg', 'You have successfully logged out');
  res.redirect('/login');
}

exports.dashboard = (req, res) => {
  res.render('index', {
    css: ['style.css'],
    firstname: req.user.firstname
  });
}
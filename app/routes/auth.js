const authController = require('../controllers/authcontrollers.js');

module.exports = (app, passport) => {
  app.get('/register', authController.register);
  app.get('/login', authController.login);
  app.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/register'
  }));
  app.get('/logout', authController.logout);
  app.get('/', isLoggedIn, authController.dashboard);
  app.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }),
  (req, res) => {
    res.redirect('/');
  });
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())

    return next();

  res.redirect('/login');
}
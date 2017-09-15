

// Route Exports
module.exports = (app, models) => {
  // app.get('/register', authController.register);

  // app.get('/login', authController.login);

  // app.post('/register', 
  //   passport.authenticate('local-signup', {
  //     successRedirect: '/',
  //     failureRedirect: '/register',
  //     failureFlash: true
  //   }));

  // app.get('/logout', authController.logout);

  // app.get('/', isLoggedIn, authController.dashboard);
  
  // app.post('/login', 
  //   passport.authenticate('local-signin', {
  //     successRedirect: '/',
  //     failureRedirect: '/login',
  //     failureFlash: true,
  //     successMessage: 'Welcome to the BETter App!',
  //   }));


    app.post('/update', function(req, res) {
      var obj = req.body;

      var amount = obj.money;

      var userEmail = obj.email;



      // models.Account.update{

      // }
    });
}
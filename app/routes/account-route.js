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

  // Get route to display user account information
  app.get('/api/account/:id', (req, res) => {
    // Searches the Account table to find user
    models.Account.findOne({
      where: {
        UserId: req.params.id
      },
      include: [models.User]
    }).then((dbAccount) => {
      res.json(dbAccount);
    });
  })

  app.get('/update', (req, res) => {
    var userId = req.params.id;
    
    var userObj = req.user;
    // var accBal = obj.account_balance;
    console.log(req.body);
    console.log(req.body.userid);
    console.log(userObj);

    // models.Account.update({

    // })
  });
}
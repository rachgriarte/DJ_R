// Path to Authentication Controller
const accountController = require('../controllers/account-controller.js');

// Route Exports
module.exports = (app) => {
  app.get('/', accountController.dashboard);

  app.post('/', 
    passport.authenticate('local-signin', {
      // Account balance starts with 5000 and everytime player hits bet amount, it subracts

      // If player wins. console.log("You won #betAmount");
     
    //  else if player loses . console.log (account balance - bet amount). console.log("you lost #betAmount dollars!")
     
      successRedirect: '/',

      failureRedirect: '/',
      failureFlash: true,
      successMessage: 'Winner! Let Us Play Again!',
    }));
}

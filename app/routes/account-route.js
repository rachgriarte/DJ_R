// Path to Authentication Controller
const accountController = require('../controllers/account-controller.js');

// Route Exports
module.exports = (app) => {
  app.get('/', accountController.dashboard);

  app.post("/", (req, res) => {
    console.log(req.body);
    res.json({req.body});
  });
}

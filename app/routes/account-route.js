// Route Exports
module.exports = (app, models) => {
  // Get route to display user account information
  app.get("/api/accounts", function(req, res) {
    var query = {};

    if (req.query.account_id) {
      query.UserId = req.query.account_id;
    }

    models.Account.findAll({
      where: query,
      include: [models.User]
    }).then(function(modelsAccount) {
      res.json(modelsAccount);
    });
  });
  
  app.post('/api/accounts', (req, res) => {
    models.Account.create(req.body).then((modelsAccount) => {
      res.json(modelsAccount)
    });
  });

  app.put('/api/accounts', (req, res) => {
    models.Account.update(
      req.body,
      {
        where: {
          UserId: req.body.UserId
        }
      }).then((modelsAccount) => {
        res.json(modelsAccount);
      });
  });
}
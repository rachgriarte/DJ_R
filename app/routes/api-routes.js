// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var Player = require("../models/connection.js");

// Routes
// =============================================================
module.exports = function(app) {
  // Get all Players
  app.get("/api/all", function(req, res) {
    Player.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  // Add a player
  app.post("/api/new", function(req, res) {
    console.log("Player Data:");
    console.log(req.body);
    Player.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password
    });
  });

  // Delete a player
  app.post("/api/delete", function(req, res) {
    console.log("Player Data:");
    console.log(req.body);
    Player.destroy({
      where: {
        id: req.body.id
      }
    });
  });
};
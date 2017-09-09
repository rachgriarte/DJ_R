// Dependencies
// ====================================

// Pull in sequelize package
var Sequelize = require("sequelize");
// Reference our connection to the database
var sequelize = require("../config/connection.js")

// Create a player
var Player = sequelize.define('', {

});

// Sync with database
player.sync();
// Export the Player Model
module.exports = Player;
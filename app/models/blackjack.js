// Dependencies
// ====================================

// Pull in sequelize package
var Sequelize = require("sequelize");
// Reference our connection to the database
var sequelize = require("../config/connection.js")

// Create a player
var Player = sequelize.define('better_db', {
    id: {
        type: String,
        index: true
    },
    player_id: {
        type: String
    },
    account_balance: {
        type: String
    },
    deal: {
        type: String
    },
    win_outcome: {
        type: String
    }
    });
});

// Sync with database
Player.sync();
// Export the Player Model
module.exports = Player;
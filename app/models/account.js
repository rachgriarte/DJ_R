// Define results table in DB
module.exports = (sequelize, Sequelize) => {
var Account = sequelize.define(‘account’, {
    id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
    },
    account_balance: {
    type: Sequelize.INTEGER,
    defaultValue: 5000
    },
    bet_amount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
    },
    win_amount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
    }
});  
return Account;
}
Add Comment Collapse




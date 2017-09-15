var exports = module.exports = {};
// Outputting the account balance
exports.dashboard = (req, res) => {
  res.render('dashbiard', { css2: ['style.css'] });
  console.log('Amount Balance: ', req.accountBalance);
}
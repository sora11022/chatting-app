const accountModel = require('../models/account.model');

module.exports = {
  renderChat: async (req, res) => {
    const accounts = await accountModel.find();
    return res.render('chat.ejs', { accounts: accounts });
  },
};

const express = require('express');
const router = express.Router();

const { renderChat } = require('../controller/view.controller');

router.route('/').get(async (req, res) => {
  res.render('login.ejs');
});
router.route('/chat').get(renderChat);
module.exports = router;

const { addMessage } = require('../controllers/messages');
const { getAllMessages } = require('../controllers/messages');
const router = require('express').Router();

router.post('/addMessage', addMessage);
router.post('/getAllMessages', getAllMessages);

module.exports = router;

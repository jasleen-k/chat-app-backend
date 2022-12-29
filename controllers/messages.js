const Message = require('../models/Message');

module.exports.addMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) return res.json({ msg: 'message added successfully.' });
    return res.json({ msg: 'failed to add message to database.' });
  } catch (err) {
    return res.status(500).send('something went wrong. please try again.');
  }
};

module.exports.getAllMessages = async (req, res) => {
  try {
    const { from, to } = req.body;
    const messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectMessages);
  } catch (err) {
    return res.status(500).send('something went wrong. please try again.');
  }
};

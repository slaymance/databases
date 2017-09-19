var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get((messages) => {
        res.send({results: messages});
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post((id) => {
        res.send({id: 1});
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};


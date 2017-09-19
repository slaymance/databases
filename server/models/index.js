var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.query(`SELECT messages.id, messages.createdAt, messages.text, usernames.username
        FROM messages INNER JOIN usernames WHERE messages.username = usernames.id`, [], (err, results) => {
          if (err) {
            return err;
          }
          callback(results);
        });
    }, // a function which produces all the messages
    post: function (callback) {
      db.query('SELECT id FROM messages', [], (err, results) => {
        if (err) {
          return err;
        }
        callback(results);
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};


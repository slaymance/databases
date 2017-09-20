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
    },
    post: function (message, callback) {
      db.query(`INSERT INTO messages (text, username) 
        SELECT '${message.text}', usernames.id
        FROM usernames WHERE usernames.username = '${message.username}'`, (err, result) => {
        if (err) {
          return err;
        }
        callback(result.insertId);
      });
    }
  },


  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

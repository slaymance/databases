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
    post: function (message, callback) {
      let promiseArray = [];
      promiseArray.push(db.query(`SELECT username FROM usernames WHERE username = '${message.username}'`, [], (err, results) => {
        if (err) {
          return err;
        }

        if (!results.length) {
          promiseArray.push(db.query(`INSERT INTO usernames (username) VALUES ('${message.username}')`, (err, result) => {
            if (err) {
              return err;
            }
            console.log('SUCCESS');
          }));
        }
      }));

      promiseArray.push(db.query(`INSERT INTO messages (text) VALUES ('${message.text}')`, (err, result) => {
        if (err) {
          return err;
        } 
        promiseArray.push(db.query('SELECT MAX(id) FROM messages', [], (err, result) => {
          if (err) {
            return err;
          }
          let postId = result[0]['MAX(id)'];
          callback(postId);
          return postId;
        }));
      }));
      Promise.all(promiseArray).then(values => {
        console.log(values);
        db.query(`SELECT username.id FROM usernames 
          INNER JOIN messages ON messages.id = MAX(id) 
          AND usernames.username = ${message.username}`, [], (err, result) => {
            if (err) {
              return err;
            }
            db.query(`INSERT INTO messages (username) VALUES ${result.id}`, (err, result) => {
              if (err) {
                return err;
              }
            });
          });
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};


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

//       const textInsert = db.query(`INSERT INTO messages text VALUES '${message.text}`);
//       const userQuery = db.query(`SELECT username FROM usernames WHERE username = '${message.username}`, []);

//       textInsert.on('error', err => err);
//       userQuery.on('error', err => err);
//       userQuery.on('result', result => {
//         if (!result.length) {
//           const userInsert = db.query(`INSERT INTO usernames (username) VALUES '${message.username}'`);
//           userInsert.on('error', err => err);
//           userInsert.on('result', result => {
//             const maxId = db.query(`SELECT MAX(id) FROM messages`, []);
//             maxId.on('error', err => err);
//             maxId.on('result', result => {
//               const userId = db.query(`SELECT username.id FROM usernames 
//                 INNER JOIN messages ON messages.id = ${values[0]} 
//                 AND usernames.username = ${message.username}`, []);
//               userId('error', err => err);
//               userId('result', result => {

//               })
//             })
//           })
//         }
//       });

// const userId = db.query(`SELECT username.id FROM usernames 
//               INNER JOIN messages ON messages.id = ${values[0]} 
//               AND usernames.username = ${message.username}`, []);

    //   let promiseArray = [];
    //   const queryCallback = (err, results) => {
    //     if (err) {
    //       return err;
    //     }
    //     return results;
    //   };
    //   promiseArray.push(db.query(`SELECT username FROM usernames WHERE username = '${message.username}'`, [], queryCallback));
    //   promiseArray.push(db.query(`INSERT INTO messages (text) VALUES ('${message.text}')`, (err, result) => {
    //     if (err) {
    //       return err;
    //     }
    //   }));
    //   promiseArray.push(queryCallback);

    //   Promise.all(promiseArray).then(values => {
    //     let secondPromiseArray = [];
    //     console.log(values);

    //     secondPromiseArray.push(db.query('SELECT MAX(id) FROM messages', [], (err, result) => {
    //       if (err) {
    //         return err;
    //       }
    //       let postId = result[0]['MAX(id)'];
    //       callback(postId);
    //       return postId;
    //     }));

    //     if (!values[0].length) {
    //       secondPromiseArray.push(db.query(`INSERT INTO usernames (username) VALUES ('${message.username}')`, (err, result) => {
    //         if (err) {
    //           return err;
    //         }
    //         console.log('SUCCESS');
    //       }));
    //     }

    //     Promise.all(secondPromiseArray).then(values => {
    //       db.query(`SELECT username.id FROM usernames 
    //       INNER JOIN messages ON messages.id = ${values[0]} 
    //       AND usernames.username = ${message.username}`, [], (err, result) => {
    //         if (err) {
    //           return err;
    //         }
    //         db.query(`INSERT INTO messages (username) VALUES ${result.id}`, (err, result) => {
    //           if (err) {
    //             return err;
    //           }
    //         });
    //       });
    //     });
    //   });
    // } // a function which can be used to insert a message into the database
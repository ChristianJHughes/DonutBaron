"use strict"

var db = require('../db');

// A controller for the equipment resource
// This should have methods for all the RESTful actions
class Rankings {

  getRankingsData(req, res) {
    res.render('rankings', {donutBaron: { real_name: "car"}, user: {username: "Big Car"}});
    db.all('SELECT * FROM users', function(err, users) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
        res.render('rankings', { users: users, user: req.user } );
      });
    });
  }
};
}

module.exports = exports = new Rankings();

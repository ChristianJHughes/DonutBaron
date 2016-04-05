"use strict"

var db = require('../db');

// A controller for the equipment resource
// This should have methods for all the RESTful actions
class Rankings {

  getRankingsData(req, res) {
    db.all('SELECT * FROM users', function(err, users) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      users.sort(function(a, b){
        return (b.donut_quality_rating * b.donut_reliability_rating) - (a.donut_quality_rating * a.donut_reliability_rating);
      });
        res.render('rankings', { users: users, user: req.user });
      });
  }
};

module.exports = exports = new Rankings();

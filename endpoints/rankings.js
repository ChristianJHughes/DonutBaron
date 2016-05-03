"use strict"

var db = require('../db');

// The Rankings endpoint contains all of the functions pertinent to the "Rankings" webpage.
class Rankings {

  // Gets all user on the donut lists, calculates their donut scores, and renders the "Rankings" page.
  getRankingsData(req, res) {
    db.all('SELECT * FROM users', function(err, users) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      users.sort(function(a, b) {
        return (b.donut_quality_rating * b.donut_reliability_rating) - (a.donut_quality_rating * a.donut_reliability_rating);
      });
      res.render('rankings', {
        users: users,
        user: req.user
      });
    });
  }
};

module.exports = exports = new Rankings();

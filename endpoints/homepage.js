"use strict"

var db = require('../db');
var formidable = require('formidable');

// A controller for the equipment resource
// This should have methods for all the RESTful actions
class Homepage {

  getHomepageData(req, res) {
    db.get('SELECT * FROM users WHERE is_donut_baron=?', 1, function(err, donutBaron) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      db.all('SELECT * FROM upcomingList', function(err, upcomingUsers) {
        if (err) {
          console.error(err);
          return res.sendStatus(500);
        };
        res.render('index', { donutBaron: donutBaron, upcomingUsers: upcomingUsers, user: req.user } );
      });
    });
  }

  RateDonuts(req, res) {
    var form = new formidable.IncomingForm();
    var reliability = 0;
    form.parse(req, (err, fields, files) => {
      if(err) return res.sendStatus(500);
      if(fields.radio == "Yes") {
          reliability = 100;
      }
      db.run("UPDATE users SET has_rated_this_week=1 WHERE userID=?",
            req.user.userID);
      db.get("SELECT * FROM users WHERE is_donut_baron=?", 
            1, 
        function(err, donutBaron) {
          if (err) {
            console.error(err);
            return res.sendStatus(500);
          }
          db.run("UPDATE users SET donut_quality_rating=?, donut_reliability_rating=?, number_of_ratings=?, WHERE userID=?"),
            (donutBaron.donut_quality_rating + fields.score)/(donutBaron.number_of_ratings + 1),
            (donutBaron.donut_reliability_rating + reliability)/(donutBaron.number_of_ratings + 1),
            donutBaron.number_of_ratings + 1,
            donutBaron.userID
        });
    });
    res.render('index')
  }
};

module.exports = exports = new Homepage();

"use strict"

var db = require('../db');

// The Homepage endpoint contains all of the functions pertinent to the Donut Baron Homepage.
class Homepage {
  //Gets and renders the data needed for the homepage
  // Gets the current donut dollie (ignore variable name), and a list of all upcoming donut dollies. Then renders the homepage.
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
        res.render('index', {
          donutBaron: donutBaron,
          upcomingUsers: upcomingUsers,
          user: req.user
        });
      });
    });
  }
  
  //Updates the database when a user rates the current donut baron.
  RateDonuts(req, res) {
    var reliability = 0;
    if (typeof req.body.delivered == "undefined") {
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
        db.run("UPDATE users SET donut_quality_rating=?, donut_reliability_rating=?, number_of_ratings=? WHERE userID=?",
          //The current rating is multiplied by the number of ratings, then the new rating is added, then everything is divided by the previous number of ratings + 1. 
          Math.round(((donutBaron.donut_quality_rating * donutBaron.number_of_ratings) + parseInt(req.body.score))/(donutBaron.number_of_ratings + 1) * 10) / 10,
          //Same as quality, but for reliability.
          Math.floor((donutBaron.donut_reliability_rating * donutBaron.number_of_ratings) + reliability)/(donutBaron.number_of_ratings + 1),
          donutBaron.number_of_ratings + 1,
          donutBaron.userID);
        db.all('SELECT * FROM upcomingList', function(err, upcomingUsers) {
          if (err) {
            console.error(err);
            return res.sendStatus(500);
          };
          res.redirect("/#rate");
        });
      });
  }

  // Gets all of the comments from the database as an array.
  getComments(req, res) {
    db.all('SELECT * FROM comments', function(err, commentsArray) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      res.send(commentsArray);
    });
  }

  // Takes care of adding a new comment to the database.
  addComment(req, res) {
        db.run('INSERT INTO comments (content, fullname, created) values (?,?,?)',
      req.body.comment.content,
      req.body.currentUser,
            req.body.comment.created
    );
    req.body.comment.created_by_current_user = (req.body.comment.created_by_current_user == 'true' ? true : false);
    res.send(req.body.comment);
  }

}

module.exports = exports = new Homepage();

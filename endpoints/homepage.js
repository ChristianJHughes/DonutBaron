"use strict"

var db = require('../db');

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
    var reliability = 0;
    if(typeof req.body.delivered == "undefined") {
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
          Math.floor((donutBaron.donut_quality_rating + parseInt(req.body.score))/(2) * 100 / 100),
          Math.floor((donutBaron.donut_reliability_rating + reliability)/(2) * 100 / 100),
          donutBaron.number_of_ratings + 1,
          donutBaron.userID);
        db.all('SELECT * FROM upcomingList', function(err, upcomingUsers) {
          if (err) {
            console.error(err);
            return res.sendStatus(500);
          };
          res.redirect("/");
        });
      });
  }
  
    getComments(req, res) {
        db.all('SELECT * FROM comments', function(err, commentsArray) {
            if(err) {
                console.error(err);
                return res.sendStatus(500);
            }
            res.send(commentsArray);
        });
    }
  
    addComment(req, res) {
        db.run('INSERT INTO comments (content, fullname, created, upvote_count, user_has_upvoted) values (?,?,?,?,?)',
            req.body.comment.content,
            req.body.currentUser,
            req.body.comment.created.substring(0,10),
            parseInt(req.body.comment.upvote_count),
            req.body.comment.user_has_upvoted == 'true' ? 1 : 0
        );
        res.send(req.body.comment); 
    }
  
}

module.exports = exports = new Homepage();

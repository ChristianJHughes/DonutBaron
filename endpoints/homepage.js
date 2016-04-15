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
            req.body.comment.created,
            parseInt(req.body.comment.upvote_count),
            req.body.comment.user_has_upvoted == 'true' ? 1 : 0
        );
        //Need to convert string values back to their original types.
        req.body.comment.user_has_upvoted = (req.body.comment.user_has_upvoted == 'true' ? true : false);
        req.body.comment.upvote_count = parseInt(req.body.comment.upvote_count);
        req.body.comment.created_by_current_user = (req.body.comment.created_by_current_user == 'true' ? true : false);
        res.send(req.body.comment); 
    }
  
}

module.exports = exports = new Homepage();

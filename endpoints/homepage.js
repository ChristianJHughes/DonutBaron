"use strict"

var db = require('../db');

// A controller for the equipment resource
// This should have methods for all the RESTful actions
class Donut_Data {

  // index(req, res) {
  //   var pages = db.all('SELECT * FROM pages', function(err, pages) {
  //     if (err) {
  //       console.error(err);
  //       return res.sendStatus(500);
  //     }
  //     res.render('cs_wiki/index', {
  //       pages: pages,
  //       user: req.user
  //     });
  //   });
  // }

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
        res.render('index', { donutBaron: donutBaron, upcomingUsers: upcomingUsers } );
      });
    });
  }

  // showTalkPage(req, res) {
  //   db.serialize(function() {
  //     db.all('SELECT * FROM comments WHERE associated_page=?', req.params.id, function(err, comments) {
  //       if (err) {
  //         console.error(err);
  //         return res.sendStatus(500);
  //       }
  //       db.get('SELECT * FROM pages WHERE pageID=?', req.params.id, function(err, page) {
  //         if (err) {
  //           console.error(err);
  //           return res.sendStatus(500);
  //         }
  //         comments.forEach(function(comment) {
  //           comment.comment = marked(comment.comment);
  //         })
  //         res.render('cs_wiki/talk_page', {
  //           comments: comments,
  //           page: page,
  //           user: req.user
  //         });
  //       });
  //     });
  //   });
  // }
  //
  // showUserPage(req, res) {
  //   var users = db.all('SELECT * FROM users', function(err, users) {
  //     if (err) {
  //       console.error(err);
  //       return res.sendStatus(500);
  //     }
  //     res.render('cs_wiki/users', {
  //       users: users
  //     });
  //   });
  // }
  //
  // unbanUser(req, res) {
  //   db.run('UPDATE users SET isBanned = ? WHERE userID=?', 0, req.params.id, function(err, user) {
  //     if (err) {
  //       console.error(err);
  //       return res.sendStatus(500);
  //     }
  //   });
  //   res.redirect('/users');
  // }
  //
  // banUser(req, res) {
  //   db.run('UPDATE users SET isBanned = ? WHERE userID=?', 1, req.params.id, function(err, user) {
  //     if (err) {
  //       console.error(err);
  //       return res.sendStatus(500);
  //     }
  //   });
  //   res.redirect('/users');
  // }
  //
  // showEditPage(req, res) {
  //   db.get('SELECT * FROM pages WHERE pageID=?', req.params.id, function(err, page) {
  //     if (err) {
  //       console.error(err);
  //       return res.sendStatus(500);
  //     }
  //     res.render('cs_wiki/editor', {
  //       page: page
  //     });
  //   });
  // }
  //
  // applyEdits(req, res) {
  //   var form = new formidable.IncomingForm();
  //   form.parse(req, (err, fields, files) => {
  //     if (err) return res.sendStatus(500);
  //     db.run("UPDATE pages SET main_content_markdown = ? WHERE pageID=?", fields.content, req.params.id, (err, page) => {
  //       if (err) {
  //         console.error(err);
  //         return res.sendStatus(500);
  //       }
  //       res.redirect('/wiki/' + req.params.id);
  //     });
  //   });
  // }
  //
  // addComment(req, res) {
  //   var form = new formidable.IncomingForm();
  //   form.parse(req, (err, fields, files) => {
  //     if (err) return res.sendStatus(500);
  //     db.run("INSERT INTO comments (comment, associated_page) values (?,?)", fields.content, req.params.id, (err, page) => {
  //       if (err) {
  //         console.error(err);
  //         return res.sendStatus(500);
  //       }
  //       res.redirect('/wiki/talk_page/' + req.params.id);
  //     });
  //   });
  // }
};

module.exports = exports = new Donut_Data();

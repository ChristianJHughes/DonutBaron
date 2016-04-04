"use strict"

var db = require('../db'),
    formidable = require('formidable');

// An endpoint for logging in and out users
class Session {

  // Renders a login form with no error message
  new(req, res) {
    res.render('login', {message: ""});
  }

  // Creates a new session, provided the username and password match one in the database,
  // If not, renders the login form with an error message.
  create(req, res, next) {
    req.session.reset();
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if(err) return res.sendStatus(500);
      db.get("SELECT * FROM users WHERE username_text = ?", fields.Username, (err, user) => {
        if(err) return res.render('login', {message: "Username/Password not found.  Please try again."});
        if(!user) return res.render('login', {message: "Username/Password not found.  Please try again."});
        if(user.password != fields.Password) return res.render('login', {message: "Username/Password not found.  Please try again."});
        req.session.user_id = user.userID;
        req.user = user;
        return res.redirect('/');
      });
    });
  }

  // Ends a user session by flushing the session cookie. Renders the login page, and passes through an empty message.
  destroy(req, res) {
    req.session.reset();
    res.redirect('login');
  }

}

module.exports = exports = new Session();

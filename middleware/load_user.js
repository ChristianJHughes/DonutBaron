"use strict"

var db = require('../db.js')

// This middleware loads the user (if logged in) and assigns
// their information to the req.user property.
// If not signed in, redirect to the login page.
function loadUser(req, res, next) {
  if (req.session && req.session.user_id) {
    db.get("SELECT * FROM users WHERE userID = ?", req.session.user_id, (err, user) => {
      if (err) return res.sendStatus(500);
      req.user = user;
      return next();
    });
  } else {
    res.redirect('/login');
  }
}

module.exports = exports = loadUser;

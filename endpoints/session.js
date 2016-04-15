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
  create(req, res) {
    req.session.reset();
    //var form = new formidable.IncomingForm();
    //form.parse(req, (err, fields, files) => {
      //if(err) return res.sendStatus(500);
      db.get("SELECT * FROM users WHERE username_text = ?", req.body.Username, (err, user) => {
        if(err) return res.render('login', {message: "Username/Password not found.  Please try again."});
        if(!user) return res.render('login', {message: "Username/Password not found.  Please try again."});
        if(user.password != req.body.Password) return res.render('login', {message: "Username/Password not found.  Please try again."});
        req.session.user_id = user.userID;
        req.user = user;
        return res.redirect('/');
      });
    //});
  }

  viewRegister(req, res) {
    res.render('register', {message: ""});
  }

  // Handle registering a new user.
  register(req, res) {
    //var form = new formidable.IncomingForm();
    //form.parse(req, (err, fields, files) => {
      if(err) return res.sendStatus(500);
      db.run("INSERT INTO users (username_text, real_name, organization, email_address, phone_number, password, donut_quality_rating, donut_reliability_rating, has_rated_this_week, is_donut_baron, is_admin) values (?,?,?,?,?,?,?,?,?,?,?)",
            req.body.Username,
            req.body.first_name + " " + req.body.last_name,
            req.body.organization_name,
            req.body.email,
            req.body.phone,
            req.body.Password,
            0,
            0,
            0,
            0,
            0,
            (err, user) => {
        // Send an error if the user can't be registered.
        if(err) return res.render('register', {message: "Error attempting to register. Please try again."});
        // Create a session for the newly registered user.
        db.get("SELECT * FROM users WHERE username_text = ?", req.body.Username, (err, user) => {
          req.session.user_id = user.userID;
          req.user = user;
          db.get("SELECT * FROM upcomingList WHERE userID = ?", -1, function(err, nextUserSlot)
          {
            if (err) return res.sendStatus(500);
            // Add them to the next avaialable space in the database upcomingList.
            db.run("UPDATE upcomingList SET userID= ?, real_name = ? WHERE listID = ?", user.userID, user.real_name, nextUserSlot.listID, function (err)
            {
              if(err)
              {
                console.log("If there are already 30 on the donut list, adding another becomes impossible.");
                return res.sendStatus(500);
              }
            });
          });
          return res.redirect('/');
        });
      });
    //});
  }

  // Ends a user session by flushing the session cookie. Renders the login page, and passes through an empty message.
  destroy(req, res) {
    req.session.reset();
    return res.redirect('login');
  }

}

module.exports = exports = new Session();

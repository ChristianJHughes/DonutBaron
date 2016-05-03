// The MAIN entry point for the application. Launch by calling "node app.js" from the command line.


var express = require('express'),
    app = express(),
    loadUser = require('./middleware/load_user.js'),
    sessions = require('client-sessions'),
    bodyParser = require('body-parser'),
    CronJob = require('cron').CronJob,
    db = require('./db');

// Enable template engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

// Enable sessions
app.use(sessions({
    cookieName: 'session',
    secret: 'donutbarondonutbarondonutbaron',
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 1000 * 60 * 5
}));

// Add middleware body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Add routes to the homepage. It will only reach the homepage if the user has been logged in (and has an active session).
var homepage = require('./endpoints/homepage.js');
app.get('/index', loadUser, homepage.getHomepageData);
app.get('/', loadUser, homepage.getHomepageData);
app.post('/index/rate', loadUser, homepage.RateDonuts);
app.get('/comments', homepage.getComments);
app.post('/comments/add', homepage.addComment);

// Add routes for the login page. Should create an active session if sucsessful.
var login = require('./endpoints/session.js');
app.get('/login', login.new);
app.post('/login', login.create);
app.get('/logout', login.destroy);
app.post('/register', login.register);
app.get('/register', login.viewRegister);

// Add a route to the rankings page.
var rankings = require('./endpoints/rankings.js');
app.get('/rankings', loadUser, rankings.getRankingsData);

// Launch the application on port 8080.
app.listen(8080, () => {
    console.log('Listening on port 8080...');
});

// Updates the database every day at midnight.
new CronJob('00 00 12 * * 0-6', function() {

    db.get("SELECT * FROM upcomingList", function(err, row)
    {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }

      // Create a new date, and set it to the current date.
      var date = new Date();
      date.setDate(date.getDate());

      // compare the current date with the next date in the table. If they match, then it's time to switch up the donut baron.
      if (row.date == date.toISOString().slice(0, 10))
      {
        console.log("I updated the donut list!");
        var oldDonutBaron;
        // Make sure the database calls run in order.
        db.serialize(function(){

        // Save the last weeks donut baron so that they can be added to the end of the list.
        db.get("SELECT * FROM users WHERE is_donut_baron=?", 1, function(err, previousDonutBaron)
        {
          if (err) {
            console.error(err);
            return res.sendStatus(500);
          };
          oldDonutBaron = previousDonutBaron;
        });

        // Assign the new donut baron proper donut baron status.
        db.run("UPDATE users SET is_donut_baron=? WHERE userID=?", 1, row.userID, function(err)
        {
          if (err) {
            console.error(err);
            return res.sendStatus(500);
          };
        });

        // Delete the furst row from the upcomingList, as they are now the donut baron.
        db.run("DELETE FROM upcomingList WHERE listID=?", row.listID);
        // At the next open slot...
        db.get("SELECT * FROM upcomingList WHERE userID=?", -1, function(err, openSlot)
        {
          if (err) {
            console.error(err);
            return res.sendStatus(500);
          }
          // ... Insert the old donut baron.
          db.run("UPDATE upcomingList SET userID = ?, real_name = ? WHERE listID = ?", oldDonutBaron.userID, oldDonutBaron.real_name, openSlot.listID);
          // Then revoke that donut baron's status.
          db.run("UPDATE users SET is_donut_baron=? WHERE userID=?", 0, oldDonutBaron.userID);
        });
      });
      };
      db.run("DELETE FROM comments");
    });
}, null, true);

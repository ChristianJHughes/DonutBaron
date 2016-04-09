var express = require('express'),
    app = express(),
    loadUser = require('./middleware/load_user.js'),
    sessions = require('client-sessions');

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

// Add routes to the homepage. It will only reach the homepage if the user has been logged in (and has an active session).
var homepage = require('./endpoints/homepage.js');
app.get('/index', loadUser, homepage.getHomepageData);
app.get('/', loadUser, homepage.getHomepageData);
app.get('/comments', homepage.getComments);

// Add routes for the login page. Should create an active session if sucsessful.
var login = require('./endpoints/session.js');
app.get('/login', login.new);
app.post('/login', login.create);
app.get('/logout', login.destroy);
app.post('/register', login.register);
app.get('/register', login.viewRegister);

// Add a route to the rankings page.
var rankings = require('./endpoints/rankings.js')
app.get('/rankings', loadUser, rankings.getRankingsData)

app.listen(8080, () => {
    console.log('Listening on port 8080...');
});

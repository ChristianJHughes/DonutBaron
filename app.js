var express = require('express'),
    app = express();

// Enable template engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));


// Wiki Get Routes routes
var homepage = require('./endpoints/homepage.js');
app.get('/index', homepage.getHomepageData);
app.get('/', homepage.getHomepageData);

//Delete this later, just here for testing currently
app.get('/login', function(req, res) {
    res.render('login');
});

//Delete this later, just here for testing currently
app.get('/register', function(req, res) {
    res.render('register');
});

app.listen(8080, () => {
    console.log('Listening on port 8080...');
});

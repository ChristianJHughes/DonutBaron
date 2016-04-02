var express = require('express'),
    app = express();

// Enable template engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index');
});

// Wiki Get Routes routes
var homepage = require('./endpoints/homepage.js');
app.get('/index', homepage.getDonutBaron);
app.get('/', homepage.getDonutBaron);

//Delete this later, just here for testing currently
app.get('/login', function(req, res) {
    res.render('login');
});

app.listen(8080, () => {
    console.log('Listening on port 8080...');
});

var express = require('express'),
    app = express();

// Enable template engine
app.set('view engine', 'ejs');
    
// Serve static files
app.use(express.static('public'));    
    
app.get('/', function(req, res) {
    res.render('index')
});
    
app.listen(80, () => {
  console.log("Listening on port 80...");
});
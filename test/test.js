var app = require(__dirname + '/../app.js'),
port = 8080,
server,
http = require('http'),
assert = require('chai').assert;

// Launch the web app before testing
before(function(done) {
    server = app.listen(port, function(err, result){
        if(err) done(err);
        else done();
    });
});

// Close the web app when testing is finished
after(function(done) {
    server.close();
    done();
});

// Top­level application tests
describe('app tests', function() {
    it('App should exist', function() {
        assert.ok(app);
    });

    it('Should be listening at localhost:' + port, function(done) {
        http.get('http://localhost:' + port, function(res) {
            assert.equal(res.statusCode, 404);
            done();
        });
    });
});



describe('Array', function() {
    it('should return -1 when the value is not present', function () {
        assert.equal(-1, [1,2,3].indexOf(5));
        assert.equal(-1, [1,2,3].indexOf(0));
    });
    it('is one equal to 5?', function() {
        assert.equal(1,5);
    });
    
});
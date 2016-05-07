var http = require('http'),
assert = require('chai').assert,
app = require('../app.js');



// Launch the web app before testing
before(function(done) {
    //require('../app.js');
    //done();
    server = app.listen(function(err, result) {
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
    
    //Test to make sure that app object is not null.
    it('App should exist', function() {
        assert.ok(app);
    });
    
    //Tests to make sure that the server starts up.
    it('Should be listening at localhost:8080', function(done) {
        http.get('http://localhost:8080', function(res) {
            assert.equal(res.statusCode, 302);
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
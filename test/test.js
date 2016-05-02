var assert = require('chai').assert;

describe('Array', function() {
    it('should return -1 when the value is not present', function () {
        assert.equal(-1, [1,2,3].indexOf(5));
        assert.equal(-1, [1,2,3].indexOf(0));
    });
    it('is one equal to 5?', function() {
        assert.equal(1,5);
    })
});
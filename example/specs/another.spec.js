var sinon = require('sinon');
var expect = require('chai').expect;
var mock = require('../../index.js')(__dirname);

describe("another.js", function(){
  var subject
    beforeEach(function(){
      subject = mock.subject('../src/another.js');
    });

    describe("do", function(){
        var actual;
        beforeEach(function(){
            actual = subject.do();
        });

        it("should return the expected value", function(){
            expect(actual).to.be.equal("something")
        });
    });
});

var sinon = require('sinon');
var expect = require('chai').expect;
var mockInjector = require('../../index.js')(__dirname);


describe('src', function() {
    var subject,
        anotherMock;
    beforeEach(function() {
        anotherMock = {
            do: sinon.stub()
        };
        httpMock = {
          request: sinon.stub()
        }
        mockInjector.inject('../src/another', anotherMock);
        mockInjector.inject('http', httpMock);
        subject = require('../src/src.js');
    });

    describe('something', function() {
        var actual
        beforeEach(function() {
            anotherMock.do.returns('something-else');
            actual = subject.something();
        });

        it('should test that do was called ', function() {
            expect(anotherMock.do.called).to.be.ok;
            expect(actual).to.be.equal('something-else');
        });

        it('should call request that do was called ', function() {
            console.log(require.cache);
            expect(httpMock.request.called).to.be.ok;
        });

    });
});

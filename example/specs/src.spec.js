var sinon = require('sinon');
var expect = require('chai').expect;
var { mock, clear } = require('../../index.js')(__dirname);


describe('src', function() {
    var subject,
        anotherMock;
    beforeEach(function() {
        //This spec is only mocking what we own. So async is running forrealski
        anotherMock = mock('../src/another');
        subject = clear('../src/src.js');
    });

    describe('something', function() {
        var actual
        context("when no error", function() {
            beforeEach(function() {
                anotherMock.do
                    .withArgs(sinon.match.func)
                    .onFirstCall()
                    .callsArgWith(0, null, {
                        some: "result"
                    });

                subject.something();
            });

            it("should invoke the method on anotherMock", function() {
                expect(anotherMock.do.called).to.be.ok;
            });
        });

        context("when error", function() {
            it("should throw an error", function() {
                expect(function() {
                    anotherMock.do
                        .onFirstCall()
                        .callsArgWith(0, 'some-error', null);

                    subject.something();
                }).throws('some-error')
            });
        });
    });
});

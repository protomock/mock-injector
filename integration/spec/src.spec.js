var sinon = require('sinon');
var expect = require('chai').expect;
var mockInjector = require('../../index.js')(__dirname);
var async = require('async');
var express = require('express');


describe('src', function() {
    var subject,
        anotherMock,
        expressStub;
    before(function() {
        anotherMock = {
            do: sinon.stub()
        };
        mockInjector.inject('../src/another', anotherMock);

        httpMock = {
            request: sinon.stub()
        };
        mockInjector.inject('http', httpMock);

        sinon.stub(async, 'parallel');
        mockInjector.inject('async', async);

        expressStub = sinon.stub(express.application, 'init');
        mockInjector.inject('express', expressStub)

        subject = mockInjector.subject('../src/src.js');

    });

    describe('something', function() {
        var actual
        beforeEach(function() {
            anotherMock.do.returns('something-else');
            actual = subject.something();
        });

        it('should create an express app', function() {
            expect(expressStub.called).to.be.ok;
        });

        it('should call async parallel', function() {
            expect(async.parallel.called).to.be.ok;
        });

        describe("parallel callback #1", function() {
            var callBackStub
            beforeEach(function() {
                callBackStub = sinon.stub();
                async.parallel.getCall(0).args[0][0](callBackStub);
            });

            it("should call http request", function() {
                expect(httpMock.request.called).to.be.ok;
            });

            it("should call the callback method", function() {
                expect(callBackStub.called).to.be.ok;
            });
        });
        describe("parallel callback #2", function() {
            var callBackStub
            beforeEach(function() {
                callBackStub = sinon.stub();
                async.parallel.getCall(0).args[0][1](callBackStub);
            });

            it("should call do", function() {
                expect(anotherMock.do.called).to.be.ok;
            });

            it("should call the callback method", function() {
                expect(callBackStub.called).to.be.ok;
                expect(callBackStub.getCall(0).args[0]).to.be.equal('something-else');
            });
        });
        describe("parallel finished callback", function() {
            context("when finished callback gets an error", function() {
                var error;
                beforeEach(function() {
                    error = catchError(function() {
                        async.parallel.getCall(0).args[1]('error');
                    });
                });

                it("should throw error", function() {
                    expect(error).to.be.equal('error');
                });
            });
        });
    });
});


function catchError(callback) {
    try {
        callback()
    } catch (e) {
        return e;
    }
}

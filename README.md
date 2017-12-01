# Mock Injector

Used for when writing tests to inject mock modules for the implementation.

# Setup

Simply run `npm install mock-injector --save-dev`


# Example Spec

```javascript
var sinon = require('sinon');
var expect = require('chai').expect;
var mockInjector = require('mock-injector')(__dirname);
var async = require('async');

describe('src', function() {
    var subject,
        anotherMock;
    before(function() {
        anotherMock = {
            do: sinon.stub()
        };
        mockInjector.inject('../src/another',anotherMock);
        httpMock = {
            request: sinon.stub()
        };
        mockInjector.inject('http', httpMock);

        sinon.stub(async, 'parallel');
        mockInjector.inject('async', async);

        subject = mockInjector.subject('../src/src.js');
    });
    describe('something', function() {
        var actual
        beforeEach(function() {
            anotherMock.do.returns('something-else');
            actual = subject.something();
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
```

Check the integration to see the implementation and test together.


# API

`mockInjector.subject(filepath)` - tells mock-injector what file is the test subject and returns it.

`mockInjector.inject(key, value)` - injects the mock of the dependency for the subject.

`mockInjector.get(key)` - returns the current value for that dependency.

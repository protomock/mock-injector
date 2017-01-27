# Mock Injector

Used for when writing tests to inject mock modules for the implementation.

# Setup

Simply run `npm install mock-injector`


# Example Test

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

        subject = require('../src/src.js');
    });
  });
```

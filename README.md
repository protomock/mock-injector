# Mock Injector

[![npm](https://img.shields.io/npm/dt/mock-injector.svg)](https://www.npmjs.com/package/mock-injector)

Allows you to mock a dependency and inject it into the implementation

## Setup

Simply run `npm install mock-injector --save-dev`


## Example Spec

```javascript

//some-module.js
module.exports = {
  do: function (one) { return this}
}

```

```javascript
//some-module.spec.js
var mockInjector = require('mock-injector')(__dirname);
//mocking your modules or files
var moduleMock = mock('../src/some-module');

//mocking dependencies
var asyncMock = mock('async');
async.waterfall.yields(null, 'some-results')

mock.subject('../src/some-subject');

//Uses sinon stubs for mocking exports. Whichs means you can use sinon stub api
expect(moduleMock.do.calledWithExactly('some-one')).to.be.ok;
expect(asyncMock.waterfall.to.be.called).to.be.ok;

```


## API

`mock.subject(filepath)` - tells mock-injector what file is the test subject and returns it.

`mock(filepath || moduleName)` - creates AND injects the mock of the dependency for the subject. Returns the mocked object.

`mock.inject(filepath, object)` - injects the mock of the dependency for the subject.

Check the example folder to see the implementation and test together.

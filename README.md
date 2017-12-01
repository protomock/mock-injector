# Mock Injector

Allows you to mock a dependency and inject it into the implementation

## Setup

Simply run `npm install mock-injector --save-dev`


## Example Spec

```javascript

//some-module.js
module.exports = {
  do: function (one) { return this}
}

//some-module.spec.js
var mock = require('mock-injector')(__dirname);
var moduleMock = mock('../src/some-module');

mock.subject('../src/some-subject');

//Uses sinon stubs for mocking exports. Whichs means you can use sinon stub api
expect(moduleMock.do.calledWithExactly('some-one')).to.be.ok;

```


## API

`mock.subject(filepath)` - tells mock-injector what file is the test subject and returns it.

`mock(filepath)` - injects the mock of the dependency for the subject.

Check the example folder to see the implementation and test together.

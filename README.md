# Mock Injector

[![npm](https://img.shields.io/npm/dt/mock-injector.svg)](https://www.npmjs.com/package/mock-injector)

Allows you to mock a dependency and inject it into the implementation

## Install

`npm install mock-injector --save-dev`

## How to import
```javascript
                                                // sets the resolution directory
const { mock, clear } = require('mock-injector')(__dirname)
```

## Example Spec

```javascript

// some-module.js
module.exports = {
  do: function (one) { return one }
}

```

```javascript
// some-module.spec.js
const { mock, clear } = require('mock-injector')(__dirname);

// mocking your modules or files
// this stubs all methods in that file
const moduleMock = mock('../src/some-module');

// mocking dependencies
// this stubs out the dependencies functions
const asyncMock = mock('async');
async.waterfall.yields(null, 'some-results')

const subject = clear('../src/some-subject');

// Uses sinon stubs for mocking exports. Whichs means you can use sinon stub api
expect(moduleMock.do.calledWithExactly('some-one')).to.be.ok;
expect(asyncMock.waterfall.to.be.called).to.be.ok;

```



## API

`clear(filepath || moduleName)` - Clears out any existing injected objects for a module. Returns the module.

`mock(filepath || moduleName)` - Creates AND injects the mock of the dependency. Returns the mocked object.

`inject(filepath || moduleName, object)` - Injects the mock of the dependency for the subject.


## Example
Check the example folder to see the implementation and test together.

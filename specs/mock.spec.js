var expect = require('chai').expect;
var mock = require("../src/mock");

describe("mock", function() {
  let subject;
  beforeEach(function() {
    subject = mock('../example/test-module', __dirname);
  });

  it("should stub the exports", function() {
      expect(subject.example.isSinonProxy).to.be.ok
  });
});

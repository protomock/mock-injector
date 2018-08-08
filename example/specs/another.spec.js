var sinon = require('sinon');
var expect = require('chai').expect;
var { clear, inject } = require('../../index.js')(__dirname);

describe("another.js", function() {
    var subject,
        someModuleWithMethodDefinitionMock;
    beforeEach(function() {
        someModuleWithMethodDefinitionMock = {
            doSomethingAwesome: sinon.stub()
        };
        inject('../src/some-module-with-method-definition', someModuleWithMethodDefinitionMock);
        subject = clear('../src/another.js');
    });

    describe("do", function() {
        var actual;
        beforeEach(function() {
            someModuleWithMethodDefinitionMock.doSomethingAwesome.returns('something');
            actual = subject.do();
        });

        it("should have called doSomethingAwesome", function() {
            expect(someModuleWithMethodDefinitionMock.doSomethingAwesome.calledWithExactly()).to.be.ok;
        });

        it("should return the expected value", function() {
            expect(actual).to.be.equal("something");
        });
    });
});

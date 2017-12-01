var someModuleWithMethodDefinition = require('./some-module-with-method-definition');
module.exports = {
  do: function() {
    var something = someModuleWithMethodDefinition.doSomethingAwesome();
    console.log(something);
    return something;
  }
}

require('mocha');

(function (global, mocha, chai, mochaPhantomJs) {
  "use strict";

  mocha.setup({
    'ui': 'bdd',
    'reporter': 'html'
  });
  global.expect = chai.expect;

  $(function () {
    var nodeCoverageSubmit = function () {
      var nodeCoverage = global.$$_l;
      return nodeCoverage && nodeCoverage.submit();
    },
    mochaPhantomJsRunWithCoverage = function (nodeCoverageSubmit) {
      mochaPhantomJs.globals(['angular', '$', 'require', 'sinon']);
      mochaPhantomJs.run().on('end', nodeCoverageSubmit);
    };

    return mochaPhantomJs ?
      mochaPhantomJsRunWithCoverage(nodeCoverageSubmit) :
      mocha.run(nodeCoverageSubmit);
  });
})(this, this.mocha, this.chai, this.mochaPhantomJS);

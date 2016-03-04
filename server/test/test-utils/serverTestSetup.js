var serverTestSetup = function () {
  var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon');

  chai.use(chaiAsPromised);

  global.chai = chai;
  global.expect = chai.expect;
  global.sinon = sinon;
};

module.exports = serverTestSetup;

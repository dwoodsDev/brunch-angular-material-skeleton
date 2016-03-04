var serverTestSetup = require('./test-utils/serverTestSetup');
serverTestSetup();

var Server = require('../Server'),
  proxyquire = require('proxyquire'),
  httpMock;

describe('Server', function () {
  beforeEach(function () {
    httpMock = proxyquire('http', {
      'path': {
        createServer: sinon.stub()
      }
    });
  });

  it('should setup an http server on #portNumber', function () {
    var portNumber = 3333,
      callback = sinon.stub();

    httpMock.createServer.listen = sinon.stub();

    new Server(portNumber, null, callback);

    // TODO: Finish testing Server
    sinon.assert.calledOnce(httpMock.createServer);
  });
});

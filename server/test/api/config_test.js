var Q = require('q'),
  LRUConfigUtils = require('../../util/LRUConfigUtils'),
  Config = require('../../api/config');

describe('/api/config/command/save', function () {
  describe('put()', function () {
    var saveConfigToLRUStub,
      deferred;

    beforeEach(function () {
      deferred = Q.defer();
      saveConfigToLRUStub = sinon.stub(LRUConfigUtils, 'saveConfigToLRU');
    });

    afterEach(function () {
      LRUConfigUtils.saveConfigToLRU.restore();
    });

    it('should #saveConfigToLRU()', function () {
      var res = {
        send: sinon.stub()
      };

      saveConfigToLRUStub.returns(deferred.promise);
      Config.save.put(null, res);

      sinon.assert.calledOnce(saveConfigToLRUStub);
    });

    it('should send() `success` response when saveConfigToLRU succeeds', function () {
      var res = {
        send: sinon.stub()
      },
        deferAssertion = Q.defer(),
        testSetup = function () {
          saveConfigToLRUStub.returns(deferred.promise);
          Config.save.put(null, res);
          deferred.resolve();

          return deferAssertion.promise;
        };

      testSetup().then(function () {
        sinon.assert.calledWithExactly(res.send, 'success');
      });
      deferAssertion.resolve();
    });

    it('should send `failure` response when saveConfigToLRU fails', function () {
      var res = {
        send: sinon.stub()
      },
        deferAssertion = Q.defer(),
        testSetup = function () {
          saveConfigToLRUStub.returns(deferred.promise);
          Config.save.put(null, res);
          deferred.reject();

          return deferAssertion.promise;
        };

      testSetup().then(function () {
        sinon.assert.calledWithExactly(res.send, 'failure');
      });
      deferAssertion.resolve();
    });
  });
});

describe('/api/config/command/restart', function () {
  describe('put()', function () {
    var rebootStub,
      deferred;

    beforeEach(function () {
      deferred = Q.defer();
      rebootStub = sinon.stub(LRUConfigUtils, 'reboot');
    });

    afterEach(function () {
      LRUConfigUtils.reboot.restore();
    });

    it('should #reboot()', function () {
      var res = {
        send: sinon.stub()
      };

      rebootStub.returns(deferred.promise);
      Config.restart.put(null, res);

      sinon.assert.calledOnce(rebootStub);
    });

    it('should send() `success` response when reboot succeeds', function () {
      var res = {
          send: sinon.stub()
        },
        deferAssertion = Q.defer(),
        testSetup = function () {
          rebootStub.returns(deferred.promise);
          Config.restart.put(null, res);
          deferred.resolve();

          return deferAssertion.promise;
        };

      testSetup().then(function () {
        sinon.assert.calledWithExactly(res.send, 'success');
      });
      deferAssertion.resolve();
    });

    it('should send `failure` response when reboot fails', function () {
      var res = {
          send: sinon.stub()
        },
        deferAssertion = Q.defer(),
        testSetup = function () {
          rebootStub.returns(deferred.promise);
          Config.restart.put(null, res);
          deferred.reject();

          return deferAssertion.promise;
        };

      testSetup().then(function () {
        sinon.assert.calledWithExactly(res.send, 'failure');
      });
      deferAssertion.resolve();
    });
  });
});

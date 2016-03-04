var child_process = require('child_process'),
  EventEmitter = require('events'),
  proxyquire = require('proxyquire'),
  LRUConfigUtils = require('../../util/LRUConfigUtils');

describe('LRUConfigUtils', function () {
  describe('_execAsyncCommand', function () {
    var execStub,
      consoleLogStub,
      data,
      pathStub,
      promise;

    before(function () {
      execStub = sinon.stub(child_process, 'exec');
      consoleLogStub = sinon.stub(console, 'log');
      data = {};

      pathStub = {};
      LRUConfigUtils = proxyquire('../../util/LRUConfigUtils', { 'child_process': pathStub });

      execStub.returns({
        stdout: new EventEmitter(),
        stderr: new EventEmitter()
      });
      pathStub.exec = execStub;

      promise = LRUConfigUtils._execAsyncCommand('echo foobar');
    });


    it('should exec cmd', function () {
      sinon.assert.calledWithExactly(execStub, 'echo foobar');
    });

    it('should resolve promise when stdout emits `data`', function () {
      execStub.firstCall.returnValue.stdout.emit('data', data);

      sinon.assert.calledWithExactly(consoleLogStub, 'stdout: ' + data);
      chai.assert.isFulfilled(promise, data);
    });

    it('should reject promise when stderr emits `data`', function () {
      execStub.firstCall.returnValue.stderr.emit('data', data);

      sinon.assert.calledWithExactly(consoleLogStub, 'stdout: ' + data);
      chai.assert.isRejected(promise, data);
    });

    after(function () {
      child_process.exec.restore();
      console.log.restore();
      LRUConfigUtils = proxyquire('../../util/LRUConfigUtils', { 'child_process': {} });
    });
  });

  describe('confirmConfigCollection', function () {
    it('should _execAsyncCommand `/etc/jaguar/bin/dbexport`', function () {
      var execAsyncCommandStub = sinon.stub(LRUConfigUtils, '_execAsyncCommand');

      LRUConfigUtils.confirmConfigCollection('bearers');

      sinon.assert.calledWithExactly(execAsyncCommandStub, '/etc/jaguar/bin/dbexport');

      LRUConfigUtils._execAsyncCommand.restore();
    });
  });

  describe('activateConfigCollection', function () {
    it('should _execAsyncCommand `/etc/jaguar/bin/jag-<collection> activate`', function () {
      var execAsyncCommandStub = sinon.stub(LRUConfigUtils, '_execAsyncCommand');

      LRUConfigUtils.activateConfigCollection('bearers');

      sinon.assert.calledWithExactly(execAsyncCommandStub, '/etc/jaguar/bin/jag-bearers activate');

      LRUConfigUtils._execAsyncCommand.restore();
    });
  });

  describe('saveConfigToLRU', function () {
    it('should _execAsyncCommand `/etc/jaguar/bin/jag-system save`', function () {
      var execAsyncCommandStub = sinon.stub(LRUConfigUtils, '_execAsyncCommand');

      LRUConfigUtils.saveConfigToLRU();

      sinon.assert.calledWithExactly(execAsyncCommandStub, '/etc/jaguar/bin/jag-system save');

      LRUConfigUtils._execAsyncCommand.restore();
    });
  });

  describe('reboot', function () {
    it('should _execAsyncCommand `/usr/local/bin/reboot`', function () {
      var execAsyncCommandStub = sinon.stub(LRUConfigUtils, '_execAsyncCommand');

      LRUConfigUtils.reboot();

      sinon.assert.calledWithExactly(execAsyncCommandStub, '/usr/local/bin/reboot');

      LRUConfigUtils._execAsyncCommand.restore();
    });
  });
});

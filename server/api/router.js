var router = require('express').Router(),
  arinc = require('./arinc'),
  atg = require('./atg'),
  bearers = require('./bearers'),
  clients = require('./clients'),
  config = require('./config'),
  flightdata = require('./flightdata'),
  ports = require('./ports'),
  radios = require('./radios'),
  tm = require('./tm');

router.get('/flightdata', flightdata.get);
router.put('/flightdata', flightdata.put);

router.get('/atg', atg.get);
router.put('/atg', atg.put);

router.get('/bearers', bearers.get);

router.get('/clients', clients.get);

router.put('/config/command/save', config.save.put);
router.put('/config/command/restart', config.restart.put);

router.get('/ports', ports.get);
router.post('/ports', ports.post);

router.get('/radios', radios.get);
router.put('/radios', radios.put);

router.get('/tm', tm.get);
router.put('/tm', tm.put);

module.exports = router;

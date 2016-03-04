var importA429 = require('./import_a429'),
  importBearers = require('./import_bearers'),
  importClients = require('./import_clients'),
  importEquipment = require('./import_equipment'),
  importMovingMaps = require('./import_movingmaps'),
  importPorts = require('./import_ports'),
  importRadios = require('./import_radios'),
  importRs232 = require('./import_rs232'),
  importWowMons = require('./import_wowmons');

setupDb = function (dbName, profile, env) {
  importA429(dbName, profile, env);
  importBearers(dbName, profile, env);
  importClients(dbName, profile, env);
  importEquipment(dbName, profile, env);
  importMovingMaps(dbName, profile, env);
  importPorts(dbName, profile, env);
  importRadios(dbName, profile, env);
  importRs232(dbName, profile, env);
  importWowMons(dbName, profile, env);
};

module.exports = setupDb;

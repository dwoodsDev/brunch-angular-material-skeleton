var setupDb = require('./setupDb');

setupDb(process.argv[2] || 'jaguar', process.argv[3] || 'production', process.argv[4] || 'local');

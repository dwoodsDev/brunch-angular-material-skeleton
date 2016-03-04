var importScript = require('./import_' + process.argv[2] + '');

// process.argv[2] or the collection name is the first commandline argument and
// process.argv[3] or the LRU profile is the second commandline argument
// process.argv[4] or the environment you want to run the script in (i.e. 'local') or leave it blank for production)
importScript('jaguar', process.argv[3] || 'production', process.argv[4] || 'local');

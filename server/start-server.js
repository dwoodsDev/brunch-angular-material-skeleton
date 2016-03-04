var Server = require('./Server'),
  port = process.argv[2] || 80;

new Server(port);

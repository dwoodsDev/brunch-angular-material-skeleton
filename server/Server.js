var resolve = require('path').resolve,
  http = require('http'),
  express = require('express'),
  app = express(),
  Server = function (port, path, callback) {
    var uiRoot = resolve(__dirname, '../public/index.html');

    app.use(express.static(__dirname + '/../public'));
    app.get('*', function(req, res) {
        res.sendFile(uiRoot);
    });

    http.createServer(app).listen(port, callback);
  };

exports.startServer = Server;
module.exports = Server;

var http = require('http');
var PORT = 8080;

var app = require('./app');

var server = http.createServer(app);
server.listen(PORT);
server.on('listening', function(){
  console.log('server started at ..' + PORT);
});

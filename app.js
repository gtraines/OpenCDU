/*
 * Created by graham on 7/1/17.
 */

var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('Hello, World! \n')
}).listen(8124, '127.0.0.1')

console.log('Server running')
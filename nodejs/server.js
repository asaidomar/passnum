var http = require('http');
var url = require('url');

var utils = require("./utils");


const port = 1337;
const host = '127.0.0.1';

function init_server(port, http, url, host) {

    var server = http.createServer(utils.dispatch);

    server.listen(port, host);

}


init_server(port, http, url, host);

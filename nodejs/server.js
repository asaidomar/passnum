// import de module
var http = require('http');
var url = require('url');

// import relatif, le module utils.js est relatif au module courant.
var utils = require("./utils");


const port = 1337;
const host = '127.0.0.1';


/**
 * Fonction de création de de server, point d'entrée du script.
 * @param port
 * @param http
 * @param url
 * @param host
 */
function init_server(port, http, url, host) {

    // objet server
    var server = http.createServer(utils.dispatch);

    // server pret en ecoute, dans le cas il est en ecoute sur le port `port` et pour le domaine `host`
    server.listen(port, host);
    console.log(`server lancé sur http://${host}:${port}`);

}


// call de la fonction
init_server(port, http, url, host);

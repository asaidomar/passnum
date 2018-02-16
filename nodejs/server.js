"use strict";

// import de module
var http = require('http');
var url = require('url');

// import relatif, le module utils.js est relatif au module courant.
var utils = require("./utils");
const CONST = require('./const');


/**
 * Fonction de création du server, point d'entrée de l'appplication.
 * @param port
 * @param http
 * @param url
 * @param host
 */
function init_server(port, http, host) {

    // objet server
    var server = http.createServer(utils.dispatch);

    // server pret en ecoute, dans le cas il est en ecoute sur le port `port` et pour le domaine `host`
    server.listen(port, host);
    console.log(`server lancé sur http://${host}:${port}`);

}


// call de la fonction
init_server(CONST.port, http,  CONST.host);

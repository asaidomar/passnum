"use strict";

// import de module
var http = require('http');
var url = require('url');
const path = require("path");
const express = require('express');


// import relatif, le module utils.js est relatif au module courant.
var utils = require("./utils");
const CONST = require('./const');

const app = express();




/**
 * Fonction de création du server, point d'entrée de l'appplication.
 * @param port
 * @param host
 */
function init_server(port, host) {
    app.set('view engine', 'pug');
    app.set('views', __dirname + '/pug');

    utils.dispatch_routes(app);

    app.listen(port,  function(){
        console.log(`server lancé sur http://${host}:${port}`)}
    );


}


// call de la fonction
init_server(CONST.port, CONST.host);

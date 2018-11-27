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




function dispatch () {
    req.username = {};
    console.log(req.url);
    if (req.url.indexOf("login") > 0) { //
        login(req, res)
    } else if (req.url.indexOf("register") > 0) { // /register
        register(req, res)
    } else if (req.url.indexOf("stats") > 0) { // /stats
        stats(req, res)
    } else if (req.url.indexOf("export") > 0) { // /stats
        export_results(req, res)

    }

    else {  // default, les autres url
        home(req, res)
    }
}

/**
 * Fonction de création du server, point d'entrée de l'appplication.
 * @param port
 * @param host
 */
function init_server(port, host) {
    app.set('view engine', 'pug');
    app.set('views', __dirname + '/pug');

    dispatch(app);

    app.listen(port,  function(){
        console.log(`server lancé sur http://${host}:${port}`)}
    );


}


// call de la fonction
init_server(CONST.port, CONST.host);

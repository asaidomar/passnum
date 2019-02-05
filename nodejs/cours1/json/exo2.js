// 1 lancer un serveur web
// lire l'url demandée et la valeur du paramètre name
// stocker dans un tableau date de connexion et dumper dans un fichier
// lire depuis le fichier et afficher navigateur le contenu du JSON
const http = require('http');
const url  = require('url');

const connexion_file = "stats.json";


/**
 * apped in tab, the user connexion
 * @param req
 * @param res
 */
function store_connexion(req, res){


}

/**
 * dumps to file the connexion tab `connexion_tab`
 * @param filename
 * @param connexion_tab
 */
function dump(filename, connexion_tab) {

}

/**
 * Load from file the connexions
 */
function load_connexion(filename) {
    //return
}

function display_connexion(req, res){
    res.end(load_connexion(connexion_file))
}

/**
 * user request handler.
 * @param req, user request object
 * @param res, response object, https://www.tutorialspoint.com/nodejs/nodejs_response_object.htm
 */
function dispatch_request(req, res) {
    if (req.url === "/users") {
        store_connexion();
        dump(connexion_file);
    } else if(req.url === "/stats"){
        display_connexion()
    }
    else {
        res.end("else")
    }
}

http.createServer(dispatch_request).listen(8000, '0.0.0.0');
console.log('Server running.');
// 1 lancer un serveur web
// lire l'url demandée et la valeur du paramètre name
// stocker dans un tableau date de connexion et dumper dans un fichier
// lire depuis le fichier et afficher navigateur le contenu du JSON
const http = require('http');
const url  = require('url');
const fs = require("fs");

const connexion_file = "stats.json";
let connexion_tab = [];


/**
 * apped in tab, the user connexion
 * @param req
 * @param res
 */
function store_connexion(query){
    let d = new Date();
    let data = [d.toString(), query.name];
    connexion_tab.push(data);
    return data
}

/**
 * dumps to file the connexion tab `connexion_tab`
 * @param filename
 */
function dump() {
    let data_str = JSON.stringify(connexion_tab,  null, 4);
    fs.writeFileSync(connexion_file, data_str)

}

/**
 * Load from file the connexions
 */
function load_connexion(filename) {
    return fs.readFileSync(filename)
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
    let q = url.parse(req.url, true);
    if (q.pathname === "/users") {
        let data = store_connexion(q.query);
        dump(connexion_file, connexion_tab);
        res.end(`hello "${data}"`)
    } else if(q.pathname === "/stats"){
        display_connexion(req, res)
    }
    else {
        res.end("else")
    }
}

http.createServer(dispatch_request).listen(8000, '0.0.0.0');
console.log('Server running.');
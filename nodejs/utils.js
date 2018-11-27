"use strict";


/**
 *  IMPORTS
 */
const url = require("url");
const fs = require('fs');
const queryString = require('querystring');
const path = require('path');

// import des module locaux (relatif au script courant)
const con = require("./db.js");
const CONST = require("./const.js");

var connected_username;  // flag savoir si le user a réussi la connection



/***
 *  FUNCTIONS
 */


/**
 * Renvoie sous forme de string la date.
 * @returns {string}
 */
function getDateTime() {

   var date = new Date();

   var hour = date.getHours();
   hour = (hour < 10 ? "0" : "") + hour;

   var min  = date.getMinutes();
   min = (min < 10 ? "0" : "") + min;

   var sec  = date.getSeconds();
   sec = (sec < 10 ? "0" : "") + sec;

   var year = date.getFullYear();

   var month = date.getMonth() + 1;
   month = (month < 10 ? "0" : "") + month;

   var day  = date.getDate();
   day = (day < 10 ? "0" : "") + day;

   return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}

/**
 * Insert la ligne (name, date) dans la table Stats et renvoie au client (navigateur) le nom inséré en base
 * @param name: nom de l'utilisateur
 * @param res: HTTP request
 */
function insert_name(name, res) {
    con.connect(function (err) {
        //if (err) throw err;
        var sql = "INSERT INTO Stats (username, connection_date) VALUES ('" + name + "', '" + getDateTime() + "')";
        con.query(sql, function (err, result) {
            //if (err) throw err;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(`Hello <font style="font-weight: bold"> ${name} </font>, <br /> Welcome to the first passnum nodejs applicacation! <a href="/stats/" > To see the stats</a>`);
        });
    });
}


/**
 * Fonction helper qui permet de d'éxécuter des requêtes SQL et de lancer `callback`
 * @param connection, mysql connection
 * @param query_str, requete sql à jouer
 * @param req, http request
 * @param res, http response
 * @param callback
 */
function run_query(connection, query_str, req, res, callback) {
    console.log("query to be run");
    console.log(query_str);
    connection.query(query_str, function (err, result, fields) {
        console.log(result);
        if (callback) {
            callback(result, req, res);
        }
    });
}


/**
 * Shift de `shift_value` (entier)
 * @param c, charactere à shifter (a, 1, etc)
 * @param shift_value, entier correspondant au décalage à réaliser
 * @returns {*}
 */
function shift_character(c, shift_value) {
    var upper = false;
    console.log("enter");
    console.log(c);
    if (Number.isInteger(c)){
        console.log("is number");
        console.log(c);
        return c + shift_value
    }

    var i = CONST.alpha_Array.indexOf(c);

    if (i < 0){
        i = CONST.alpha_U_Array.indexOf(c)
    }

    if (i < 0){
        throw Error(c + 'Not valid character');
    }

    console.log("index");
    console.log(i);

    var shifted_i = i + shift_value;
    var circular_i = shifted_i % CONST.alpha_Array.length;
    console.log("shifted");
    console.log(circular_i);
    if (upper){

        return CONST.alpha_U_Array[circular_i]
    }

    return CONST.alpha_Array[circular_i]
}


/**
 * Retourne le hash du mot de passe
 * @param string_password, mot de passe originale
 * @param shift, valeur entière du shift à réaliser
 * @param repeat_value
 * @returns {string}, nombre de répétition
 */
function get_hash(string_password, shift, repeat_value){

    // valeurs par default
    shift = shift || CONST.shift;
    repeat_value = repeat_value || CONST.repeat;

    var tab_character = [];

    // on insère la valeur décalée
    for (var i = 0; i <  string_password.length; i++){
        tab_character.push(shift_character(string_password[i], shift))
    }

    // on génère à nouveau la chaine de charactère
    var shifted_passward =  tab_character.join("");

    // tableau contenant le résultat finale
    var tab_result = [];
    tab_result.push(shift);
    tab_result.push(repeat_value);

    // on répète le mot de passe décalé repeat_value fois
    for (var j= 0; j < repeat_value; j++){
        tab_result.push(shifted_passward)

    }

    // chaine de charactère finale
    return tab_result.join("")
}


/**
 * callback de la fonction `challenge_login` si `result` (résultat de la requête SQL) contient >= une ligne, le user
 * est connu dans le cas contraite on renvoie la chaine "Login not OK"
 * @param result, resultat de la requete SQL
 * @param req, http request
 * @param res, http response
 */
function handler_login_result(result, req, res){
    if (result.length >= 1){
        req.username.connected = true;  // on flague l'utilisateur comme connecté
        res.writeHead(302, {Location: "/"}); // redirection
        res.end();
    }else{
        req.username.connected = false;
        connected_username = undefined;
        res.end("Login not OK")
    }
}

/**
 * callback de la fonction register, si l'insertion s'est faite correctement on flag
 * @param result
 * @param req
 * @param res
 */
function handler_register(result, req, res){
    console.log("result");
    console.log(result);
    if (result.affectedRows){
        req.username.connected = true;
        res.writeHead(302, {Location: "/"});
        res.end();
    }else{
        connected_username = undefined;
        res.end("Not able to register")
    }
}


/**
 * fait une requête sql pour voir si un user est connu et on lance la callback `handler_login_result`
 * @param req
 * @param res
 * @param username
 * @param password
 */
function challenge_login(req, res, username, password){
    var hashed_password = get_hash(password);
    var query_str = `select * from User where username="${username}" AND password="${hashed_password}"`;
    console.log(query_str);

    req.username = {};
    connected_username = username;
    return run_query(con, query_str, req, res, handler_login_result)

}

/**
 *
 * @param req
 * @param res
 * @param username
 * @param password
 */
function challenge_register(req, res, username, password){
    var hashed_password = get_hash(password);
    var query_str = `insert into User (username, password) VALUE ('${username}', '${hashed_password}')`;
    connected_username = username;
    return run_query(con, query_str, req, res, handler_register)
}

/**
 *
 * @param req
 * @param res
 */
function register(req, res) {
    var register_form = fs.readFileSync("./html/register.html");

    console.log(req.method);
    if (req.method === "POST"){
        var body = [];
        req.on('data', function(chunk) {
          body.push(chunk);
        }).on('end', function(){
            body = Buffer.concat(body).toString();
            // at this point, `body` has the entire request body stored in it as a string

            var body_obj = queryString.parse(body);
            console.log(body_obj);
            challenge_register(req, res, body_obj.login, body_obj.password);
        });

    }else{

        res.end(register_form);
    }

}

/**
 * callback qui formate le resultat SQL `results` sous forme de tableau HTML
 * @param results
 * @param req
 * @param res
 */
function handler_stats(results, req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    var result_str = "<table border='1'> <tr><th> User</th> <th> Connection Date </th></tr> ";
    for (var i =0; i<results.length; i++){
        console.log(results[i]);
        result_str += `<tr><td> ${results[i]["username"]} </td> <td> date ${results[i]["connection_date"]} </td> </tr>`
    }
    result_str += "</table>";
    result_str += "export the result <a href='/export'> Export</a>";
    res.end(result_str)

}


/**
 * callback qui formate le resultats SQL `results` sous forme de fichier csv et le renvoie au client en attachement.
 * @param results
 * @param req
 * @param res
 */
function handler_export(results, req, res){

    var content = "User;Connection Date\n";
    for (var i =0; i<results.length; i++){
        console.log(results[i]);
        content += `${results[i]["username"]};${results[i]["connection_date"]}\n`
    }
    var file = './media/export.csv';

    fs.writeFileSync(file, content);

    var filename = path.basename(file);
    var mimetype = "text/csv";

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);

    var filestream = fs.createReadStream(file);
    filestream.pipe(res);


}

/**
 * Renvoie les stats de connexion
 * @param req
 * @param res
 */
function stats(req, res) {

    if (connected_username){
        var query_str = "select * from Stats order by connection_date desc";
        run_query(con, query_str, req, res, handler_stats)
    }else{
        res.writeHead(302, {Location: "/login/"});
        res.end();
    }
}

/**
 * Permet le download des stats de connexion sous forme de fichier csv.
 * @param req
 * @param res
 */
function export_results(req, res){

    if (connected_username){
        var query_str = "select * from Stats order by connection_date desc";
        run_query(con, query_str, req, res, handler_export)
    }else{
        res.writeHead(302, {Location: "/login/"});
        res.end();
    }

}

/**
 * Insert en base le login et la date de connection si le user est connu.
 * @param req
 * @param res
 */
function home(req, res) {
    if (connected_username){
        insert_name(connected_username, res)
    }else{
        res.writeHead(302, {Location: "/login/"});
        res.end();
    }

}


function login(req, res){
    if (req.method === "POST"){
        return handler_form_content(req, res)
    }else{
        return print_form()
    }
}

/**
 * fonction qui gère le login de l'utilisateur
 * @param req, objet request
 * @param res onjet response
 */
function login(req, res){

    // on lit le contenu du fichier './html/login.html' en synchrone
    var login_form = fs.readFileSync("./html/login.html");

    console.log(req.method);
    if (req.method === "POST"){
        var body = [];
        // on commence à recevoir la requête depuis le navigateur
        req.on('data', function(chunk) {
          body.push(chunk);
        // le navigateur à envoyé tout le contenu du formulaire
        }).on('end', function(){
            // at this point, `body` has the entire request body stored in it as a string
            body = Buffer.concat(body).toString();

            // on parse le contenu de body qui peut être de la forme
            var body_obj = queryString.parse(body);
            console.log(body_obj);

            challenge_login(req, res, body_obj.login, body_obj.password);
        });

    }else{ // GET

        res.end(login_form);
    }

}

// on export un objet anonyme qui possède en clef `hello`, `dispatch`...
// à noter que la valeur d'une clef peut etre une fonction, un type primitif ou un autre objet
module.exports = {
    hello: function (request, response) {

        response.writeHead(200, {'Content-Type': 'text/plain'});
        var queryData = url.parse(request.url, true).query;
        if (queryData.name) {
            // user told us their name in the GET request, ex: http://host:8000/?name=Tom
            response.end('Hello ' + queryData.name + '\n');
        } else {
            response.end('Hello World\n');
        }
    },

    // fonction de dispatch en fonction de l'url demandé
    dispatch: function (req, res) {
        req.username = {};
        console.log(req.url);
        if (req.url.indexOf("login") > 0){ // /login  if (req.url === "/login")   var test = "chaine" ; test.indexOf("t")
            login(req, res)
        }else if (req.url.indexOf("register") > 0){ // /register
            register(req, res)
        }else if (req.url.indexOf("stats") > 0){ // /stats
            stats(req, res)
        }else if (req.url.indexOf("export") > 0){ // /stats
            export_results(req, res)

        }

        else{  // default, les autres url
            home(req, res)
        }

    },

    get_hash: get_hash

};


function dispatch (req, res) {
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
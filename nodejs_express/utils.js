"use strict";


/**
 *  IMPORTS
 */
const url = require("url");
const fs = require('fs');
const queryString = require('querystring');
const path = require('path');
var bodyParser = require('body-parser');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// import des module locaux (relatif au script courant)
const con = require("./db.js");
const CONST = require("./const.js");


var app;
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


function handle_insert_one(results, req, res, name) {
    res.render("home", {
        name: name
    })
}

/**
 * Insert la ligne (name, date) dans la table Stats et renvoie au client (navigateur) le nom inséré en base
 * @param name: nom de l'utilisateur
 * @param req: HTTP request
 * @param res: HTTP request
 */
function insert_name(name, req, res) {
    //if (err) throw err;
    var sql = "INSERT INTO Stats (username, connection_date) VALUES ('" + name + "', '" + getDateTime() + "')";
    run_query(con, sql)
        .then(function (results) { handle_insert_one(results, req, res, name) })
}


/**
 * Fonction helper qui permet de d'éxécuter des requêtes SQL et de lancer `callback`
 * @param con, mysql connection
 * @param query_str, requete sql à jouer
 */
function run_query(con, query_str) {
    console.log("query to be run");
    console.log(query_str);

    return new Promise( function( resolve, reject ){
        con.query(query_str, [], function( err, rows, fields ){
            if ( err )
                return reject( err );
            resolve(rows);
        } );
    } );

}


/**
 * Shift de `shift_value` (entier)
 * @param c, charactere à shifter (a, 1, etc)
 * @param shift_value, entier correspondant au décalage à réaliser
 * @returns {*}
 */
function shift_character(c, shift_value) {
    var upper = false;
    if (Number.isInteger(c)){
        return c + shift_value
    }

    var i = CONST.alpha_Array.indexOf(c);

    if (i < 0){
        i = CONST.alpha_U_Array.indexOf(c)
    }

    if (i < 0){
        throw Error(c + 'Not valid character');
    }


    var shifted_i = i + shift_value;
    var circular_i = shifted_i % CONST.alpha_Array.length;
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
        res.redirect('/')
    }else{
        res.render("login", {
            message: {
                error: "Username or login incorrect",
                info: ""
            },
            user: {
                username: ""
            }
        })
    }
}

/**
 * callback de la fonction register, si l'insertion s'est faite correctement on flag
 * @param result
 * @param req
 * @param res
 */
function handler_register(result, req, res){
    if (result.affectedRows){
        req.username.connected = true;
        res.redirect("/")
    }else{
        connected_username = undefined;
        res.render("register", {
            message: {
                error: "Unexpected Error",
                info: ""
            },
            user: {
                username: ""
            }
        })
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
    req.username = {};
    connected_username = username;
    run_query(con, query_str)
        .then(function (results) { handler_login_result(results, req, res) })


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
    return run_query(con, query_str)
        .then(function (results) { handler_register(results, req, res) })
        .error(function(e){console.log("Error handler " + e)})
        .catch(function(e){console.log("Catch handler " + e)});
}


/**
 * callback qui formate le resultat SQL `results` sous forme de tableau HTML
 * @param results
 * @param req
 * @param res
 */
function handler_stats(results, req, res){
    console.log(results);
    res.render("results", {results: results});

}


/**
 * callback qui formate le resultats SQL `results` sous forme de fichier csv et le renvoie au client en attachement.
 * @param results
 * @param req
 * @param res
 */
function handler_export(results, req, res){

    res.attachment();
    res.render("results_csv.pug", {results: results});

}

/**
 * Renvoie les stats de connexion
 * @param req
 * @param res
 */
function stats(req, res) {

    if (connected_username){
        var query_str = "select * from Stats order by connection_date desc";
        run_query(con, query_str, req, res)
            .then(function (results) { handler_stats(results, req, res) })


    }else{
        res.redirect("/login/")
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
        run_query(con, query_str, req, res)
            .then(function (results) { handler_export(results, req, res) })
    }else{
        res.redirect("/login")
    }

}

/**
 * Insert en base le login et la date de connection si le user est connu.
 * @param req
 * @param res
 */
function home(req, res) {
    if (connected_username){
        insert_name(connected_username, req, res)
    }else{
        res.redirect("/login");

    }

}


function get_register_form() {
    // on lit le cotenu de la template register.pug a laquelle on injecte la valeur de l'objet suivant:
    res.render("login", {
        message: {
            error: "",
            info: ""
        },
        user: {
            username: ""
        }
    })
}


/**
 * fonction qui gère le login de l'utilisateur
 * @param req, objet request
 * @param res onjet response
 */
function get_login_form(req, res) {
    // on lit le cotenu du template login.pug a laquelle on inject la valeur de l'objest suivant:
    res.render("login", {
        message: {
            error: "",
            info: ""
        },
        user: {
            username: ""
        }
    })
}

/**
 * Gere le post du formulaire de login
 * @param req
 * @param res
 */
function post_login_form(req, res){
    var body = req.body;
    challenge_login(req, res, body.username, body.password);

}


function post_register_form(req, res){
    var body = req.body;
    challenge_register(req, res, body.login, body.password);
}

var dispatch_routes = function (app_) {

    app = app_;

    app.get("/login", get_login_form);
    app.post("/login", urlencodedParser, post_login_form);

    app.get("/register", get_register_form);
    app.post("/login", urlencodedParser, post_register_form);

    app.get("/stats", stats);

    app.get("/export", export_results);

    app.get("*", home);

};

// on export un objet anonyme qui possède en clef `hello`, `dispatch`...
// à noter que la valeur d'une clef peut etre une fonction, un type primitif ou un autre objet
module.exports = {
    // fonction de dispatch en fonction de l'url demandé
    dispatch_routes:dispatch_routes,
    get_hash: get_hash

};



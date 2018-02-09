const url = require("url");
const fs = require('fs');

const queryString = require('querystring');

const con = require("./db.js");
const CONST = require("./const.js");


connected_user = [];

var connected_username;


//recuperer la date
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


function insert_name(name, res){
    con.connect(function(err) {
      //if (err) throw err;
      var sql = "INSERT INTO Stats (username, connection_date) VALUES ('"+name+"', '"+getDateTime()+"')";
      con.query(sql, function (err, result) {
        //if (err) throw err;
         res.end(name + " inserted");
      });
    });


}

function run_query(con, query_str, req, res, callback) {
    console.log("query to be run");
    console.log(query_str);
    con.query(query_str, function (err, result, fields) {
        console.log(result);
        if (callback) {
            callback(result, req, res);
        }
    });
}


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

function get_hash(string_password, shift, repeat_value){

    shift = shift || CONST.shift;
    repeat_value = repeat_value || CONST.repeat;
    var tab_character = [];

    for (var i = 0; i <  string_password.length; i++){
        tab_character.push(shift_character(string_password[i], shift))
    }

    var shifted_passward =  tab_character.join("");

    var tab_result = [];
    tab_result.push(shift);
    tab_result.push(repeat_value);

    for (var j= 0; j < repeat_value; j++){
        tab_result.push(shifted_passward)

    }

    return tab_result.join("")
}


function handler_login_result(result, req, res){
    if (result.length >= 1){
        req.username.connected = true;
        res.writeHead(302, {Location: "/"});
        res.end();
    }else{
        req.username.connected = false;
        connected_username = undefined;
        res.end("Login not OK")
    }
}

function handler_register(result, req, res){
    console.log("result");
    console.log(result);
    if (result.affectedRows){
        req.username.connected = true;
        res.writeHead(302, {Location: "/"});
        res.end();
    }else{
        connected_username = undefined
        res.end("Not able to register")
    }
}

function challenge_login(req, res, username, password){
    var hashed_password = get_hash(password);
    var query_str = `select * from User where username="${username}" AND password="${hashed_password}"`;
    console.log(query_str);

    req.username = {};
    connected_username = username;
    return run_query(con, query_str, req, res, handler_login_result)

}


function challenge_register(req, res, username, password){
    var hashed_password = get_hash(password);
    var query_str = `insert into User (username, password) VALUE ('${username}', '${hashed_password}')`;
    connected_username = username;
    return run_query(con, query_str, req, res, handler_register)
}


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


function handler_stats(results, req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    var result_str = "<ul>";
    for (var i =0; i<results.length; i++){
        console.log(results[i]);
        result_str += `<li> user ${results[i]["username"]}, date ${results[i]["connection_date"]} </li> `
    }

    res.end(result_str)

}


function stats(req, res) {
    var query_str = "select * from Stats";
    run_query(con, query_str, req, res, handler_stats)
}

function insert_stat() {
    
}

function home(req, res) {
    if (connected_username){
        insert_name(connected_username, res)
    }else{
        res.writeHead(302, {Location: "/login/"});
        res.end();
    }

}


function login(req, res){
    var login_form = fs.readFileSync("./html/login.html");

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
            challenge_login(req, res, body_obj.login, body_obj.password);
        });

    }else{

        res.end(login_form);
    }

}


module.exports = {
    hello: function (req, res) {

        res.writeHead(200, {'Content-Type': 'text/plain'});
        var queryData = url.parse(req.url, true).query;
        if (queryData.name) {
            // user told us their name in the GET request, ex: http://host:8000/?name=Tom
            res.end('Hello ' + queryData.name + '\n');
        } else {
            res.end('Hello World\n');
        }
    },


    dispatch: function (req, res) {
        req.username = {};
        if (req.url.indexOf("login") > 0){
            login(req, res)
        }else if (req.url.indexOf("register") > 0){
            register(req, res)
        }else if (req.url.indexOf("stats") > 0){
            stats(req, res)

        }else{
            home(req, res)
        }

    },

    get_hash: get_hash

};



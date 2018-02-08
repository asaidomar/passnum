const url = require("url");
const fs = require('fs');
const mysql = require('mysql');

var con;


function init_sql(){
    con = mysql.createConnection({
      host: "localhost",
      user: "yourusername",
      password: "yourpassword",
      database: "mydb",
    });

    return con

}


function run_query(con, query_str, req, res, callback) {
    con.connect(function (err) {
        con.query(query_str, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            if (callback) {
                callback(result, req, res);
            }
        });
    });
}


function get_hash(s){
    return s
}


function handler_login_result(result, req, res){
    if (result.length >= 1){
        res.end("OK ")
    }else{
        res.end("Login not OK")
    }
}

function handler_register(result, req, res){
    if (result.length){
        res.redirect("/")
    }
}

function challenge_login(req, res, username, password){
    var hashed_password = get_hash(password);
    var query_str = `select * from User where username="${username}" AND password="${hashed_password}"`;
    return run_query(con, query_str, req, res, handler_login_result)

}


function regsiter(req, res, username, password){
    var hashed_password = get_hash(password);
    var query_str = `insert into User (username, password) VALUE (${username}; ${hashed_password})`;
    return run_query(con, query_str, req, res, handler_register)
}


function login(req, res){
    var login_form = fs.readFileSync("./html/login.html");

    if (req.method === "post"){

    }else{

        res.end(login_form);
    }

}

init_sql();

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

        if (req.url.indexOf("login") > 0){
            login(req, res)
        }else if (req.url.indexOf("register") > 0){
            res.end("register")
        }else if (req.url.indexOf("stats") > 0){
            res.end("stats")

        }else{
            res.end("home")
        }

    },

    get_hash: get_hash

};



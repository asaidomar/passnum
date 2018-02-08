const url = require("url");
const fs = require('fs');

const queryString = require('querystring');

const con = require("./db.js");





function run_query(con, query_str, req, res, callback) {
    con.query(query_str, function (err, result, fields) {
        console.log(result);
        if (callback) {
            callback(result, req, res);
        }
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
    console.log(query_str);
    return run_query(con, query_str, req, res, handler_login_result)

}


function regsiter(req, res, username, password){
    var hashed_password = get_hash(password);
    var query_str = `insert into User (username, password) VALUE (${username}; ${hashed_password})`;
    return run_query(con, query_str, req, res, handler_register)
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



const redis = require("redis");

const client = redis.createClient();
const mysql = require('mysql');

const connnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "NodeDB"
});


connnection.connect(function (err) {
    if (err) throw err;
});


function load(){

    connection.query(query_str, function (err, result, fields) {
        console.log(result);
        if (callback) {
            callback(result, req, res);
        }
    });
}


function dump(){

}

function register(req, res) {
    if (req.method === "POST") {
        return handler_form_content("register", req, res)
    } else {
        return print_form("register")
    }
}


const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    port: '8889',
    user: "root",
    password: "root",
    database: "NODE_APP"

});


function do_query(query_str, callback, fallback){
    con.connect(function (err) {
        if (err) {
            // console.error(err);
            // throw err;
        }
        console.log("Connected!");
        con.query(query_str, function (err, result) {
            if (err) {
                if (fallback){
                    fallback(err);
                }
            }
            else{
                if (callback){
                    callback(result);
                }
            }
        });
    });

}


module.exports.do_query = do_query;
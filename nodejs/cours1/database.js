const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    port: '8889',
    user: "root",
    password: "root",
    database: "CINEMA"

});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});



function do_query(query_str, callback, fallback){
    con.connect(function (err) {
        if (err) {
            console.error(err);
            // throw err;
        }
        console.log("Connected!");
        con.query(query_str, function (err, result) {
            if (err) {
                fallback(err);
            }
            callback(result);
        });
    });

}

function get_films(callback_display) {
    let query = "select * from FILM";
    do_query(query, callback_display, (err)=>{console.error(err)})
}

function get_actors(callback_display){
    let query = "select * from PERSONNE WHERE NUMP in (select NUMA from ACTEUR)";
    do_query(query, callback_display, (err)=>{console.error(err)})

}


//get_films((result)=>{console.log(result)});
//get_actors((result)=>{console.log(result)});


module.exports.get_films = get_films;
module.exports.get_actors = get_actors;

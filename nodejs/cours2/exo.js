'use strict';

// créer un serveur web en node js => afficher message de bienvenu
// parser les paramètres GET
//
const http = require("http");
const url = require("url");
const database = require("./database");


/**
 * From req, returns user data.
 * @param req
 * @returns {{nom: *, tel: boolean, prenom: *, mdp: *, email: (boolean|*)}}
 */
function get_user_data(req){
    let q = url.parse(req.url, true);
    if (q.query.email && q.query.mdp){
        return {
            nom: q.query.nom,
            tel: q.query.tel,
            prenom: q.query.prenom,
            mdp: q.query.mdp,
            email: q.query.email,
        }
    }else{
        throw error("email not supplied")
    }
}

/**
 * get the sql query to insert user
 * @param user
 */
function get_insert_query(user){
    return `INSERT INTO User(email, nom, prenom, tel, mdp) VALUES("${user.email}", "${user.nom}", "${user.prenom}", "${user.tel}", "${user.mdp}")`
}



function check_login(email, mdp, res) {
    let query_str =  `select id from User where email="${email}" AND mdp="${mdp}"`;

    function is_user(){
        res.end(`hello ${email}`)
    }

    function is_not_user(){
        res.writeHead(403);
        res.end()
    }


    function check_user(result){
        if (result.length === 1){
            is_user()
        }else{
            is_not_user()
        }
    }

    database.do_query(query_str, check_user)
    
}

function log_connexion(email){

    let date = new Date();
    let data_str = date.toString();

    database.do_query(`insert into Connection VALUES ("${email}", "${data_str}")`)

}

function display_results(query, res){

    function __display_result(results){
        let result_str = "";
        for (let i = 0; i < results.length; i++) {
            result_str += JSON.stringify(results[i]);
            result_str += "\n"
        }
        res.end(result_str)
    }

    database.do_query(query, __display_result)
}

function dispatch(req, res) {
    let q = url.parse(req.url, true);
    let pathname = q.pathname;
    let email = q.query.email;

    let date = new Date();

    console.log(pathname);
    if (pathname === "/user/signup") {
        let user = get_user_data(req);
        //console.log(user);


        let query = get_insert_query(user);
        //console.log(query);

        database.do_query(query,
            (results) => {console.log("User inserted", results)},
            (results) => {console.log("User inserted", results)}
            );

        //res.redirect(301, '/');
        res.writeHead(302, {
          'Location': `/?email=${user.email}`
          //add other headers here...
        });
        res.end();
    }
    else if (pathname === "/user/login") {
        let mdp = q.query.mdp;
        // check user data if exists in db
         check_login(email, mdp, res)
    }
    else if (pathname === "/stat/connexions") {
        // display connnexon stats
        let query_str = `select * from Connection`;
        display_results(query_str, res)
    }

    else if (pathname === "/stat/users") {
        // display users stats
        let query_str = `select * from User`;
        display_results(query_str, res)
    } else{
        res.end(`welcome ${email}, on ${date.toString()} `);
        log_connexion(email)
    }
}


http.createServer(dispatch).listen(8080);
console.log("server en ecoute http://localhost:8080");

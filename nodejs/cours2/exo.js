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


/**
 * Check for user credentials.
 * @param email, user email
 * @param mdp, user password
 * @param res, result object
 */
function check_login(email, mdp, res) {
    let query_str =  `select id from User where email="${email}" AND mdp="${mdp}"`;

    /**
     * user exists => redirect to "/"
     */
    function is_user(){
        res.writeHead(302, {
          'Location': `/?email=${email}`
          //add other headers here...
        });
        res.end(); // closure
    }

    /**
     * Use does not exist, return an HTTP 403 error code
     */
    function is_not_user(){
        res.writeHead(403);
        res.end() // closure
    }

    /**
     * Check if user exits in DB
     * @param result, SQL query result
     */
    function check_user(result){
        console.debug(result);
        // if (result.length === 1) should be the real test
        if (result.length === 0){
            is_not_user()
        }else{
            is_user()
        }
    }

    database.do_query(query_str, check_user)
    
}

/**
 *
 * @param req
 */
function get_order(req){
    let order;
    return order
}

/**
 *
 */
function store_in_db_order(){

}


/**
 * display (HTML table) user order
 * @param req
 * @param res
 */
function display_user_orders(req, res){

}


/**
 * display (HTML table) all orders
 * @param req
 * @param res
 */
function display_orders(req, res){

}


/**
 * Insert in DB user connection
 * @param email
 */
function log_connexion(email){

    let date = new Date();
    let data_str = date.toString();
    database.do_query(`insert into Connection VALUES ("${email}", "${data_str}")`)

}

function join(tab, sep){
    // console.log(tab.join(sep));
    return tab.join(sep);
}


/**
 * Display result, bare result in JSON like format.
 * @param query, sql query
 * @param res, result object
 * @TODO: improve the display and display as HTML
 */
function display_results(query, res, format){

    function write_header(result_entry, tag){
        let header_tab = [];

        for (let key in result_entry){
            header_tab.push(`<${tag}>${key}</${tag}>`)
        }
        return join(header_tab, "")

    }


    function _display_result_as_html(results){

        if (results.length === 0){
            return res.end()
        }

        let result_str = "<table border='1'>";
        result_str += `<tr>${write_header(results[0], "th")}</tr>`;
        for (let i = 0; i < results.length; i++) {
            let row_tab = [];
            row_tab.push("<tr style='border: 1px'>");
            for (let key in results[i]){
                //console.log(i);
                console.log(key, results[i][key]);
                row_tab.push(`<td> ${results[i][key]}</td>`);
            }
            row_tab.push("</tr>");
            result_str += join(row_tab, "");
            result_str += "\n"
        }
        result_str += "</table>";

        res.end(result_str)
    }

    function __display_result(results){
        if (format === "html"){
            return res.end(_display_result_as_html(results))
        }
        return res.end(JSON.stringify(results))
    }

    database.do_query(query, __display_result)
}

/**
 * Return order object from request object,
 * parse url like http://localhost:8080/user/order?email=test@test.com_3&id=1&name=TEST_produit_1&prix_unitaire=10&quantite=50
 * @param req
 * @returns {undefined}
 */
function get_order_data(req) {
    let q = url.parse(req.url, true);
    let d = new Date();
    if (q.query.email && q.query.id && q.query.name){
        return {
            id: q.query.id,
            user_email: q.query.email,
            item_name: q.query.name,
            item_price: q.query.prix_unitaire,
            item_quantity: q.query.quantite,
            order_date: d.toString()
        }
    }else{
        throw error("email not supplied")
    }
}

/**
 * return the sql query to insert order in table UserOrder
 * @param order
 * @returns {string}
 */
function get_insert_order_query(order) {
    return `INSERT INTO UserOrder(id, user_email, item_name, item_price, item_quantity, order_date) VALUES("${order.id}", "${order.user_email}", "${order.item_name}", "${order.item_price}", "${order.item_quantity}", "${order.order_date}")`
}

/**
 * Function to handle all asked url and called to related function
 * @param req, request object
 * @param res, result object
 */
function dispatch(req, res) {
    let q = url.parse(req.url, true);
    let pathname = q.pathname;
    let email = q.query.email;
    //console.log(q);

    let date = new Date();
    // TODO: return HTML, utf8 charset
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
    else if (pathname === "/user/order") {
        let order = get_order_data(req);
        //console.log(user);


        let query_order = get_insert_order_query(order);
        //console.log(query);

        database.do_query(query_order,
            (results) => {console.log("Order inserted", results)},
            (results) => {console.log("Order NOT inserted!", results)}
            );

        res.writeHead(302, {
          'Location': `/?email=${order.email}`
        });
        res.end();
    }
    else if (pathname === "/stat/connexions") {
        // display connnexon stats
        let query_str = `select * from Connection`;
        display_results(query_str, res, 'json')
    }

    else if (pathname === "/user/orders") {
        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write("<h2> Liste des commandes </h2>");
        // display connnexon stats
        let query_str;
        if (email){
            query_str = `select * from UserOrder where user_email="${email}"`
        }else{
            query_str = `select * from UserOrder`;
        }

        console.log(query_str);

        display_results(query_str, res, 'html')
    }
    else if (pathname.includes("/user/order/")) {
        let order_id = pathname[pathname.length - 1];
        let query_str;
        if (order_id){
            query_str = `select * from UserOrder where id="${order_id}"`;
        }else{
            res.end("no id supplied")
        }
        //console.log(query_str);
        display_results(query_str, res, 'json')
    }

    else if (pathname === "/stat/users") {
        // display users stats
        let query_str = `select * from User`;
        display_results(query_str, res, "html")
    }

    else{
        if (email){
            res.end(`welcome ${email}, on ${date.toString()} `);
            log_connexion(email)
        }
    }
}

// create HTTP server
http.createServer(dispatch).listen(8080);
console.log("server en ecoute http://localhost:8080");
let test_url = "http://localhost:8080/user/order?email=test@test.com_3&id=1&name=TEST_produit&prix_unitaire=10&quantite=5"
const http = require('http');
const url  = require('url');
const database = require("./database");

let neededstats = [];



function display_films(result, response){
    for (let i = 0; i < result.length; i++) {
        let result_str = ` Num ${result[i].NUMF}, titre ${result[i].TITRE}, genre ${result[i].GENRE}, annee, ${result[i].ANNEE} \n`;
        //console.log(result_str);
        response.write(result_str);
    }
    response.end("");

}


function display_acteurs(result, response){
    for (let i = 0; i < result.length; i++) {
        let result_str = ` Num ${result[i].NUMP}, prenom ${result[i].PRENOM}, nom ${result[i].NOM}, datenais, ${result[i].DATENAIS} \n`;
        //console.log(result_str);
        response.write(result_str);
    }
    response.end("");

}

http.createServer(function(req, res) {
    if (req.url === "/film") {
        database.get_films((result)=>{
            display_films(result, res)
        })
    } else {
        database.get_actors((result)=>{
            display_acteurs(result, res)
        })

    }
}).listen(8000, '0.0.0.0');
console.log('Server running.');
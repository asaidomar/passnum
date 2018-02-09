const  N = 1000;
const fs = require("fs");
const redis = require("redis");

client = redis.createClient();



const filename = "db.json";


var addresses_book = {};



function populate_redis(N ) {
    for (var i = 0; i< N; i++){
        var personne = {
            name: "personnes " + i,
            address: i + " rue no man land, 13013 Marseille",
            phone: "063435677 " + i
        };

        var personne_str = JSON.stringify(personne);

        client.set("personne " + i, personne_str);
        console.log("personne " + i + "has been set");
    }

    return true
}

function populate_db(N, callback) {


    for (var i = 0; i< N; i++){
        var personne = {
            name: "personnes " + i,
            address: i + " rue no man land, 13013 Marseille",
            phone: "063435677 " + i
        };

        addresses_book["personne " + i] = personne
    }

    callback(addresses_book);

    return addresses_book

}


function load(filename) {

}

function dump(obj) {
    var json_obj = JSON.stringify(obj);

    fs.writeFile(filename, json_obj, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}


function  get(key) {
    var content = fs.readFileSync(filename);
    var obj = JSON.parse(content);

    return obj[key]

}


function filter(name, address, phone) {
    var result = {};

    var content = fs.readFileSync(filename);
    var obj = JSON.parse(content);

    for (var p in obj){
        if (name){
            if (p.indexOf(name)){
                result[p] = obj[p]
            }
        }
        
        if (address){
            if (obj[p].address.indexOf(address)){
                result[p] = obj[p]
            }            
        }
        if (phone){
            if (obj[p].phone.indexOf(phone)){
                result[p] = obj[p]
            }
        }

    }

    return result
    
}

function redis_get(key) {

    console.log(client.get(key))

}

function main() {

    var args = process.argv;
    args.shift(); //node
    args.shift(); // script name

    console.log(args);

    if (args[0] === "populate"){
        populate_db(N, dump)
    }else if(args[0] === "get"){
        var key = args[1];
        console.log(get(key))
    }else if (args[0] ==="filter"){
        var key = args[1];

        console.log(filter(key))
    }else if (args[0] === "redis"){
        var action = args[1];

        if (action === "populate"){
            return populate_redis(N)
        }

        if (action === "get"){
            var key = args[2];
            redis_get(key)
        }
    }

    process.exit()

}



main();
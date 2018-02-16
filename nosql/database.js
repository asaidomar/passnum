"use strict";
const fs = require("fs");
const redis = require("redis");
var MongoClient = require('mongodb').MongoClient;

const mongo_collection = "addresses";
const  N = 1000;
const filename = "db.json";

var addresses_book = {};
var dbo;

var client = redis.createClient();

const url = "mongodb://localhost:27017/";


function get_mongo(attr, value){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var filter = {};
        filter[attr] = value;
        console.log(filter);
        dbo.collection(mongo_collection).findOne(filter, function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
}


function count_mongo(attr, value) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var filter = {};
        filter[attr] = {$regex : `.*${value}.*`};
        console.log(filter);
        dbo.collection(mongo_collection).count(filter, function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
}



function filter_mongo(attr, value) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var filter = {};
        filter[attr] = {$regex : `.*${value}.*`};
        console.log(filter);
        dbo.collection(mongo_collection).find(filter).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
}


function populate_mongo2(N){

    var addresses = [];
    for (var i = 0; i < N; i++) {
        var personne = {
            name: "personne "  + i,
            address: i + " rue no man land, 13013 Marseille",
            phone: "063435677 " + i
        };
        addresses.push(personne);
    }

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection(mongo_collection).insertMany(addresses, function (err, res) {
            if (err) throw err;
            console.log(N + "documents inserted");

        });
        db.close();

    });
}

function populate_mongo(N) {

    return MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");

        for (var i = 0; i < N; i++) {
            var personne = {
                name: "personne " + i + 10000,
                address: i + " rue no man land, 13013 Marseille",
                phone: "063435677 " + i

            };

            dbo.collection(mongo_collection).insertOne(personne, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");

            });
        }

        db.close();

    });
}


function populate_redis(N ) {
    for (var i = 0; i< N; i++){
        var personne = {
            name: "personne "  + i,
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
    console.log(`populate ${N} persons`);
    for (var i = 0; i< N; i++){
        var personne = {
            name: "personne "  + i,
            address: i + " rue no man land, 13013 Marseille",
            phone: "063435677 " + i
        };

        addresses_book["personne " + i] = personne
    }

    callback(addresses_book);

    return addresses_book

}


function dump(obj) {
    var json_obj = JSON.stringify(obj);
    fs.writeFileSync(filename, json_obj);
    console.log("The file was saved!");
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
            if (p.indexOf(name) > 1){
                result[p] = obj[p]
            }
        }
        
        if (address){
            if (obj[p].address.indexOf(address) > 1){
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

    console.log("argument ", args);

    if (args[0] === "populate"){
        var n = parseInt(args[1]);
        populate_db(n || N, dump)
    }else if(args[0] === "get"){
        var key = args[1];
        console.log(get(key))
    }else if (args[0] ==="filter"){
        var key = args[1];

        console.log(filter(key))
    }else if (args[0] === "redis"){
        var action = args[1];
        if (action === "populate"){
            var n = parseInt(args[2]);
            return populate_redis(n || N)
        }
        if (action === "get"){
            var key = args[2];
            redis_get(key)
        }
    }else if (args[0] === "mongo"){
        var action = args[1];
        if (action === "populate"){
            var n = parseInt(args[2]);
            return populate_mongo(n || N)
        }
        if (action === "populate2"){
            var n = parseInt(args[2]);
            return populate_mongo2(n || N)
        }
        if (action === "filter"){
            var attr = args[2];
            var value = args[3];
            filter_mongo(attr, value)
        }if( action === "get"){
            var attr = args[2];
            var value = args[3];
            get_mongo(attr, value)
        }if( action === "count"){
            var attr = args[2];
            var value = args[3];
            count_mongo(attr, value)
        }
    }else{
        (function () {
            console.error(args[0], "Unknown command ");
        })();
    }
}



main();
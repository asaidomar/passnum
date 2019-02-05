'use strict';

const fs = require("fs");


function create_person(i){
    let person = {};
    person.name = "test person " + i;
    person.mobile = "0767676767" + i;
    person.address = "rue test n " + i + "Marseille";
    return person
}

function create_peson2(i) {
    return {
        name:"test person " + i,
        mobile: "0767676767" + i,
        address: "rue test n " + i + " Marseille "
    }
}

function create_addresse_book(Nbpersonne){
    let address_book = {};
    for (let i = 0; i < Nbpersonne; i++) {
        address_book["personne " + i] = create_person(i);
    }
    return address_book
}

/**
 * Write `obj` to file `filename`
 * @param obj
 * @param filename
 */
function dump(obj, filename){
    let data_str = JSON.stringify(obj);
    fs.writeFileSync(filename, data_str)
}

/**
 * Get element from data parsed from the file `filename`
 * @param filename
 * @param key
 * @returns {*}
 */
function get_from_file(filename, key) {
    let data_str = fs.readFileSync(filename);
    let data = JSON.parse(data_str);
    return data[key]
}


function get_key(obj, key){
    return obj[key]
}

let address_book = create_addresse_book(100000);

dump(address_book, "address_book.json");
console.log(get_from_file("address_book.json", "personne 1"));
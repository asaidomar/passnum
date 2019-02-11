'use strict';

// Création d'object 4 méthodes

// 1
let myobj = {};
let mywife = {'name': "nomae", "mobile":"08090809099"};
let sons = {"name": "test son name", "mobile": "06777777"};
myobj.name = "test name";
myobj.phone = "064543562";
myobj.mobile = 64543562;
myobj.address = "Rue de test";
myobj.sons = [];
myobj.sons.push(sons);
myobj.wife = mywife;


myobj.call = function(number){
    return "calling..." +  number
};

//console.log(myobj);
//console.log( myobj.call(myobj.sons[0].mobile) );

let myobj2 = {
 "son.name": "son name",
    name: "test",
};

console.log(myobj2["son.name"]);


// methode 2
let myobj = {
    name: "test name",
    phone: "056567676",
    call: function(){
        return this.phone;
    },
    mobile: ""
};


// methode3
let Myobj4 = function (name, address, mobile) {
    this.address = address;
    this.mobile = mobile;
    this.name = name;
    //return this
};

Myobj4.prototype.call = function () {
    return `Calling.. ${this.mobile}`
};

let person = new Myobj4("test name", "rue test", "06787878")
console.log(person);

//methode 4
class Personne{
    constructor(name, address, mobile){
        this.name = name;
        this.address = address;
        this.mobile = mobile;

    };
}

let p1 = new Personne("test name 1",
    "test address 1", "07878788");

let p2 = new Personne("test name 3",
    "test address 2", "07878789");



class Car{
    constructor(){

    }
}


class Dog{
    constructor(){

    }
}

class Cat{
    constructor(){

    }
}

'use strict';
const events = require('events');
const eventEmitter = new events.EventEmitter();
var i = 0;


function print_test(i) {
  console.log('hello counter value ', i);
}


function print_test2(i) {
    i++;
    console.log('hello counter value ++ ', i);


}

function main(end){
    eventEmitter.on('test', print_test);
    eventEmitter.on('test', print_test2);

    eventEmitter.on('test', function (i) {
        console.log('je suis le handler ano', i)

    });

    eventEmitter.on('test',  (i) => {
        console.log('je suis le handler ano 2', i)

    });

    eventEmitter.on('test',  (i) => {
        console.log('\n\n', i)

    });



    for (;i < end; i++) {
        eventEmitter.emit('test', i);
    }
}
function do_something(){
    ///
}


// main(100);

function caller(callback, param) {
    do_something();
    callback(param)
}

// langage synchrone
function f1(){
    let image;
    return image
}

function f2(image){

}


function f1(callback){
    let image;

}
// impossible en js
let var1 = f1();
let var2 = f2(var1);


//caller(print_test, 12);

// exercice 2

// utilisation de callback
function dispatch(func, callback1, callback2, param_value) {
    if (func === "fct_retour"){
        callback1(param_value)
    }else if (func === "fct_retour1"){
        callback2(param_value)
    }
    
}

function fct_retour1(param_value){
    console.log("je suis la fonction 1 avec valeur de param", param_value)
}


function fct_retour2(param_value){
    console.log("je suis la fonction 2 avec valeur de param", param_value)
}


//dispatch("fct_retour1", fct_retour1, fct_retour2, 10);

dispatch("fct_retour1",
    ()=>{console.log("test")},
    ()=>{console.log("toto")}, 100);

// sans utilisation de callback

function dispatch2(func, param_value) {
    if (func === "fct_retour"){
        fct_retour1(param_value)
    }
    else if (func === "fct_retour1"){
        fct_retour2(param_value)
    }

}


//dispatch2("fct_retour1", 12);
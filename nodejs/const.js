/**
 * Module de definition des contantes de l'application.
 * @type {string}
 */

var alphabet_l =  "abcdefghijklmnopqrstuvwxyz";
var alphabet_U =  "abcdefghijklmnopqrstuvwxyz".toLocaleUpperCase();


module.exports = {
    shift : 1,
    repeat: 1,
    alpha_Array: alphabet_l.split(""),
    alpha_U_Array: alphabet_U.split(""),
    port:1337,
    host:'127.0.0.1'

};


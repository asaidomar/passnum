var personne = {};
personne.phone = "063435677<i>";
personne.name = "TEST NAME <i>";
personne.address = "<1> rue no man land, 13013 Marseille";

var addresses_book = {
    "personne <i>": personne
};


console.log(personne);
var personne_str = JSON.stringify(personne_obj);
//console.log(JSON.stringify(personne, null, 4));


var personne2_str = "{ phone: '063435677', name: 'TEST NAME', address: 'A rue no man land, 13013 Marseille' }";

var personne_obj = JSON.parse(personne2_str);
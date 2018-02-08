const DATABASE="MAGASIN";
const NClient = 10;
const NFacture = 100;
const NProduit = 1000;


function echo_create_db(){
    console.log('CREATE DATABASE ' + DATABASE + ';');
    console.log('use ' + DATABASE + ';');
}

function echo_create_client(){
    console.log('CREATE TABLE Client (code_client INT(10) PRIMARY KEY AUTO_INCREMENT, nom VARCHAR(500));')
}


function echo_create_client_Entreprise_2(){
    console.log('CREATE TABLE Client_Entreprise_2 (code_client INT(10) PRIMARY KEY AUTO_INCREMENT, nom VARCHAR(500));')
}


function echo_create_facture() {
    console.log('CREATE TABLE Facture (num_facture INT(10) PRIMARY KEY AUTO_INCREMENT, montant INT(10), code_client INT(10));')

}


function echo_produit(){
    console.log('CREATE TABLE Produit (code_produit INT(10) PRIMARY KEY AUTO_INCREMENT, lib_produit VARCHAR(500), prix INT(10));')

}

function echo_produit_facture() {
    console.log('CREATE TABLE Facture_produit (code_produit INT(10), num_facture INT(10), quantite INT(10));')

}

function get_array_clients(N){
    var client = [];
    for (var i=0; i<N; i++){
        var rand = Math.floor(Math.random() * 1000);

        if (rand >= 500){

            client.push("Client " + i)
        }else{

            client.push("Client Entreprise_2" + i)
        }
    }

    return client

    //console.log("INSERT INTO Client VALUES ("++")"; )
}


function populate_clients(client_array) {
    for (var i=0; i<client_array.length; i++){
        console.log("INSERT INTO Client_Entreprise_2 (nom) VALUES ( '" + client_array[i] + "');")
    }
}



function populate_facture(N, NClient) {
    for (var i=0; i<N; i++){
        var code_client = Math.floor(Math.random() * NClient) + 1;
        var montant= Math.floor(Math.random() * 1000);
        console.log("INSERT INTO Facture (montant, code_client) VALUES ( " + montant + ","+ code_client + ");")
    }


}



function populate_produit(N){
    for (var i=0; i<N; i++){
        var lib_produit = "Produit_" + i;
        var prix = Math.floor(Math.random() * 1000) + 1;
        console.log("INSERT INTO Produit (lib_produit, prix) VALUES ( '" + lib_produit + "',"+ prix + ");")
    }
}


function populate_facture_produit(N, NBproduit){
    for (var i=0; i<N; i++){
        var NBProduit = Math.floor(Math.random() * 50) + 1; // jusqu'a 50 produit dans un facture

        for (var j=0; j<=NBProduit; j++){
            var quantite = Math.floor(Math.random() * 40) + 1; // jusqu'a 40 foix le même article
            var code_produit = Math.floor(Math.random() * NBproduit) + 1;
            console.log("INSERT INTO Facture_produit(code_produit, num_facture, quantite) VALUES ("+code_produit+", "+i+", "+quantite+");")
        }
    }
}

function main_Entreprise_2(){
    echo_create_client_Entreprise_2();
    var clients = get_array_clients(NClient);
    populate_clients(clients);
}


function main() {
    echo_create_db();
    echo_create_client();
    echo_create_facture();
    echo_produit();
    echo_produit_facture();

    var clients = get_array_clients(NClient);
    populate_clients(clients);


    populate_facture(NFacture, NClient);

    populate_produit(NProduit);

    populate_facture_produit(NFacture, NProduit);




}

//main();

main_Entreprise_2();
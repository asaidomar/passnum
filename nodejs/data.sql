CREATE TABLE Client_Entreprise_2 (code_client INT(10) PRIMARY KEY AUTO_INCREMENT, nom VARCHAR(500));
INSERT INTO Client_Entreprise_2 (nom) VALUES ( 'Client Entreprise_20');
INSERT INTO Client_Entreprise_2 (nom) VALUES ( 'Client Entreprise_21');
INSERT INTO Client_Entreprise_2 (nom) VALUES ( 'Client Entreprise_22');
INSERT INTO Client_Entreprise_2 (nom) VALUES ( 'Client Entreprise_23');
INSERT INTO Client_Entreprise_2 (nom) VALUES ( 'Client Entreprise_24');
INSERT INTO Client_Entreprise_2 (nom) VALUES ( 'Client Entreprise_25');
INSERT INTO Client_Entreprise_2 (nom) VALUES ( 'Client Entreprise_26');
INSERT INTO Client_Entreprise_2 (nom) VALUES ( 'Client Entreprise_27');
INSERT INTO Client_Entreprise_2 (nom) VALUES ( 'Client Entreprise_28');
INSERT INTO Client_Entreprise_2 (nom) VALUES ( 'Client Entreprise_29');





select nom, Facture.num_facture, sum(quantite) as total from Client, Facture, Facture_produit Where Client.code_client = Facture.code_client and Facture.num_facture = Facture_produit.num_facture group by nom, Facture.num_facture;
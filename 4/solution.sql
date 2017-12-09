/*
1	Créer la base de données "Centrale_Marseille"
2	Créer la table Ecole
3	Insérer une ligne dans la table Ecole
4	Créer la table Service
5	Créer la requête sql pour inserer les services
6	Créer la table Batiment
7	Créer la requête sql pour inserer les batiments
8	Créer la Salle
9	Insérer les données du fichier salle.txt
10	Créer la table Promo
11	Insérer les donnes du fichier promo.txt
12	Créer la table Personnel
13	Insérer les données personnel.txt
14	Créer la table Etudiant
15	Insérer les donnes du fichier etudiant.txt
16	Requete pour counter le nombe total d'etudiants
17	Requete pour avoir l'age moyent des etudiants
18	Requete pour lister les élèves de la promo "Passnum 2017"
19	Requete pour counter le nombre d'élèves dans les promo 2017
20	Requete pour counter le nombre d'élèves dans les promo 2016
21	Requete pour counter le nombre d'élèves dans les promo 2015
22	Créer la table Service_has_user
23	Insérer les données service_user.txt dans la table Service_has_user
24	Requete pour lister tout le personnel du service "Informatique"
25	Requete pour compter le nombre de professeur
26	Requete pour afficher les noms et prenoms de professeur de Mathématiques
 */

-- QUESTION 1
-- BDD central_marseille
CREATE DATABASE Central_Marseille;
use Central_Marseille;

-- ## QUESTION 2
/*
Code	Désignation	Type	Taille	Remarque
id_ecole	Code ecole	N	10	Clef primaire
nom_ecole	Nom de l'ecole	A	30	Unique
directeur	Nom complet du directeur	A	30*/

-- table ecole
CREATE TABLE Ecole(
          id_ecole INT(10) PRIMARY KEY,
          nom_ecole VARCHAR (30) UNIQUE,
          nom_directeur VARCHAR (30)
          );

-- ou peut aussi utiliser l'auto increment
CREATE TABLE Ecole(
          id_ecole INT(10) PRIMARY KEY AUTO_INCREMENT,
          nom_ecole VARCHAR (30) UNIQUE,
          nom_directeur VARCHAR (30)
          );

-- enfin in est aussi possible de préciser les contraintes en fin de déclaration de la table
CREATE TABLE Ecole(
          id_ecole INT(10),
          nom_ecole VARCHAR (30) UNIQUE,
          nom_directeur VARCHAR (30),
          PRIMARY KEY (id_ecole));


-- ## QUESTION 3

INSERT INTO Ecole(id_ecole, nom_ecole, nom_directeur)
                  VALUES (1, "Centrale Marseille", "Frédéric Fotiadu");

-- Si utilisation de l'autocremente on est pas obligé de précier id_ecole
INSERT INTO Ecole(nom_ecole, nom_directeur)
            VALUES ( "Centrale Marseille", "Frédéric Fotiadu");


-- QUESTION 4
/* Code	Désignation	Type	Taille	Remarque
 id_ecole	Code ecole	N	10	ref Ecole
 id_service	Code service	N	10	clef primaire
 nom_service	Nom du service	A	30	Unique  */
-- Informatique, Enseignement, Scolarité, Gestion, Direction, RH, Relation Entreprise, Recherche
CREATE TABLE Service(id_ecole INT(10),
                    id_service INT(10) PRIMARY KEY,
                    nom_service VARCHAR (30) UNIQUE ) ;

-- QUESTION 5
INSERT INTO  Service(id_ecole, id_service, nom_service)
            VALUES (1, 1, "Informatique"),
                   (1, 2, "Enseignement"),
                   (1, 3, "Scolarité"),
                   (1, 4, "Gestion"),
                   (1, 5, "Direction"),
                   (1, 6, "RH"),
                   (1, 7, "Relation Entreprise"),
                   (1, 8, "Recherche");

-- QUESTION 6
/*
Code	Désignation	Type	Taille	Remarque
id_ecole	Code ecole	N	10	Ref Ecole
id_batiment	Code du batiment	N	10	clef primaire
nom_batiment	Nom du batiment	A	30
 */
CREATE TABLE Batiment(id_ecole INT(10), id_batiment INT(10), nom_batiment VARCHAR (30));

-- QUESTION 7
-- Pythagore, Euclide, Archimède, Copernic, Galilée, Képler, Descartes, Torricelli, Newton, Laplace

INSERT INTO Batiment(id_ecole, id_batiment, nom_batiment)
            VALUES (1, 1, "Pythagore"),
                   (1, 2, "Euclide"),
                   (1, 3, "Archimède"),
                   (1, 4, "Copernic"),
                   (1, 5, "Galilée"),
                   (1, 6, "Képler"),
                   (1, 7, "Descartes"),
                   (1, 8, "Torricelli"),
                   (1, 9, "Newton"),
                   (1, 10, "Laplace");

-- QUESTION 8
/*
Code	Désignation	Type	Taille	Remarque
id_batiment	Code du batiment	N	10	Ref Batiment
id_salle	Code de la salle	N	10	clef primaire
num_salle	Numéro de la salle	A	30
capacite_salle	Capacite de la salle	N	4
possede_tableau	Possède un tableau	N	1	0 ou 1
possede_retro	Possède un rétro	N	1	0 ou 1
*/

CREATE TABLE Salle(
            id_batiment INT(10),
            id_salle INT(10) PRIMARY KEY,
            num_salle VARCHAR (30),
            capacite_salle INT(4),
            possede_tableau Enum('0', '1'),
            possede_retro Enum('0', '1'));

-- QUESTION 9
LOAD DATA LOCAL INFILE '/Users/alisaidomar/passnum/4/salle.txt' INTO TABLE Salle
            COLUMNS TERMINATED BY "\t"
            LINES TERMINATED BY "\n"
            IGNORE 1 LINES;


/*
Les colonnes sont séparées by "\t" (tabulation) mais elles peuvent l'être par ";" ou plus souvent par ","
*/

-- QUESTION 10
/*
Code	Désignation	Type	Taille	Remarque
id_promo	Code du batiment	N	10	clef primaire
id_ecole	Code de l'ecole	A	10	Ref Ecole
id_responsable	Identifiant du responsable	N	10	Ref Personnel
annee	Année de la rentrée scolaire	N	4
specialite	Nom de la spécialité	A	50
*/

CREATE TABLE Promo(
          id_promo INT(10) PRIMARY KEY,
          id_ecole INT(10),
          id_responsable INT(10),
          annee INT(4),
          specialite VARCHAR (50)
          );
-- QUESTION 11
LOAD DATA LOCAL INFILE 'promo.txt' INTO TABLE Promo
            COLUMNS TERMINATED BY "\t"
            LINES TERMINATED BY "\n"
            IGNORE 1 LINES;


-- QUESTION 12
/*
Code	Désignation	Type	Taille	Remarque
id_personnel	Code du personnel	N	10	clef primaire
id_responsable	Code du responsable	N	10	Ref Personnel
nom	Nom	A	250
prenom	Prénom	A	250
id_secu		N	20
status	Status 	(Vacataire, Interne, Prestataire)
num_banque	Numéro de compte IBAN	A	50
date_entree	Date d'embouche	DATE
date_sortie	Date de fin de contrat / Date de départ	DATE
*/

CREATE TABLE Personnel(
            id_personnel INT(10) PRIMARY KEY,
            id_responsable INT(10),
            nom VARCHAR (250),
            prenom VARCHAR (250),
            id_secu VARCHAR (20),
            status ENUM("Vacataire", "Interne", "Prestataire"),
            num_banque VARCHAR (50),
            date_entree DATE,
            date_sortie DATE) ;

-- QUESTION 13
LOAD DATA LOCAL INFILE 'personnel.txt' INTO TABLE Personnel
            COLUMNS TERMINATED BY "\t"
            LINES TERMINATED BY "\n"
            IGNORE 1 LINES;


-- QUESTION 14
/*
Code	Désignation	Type	Taille	Remarque
id_etudiant	Code du personnel	N	10	Clef Primaire
id_promo	Code de promo	N	10	Ref Promo
nom		A	250
prenom		A	250
id_secu		N	20
num_banque	Numéro de compte IBAN	A	50
*/

CREATE TABLE Etudiant(
            id_etudiant INT(10) PRIMARY KEY,
            id_promo INT(10),
            nom VARCHAR (250),
            prenom VARCHAR (250),
            id_secu INT(20),
            num_banque VARCHAR (50),
            age INT(2)
            );

-- QUESTION 15
LOAD DATA LOCAL INFILE 'etudiant.txt' INTO TABLE Etudiant
            COLUMNS TERMINATED BY "\t"
            LINES TERMINATED BY "\n"
            IGNORE 1 LINES;

-- QUESTION 16
SELECT COUNT(id_etudiant) from Etudiant;

-- QUESTION 17
SELECT AVG(age) from Etudiant;

-- QUESTION 18

select Etudiant.nom, Etudiant.prenom from Etudiant, Promo
  WHERE Etudiant.id_promo = Promo.id_promo
    AND Promo.annee = "2017"
    AND Promo.specialite = "Passnum";

-- QUESTION 19

select Etudiant.nom, Etudiant.prenom from Etudiant, Promo
  WHERE Etudiant.id_promo = Promo.id_promo
    AND Promo.annee = "2017";


-- QUESTION 20
select Etudiant.nom, Etudiant.prenom from Etudiant, Promo
  WHERE Etudiant.id_promo = Promo.id_promo
    AND Promo.annee = "2016";

-- QUESTION 21
select Etudiant.nom, Etudiant.prenom from Etudiant, Promo
  WHERE Etudiant.id_promo = Promo.id_promo
    AND Promo.annee = "2015";


-- QUESTION 22
/*
Code	Désignation	Type	Taille	Remarque
id_personnel	Code ecole	N	10	Ref Personnel
id_service	Code service	N	10	Ref Service
role	Role dans le service	A	30
 */

CREATE TABLE Service_has_user( id_personnel INT(10),
            id_service INT(10),
            role VARCHAR (30),
            PRIMARY KEY(id_personnel, id_service, role)
            );

-- la clef la primaire est composée de la composition de 3 colonnes, ce qui empeche d'avoir une meme personne dans un meme service avec le meme role

-- QUESTION 23
LOAD DATA LOCAL INFILE 'service_user.txt' INTO TABLE Service_has_user
            COLUMNS TERMINATED BY "\t"
            LINES TERMINATED BY "\n"
            IGNORE 1 LINES;

-- QUESTION 24
select Personnel.nom, Personnel.prenom, Service_has_user.role from Personnel, Service, Service_has_user
           WHERE Personnel.id_personnel = Service_has_user.id_personnel
           AND Service.id_service = Service_has_user.id_service
           AND Service.nom_service = "Informatique";


-- On passe par une table intermédiare Service_has_user qui permet de faire la liaison entre la table personnel et la table service

-- QUESTION 25
select COUNT(Personnel.id_personnel) from Personnel, Service, Service_has_user
           WHERE Personnel.id_personnel = Service_has_user.id_personnel
           AND Service.id_service = Service_has_user.id_service
           AND Service_has_user.role like "Professeur%";


-- QUESTION 26
select Personnel.nom, Personnel.prenom, Service_has_user.role from Personnel, Service, Service_has_user
           WHERE Personnel.id_personnel = Service_has_user.id_personnel
           AND Service.id_service = Service_has_user.id_service
           AND Service_has_user.role like "Professeur Mathematiques";

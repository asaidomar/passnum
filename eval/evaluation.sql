CREATE DATABASE Location_Totem;
USE Location_Totem;

-- EXERCICE 1

CREATE TABLE Client
(
  Client_id VARCHAR(50) PRIMARY KEY,
  Nom VARCHAR(250),
  Prenom VARCHAR(250),
  CodePostal INTEGER,
  Ville VARCHAR(100),
  Nom_Voie VARCHAR(100),
  Num_Voie VARCHAR(4),
  Type_Voie VARCHAR(20),
  Num_Banque VARCHAR(34),
  Date_Acc DATE
);

CREATE TABLE Vehicule
(
  Vehicule_id VARCHAR(20) PRIMARY KEY,
  Immatriculation VARCHAR(20) UNIQUE,
  Date_mise_en_service DATE,
  Etat INTEGER(1)
);

CREATE TABLE Location_2019
(
  Location_id INTEGER PRIMARY KEY AUTO_INCREMENT,
  Vehicule_id VARCHAR(20),
  Client_id VARCHAR(50),
  Date_de_debut DATE,
  Date_de_fin DATE
);


CREATE TABLE Location_2018
(
  Location_id INTEGER PRIMARY KEY AUTO_INCREMENT,
  Vehicule_id VARCHAR(20),
  Client_id VARCHAR(50),
  Date_de_debut DATE,
  Date_de_fin DATE
);


-- EXERCICE 2
-- 1
USE Location_Totem

-- 2
SELECT * FROM Client;

-- 3
SELECT * FROM Vehicule;

-- 4
SELECT Nom, Prenom FROM Client ORDER BY Nom DESC ;

-- 5
SELECT * FROM Client WHERE Ville = "Marseille";


--  EXERCICE 3
-- 1
INSERT INTO Client
VALUES (1, 'test_nom', 'test_prenom', 13007, 'Marseille', 'Endoume', '128',
        'Rue', 'FR300063303005303563360', '2017-01-01')



-- 2
-- connection à la console mysql
-- mysql -u root -p"root"
-- source sur le chemin complet du script sql
-- >> (mariadb) source /home/user/eval/customer.sql

-- 3
LOAD DATA LOCAL INFILE "/Users/alisaidomar/passnum/nodejs/vehicue.txt" INTO TABLE
  ACTEUR COLUMNS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"' LINES TERMINATED BY '\n';


-- EXERCICE 4
-- 1
SELECT count(Location_id)
from Location_2018,
     Client
WHERE Location_2018.Client_id = Client.Client_id
  AND Client.Client_id = 1;


SELECT count(Location_id)
from Location_2019,
     Client
WHERE Location_2019.Client_id = Client.Client_id
  AND Client.Client_id = 1;


-- 2
-- Utilisation du distinct
SELECT DISTINCT Vehicule_id
from Location_2019,
     Client
WHERE Location_2019.Client_id = Client.Client_id
  AND Client.Client_id = 1;

SELECT DISTINCT Vehicule_id
from Location_2018,
     Client
WHERE Location_2018.Client_id = Client.Client_id
  AND Client.Client_id = 1;


-- Utilisation du group by

SELECT Vehicule_id
from Location_2019,
     Client
WHERE Location_2019.Client_id = Client.Client_id
  AND Client.Client_id = 1
GROUP BY Vehicule_id;

SELECT  Vehicule_id
from Location_2018,
     Client
WHERE Location_2018.Client_id = Client.Client_id
  AND Client.Client_id = 1
GROUP BY Vehicule_id;

-- 3
SELECT HOUR(Date_de_fin - Date_de_debut) as heures_location
FROM Location_2019,
     Client
WHERE Location_2019.Client_id = Client.Client_id
  AND Client.Client_id = 1;

SELECT HOUR(Date_de_fin - Date_de_debut) as heures_location
FROM Location_2018,
     Client
WHERE Location_2018.Client_id = Client.Client_id
  AND Client.Client_id = 1;


-- 4
SELECT SUM(HOUR(Date_de_fin - Date_de_debut)) as heures_location_tot
FROM Location_2019,
     Client
WHERE Location_2019.Client_id = Client.Client_id
GROUP BY Client.Client_id
ORDER BY heures_location_tot DESC
LIMIT 10;

SELECT SUM(HOUR(Date_de_fin - Date_de_debut)) as heures_location_tot
FROM Location_2018,
     Client
WHERE Location_2018.Client_id = Client.Client_id
GROUP BY Client.Client_id
ORDER BY heures_location_tot DESC
LIMIT 10;

-- 5
SELECT COUNT(Location_2019.Location_id) as nb_location
FROM Location_2019,
     Client
WHERE Location_2019.Client_id = Client.Client_id
GROUP BY Client.Client_id
ORDER BY nb_location DESC
LIMIT 10;

SELECT COUNT(Location_2018.Location_id) as nb_location
FROM Location_2018,
     Client
WHERE Location_2018.Client_id = Client.Client_id
GROUP BY Client.Client_id
ORDER BY nb_location DESC
LIMIT 10;


-- EXERCICE 5
SELECT * FROM Location_2018 UNION SELECT * FROM Location_2019;

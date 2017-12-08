
-- creation de la base de données
CREATE DATABASE STATS;

-- obligatoire pour dire sur quelle base nous allons opérer
USE STATS;

-- CAS PRATIQUE 1 --

CREATE TABLE dpt2015 (sexe INT(1), preusuel VARCHAR(20), annais INT(4), dpt INT(3), nombre MEDIUMINT);

LOAD DATA LOCAL INFILE "dpt2015.txt" INTO TABLE dpt2015 COLUMNS TERMINATED BY '\t' OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"' LINES TERMINATED BY '\n' IGNORE 1 LINES;

SELECT preusuel, sum(nombre) as sum_used from dpt2015 where annais >= 1960 group by preusuel order by sum_used desc limit 10;

select preusuel, annais, sum(nombre) as sum_used from dpt2015 where dpt = 13  group by preusuel, annais order by annais, sum_used desc LIMIT 10;



-- CAS PRATIQUE 2 --

-- création de la table DEP_2014
CREATE TABLE DEP_2014 (
  region         INT(3),
  departement    INT(3),
  libdepartement CHAR,
  h04            MEDIUMINT,
  f04            MEDIUMINT,
  h59            MEDIUMINT,
  f59            MEDIUMINT,
  h1014          MEDIUMINT,
  f1014          MEDIUMINT,
  h1519          MEDIUMINT,
  f1519          MEDIUMINT,
  h2014          MEDIUMINT,
  f2014          MEDIUMINT,
  h2529          MEDIUMINT,
  f2529          MEDIUMINT,
  h3034          MEDIUMINT,
  f3034          MEDIUMINT,
  h3539          MEDIUMINT,
  f3539          MEDIUMINT,
  h4044          MEDIUMINT,
  f4044          MEDIUMINT,
  h4549          MEDIUMINT,
  f4549          MEDIUMINT,
  h5054          MEDIUMINT,
  f5054          MEDIUMINT,
  h5559          MEDIUMINT,
  f5559          MEDIUMINT,
  h6064          MEDIUMINT,
  f6064          MEDIUMINT,
  h6569          MEDIUMINT,
  f6569          MEDIUMINT,
  h7074          MEDIUMINT,
  f7074          MEDIUMINT,
  h7579          MEDIUMINT,
  f7579          MEDIUMINT,
  h8084          MEDIUMINT,
  f8084          MEDIUMINT,
  h8589          MEDIUMINT,
  f8589          MEDIUMINT,
  h9094          MEDIUMINT,
  f9094          MEDIUMINT,
  h9599          MEDIUMINT,
  f9599          MEDIUMINT
);

-- chargement des données issues du fichier DEP2.csv
LOAD DATA LOCAL INFILE "DEP2.csv" INTO TABLE DEP_2014 COLUMNS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"' LINES TERMINATED BY '\n' IGNORE 1 LINES;

-- affichage des departements avec le plus haut ratio des 5-9 ans (garçons et filles)
SELECT
  departement,
  (h59 + f59) / (
    h04 + f04 + h59 + f59 + h1014 + f1014 + h1519 + f1519 + h2014 + f2014 + h2529 + f2529 + h3034 + f3034 + h3539 +
    f3539 + h4044 + f4044 + h4549 + f4549 + h5054 + f5054 + h5559 + f5559 + h6064 + f6064 + h6569 + f6569 + h7074 +
    f7074 + h7579 + f7579 + h8084 + f8084 + h8589 + f8589 + h9094 + f9094 + h9599 + f9599) * 100  AS R
FROM DEP_2014
ORDER BY R DESC
LIMIT 10;

-- creation table
CREATE TABLE COM_2014 (
  region      INT(3),
  departement INT(3),
  libville    VARCHAR(50),
  h04         MEDIUMINT,
  f04         MEDIUMINT,
  h59         MEDIUMINT,
  f59         MEDIUMINT,
  h1014       MEDIUMINT,
  f1014       MEDIUMINT,
  h1519       MEDIUMINT,
  f1519       MEDIUMINT,
  h2014       MEDIUMINT,
  f2014       MEDIUMINT,
  h2529       MEDIUMINT,
  f2529       MEDIUMINT,
  h3034       MEDIUMINT,
  f3034       MEDIUMINT,
  h3539       MEDIUMINT,
  f3539       MEDIUMINT,
  h4044       MEDIUMINT,
  f4044       MEDIUMINT,
  h4549       MEDIUMINT,
  f4549       MEDIUMINT,
  h5054       MEDIUMINT,
  f5054       MEDIUMINT,
  h5559       MEDIUMINT,
  f5559       MEDIUMINT,
  h6064       MEDIUMINT,
  f6064       MEDIUMINT,
  h6569       MEDIUMINT,
  f6569       MEDIUMINT,
  h7074       MEDIUMINT,
  f7074       MEDIUMINT,
  h7579       MEDIUMINT,
  f7579       MEDIUMINT,
  h8084       MEDIUMINT,
  f8084       MEDIUMINT,
  h8589       MEDIUMINT,
  f8589       MEDIUMINT,
  h9094       MEDIUMINT,
  f9094       MEDIUMINT,
  h9599       MEDIUMINT,
  f9599       MEDIUMINT
);

-- chargement données
LOAD DATA LOCAL INFILE "COM2.csv" INTO TABLE COM_2014 COLUMNS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"' LINES TERMINATED BY '\n' IGNORE 1 LINES;


-- affichage des villes de > 10000 habitants plus fort ratio des 5-9 ans
SELECT
  TMP_COM.departement,
  TMP_COM.libville,
  TMP_COM.count_59,
  TMP_COM.TOTAL,
  TMP_COM.count_59 / TMP_COM.TOTAL AS R
FROM (SELECT
        departement,
        libville,
        (h59 + f59)                                                                             AS count_59,
        (h04 + f04 + h59 + f59 + h1014 + f1014 + h1519 + f1519 + h2014 + f2014 + h2529 + f2529 + h3034 + f3034 + h3539 +
         f3539 + h4044 + f4044 + h4549 + f4549 + h5054 + f5054 + h5559 + f5559 + h6064 + f6064 + h6569 + f6569 + h7074 +
         f7074 + h7579 + f7579 + h8084 + f8084 + h8589 + f8589 + h9094 + f9094 + h9599 + f9599) AS TOTAL
      FROM COM_2014) AS TMP_COM
WHERE TOTAL > 10000
ORDER BY R DESC
LIMIT 10;




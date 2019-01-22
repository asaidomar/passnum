-- On considère le Schéma de la base de données CINEMA:
-- • FILM (NUMF,TITRE, GENRE, ANNEE, DUREE, BUDGET, REALISATEUR, SALAIRE REAL)
-- • DISTRIBUTION (NUMF, NUMA, ROLE, SALAIRE)
-- • PERSONNE (NUMP, PRENOM, NOM, DATENAIS)
-- • ACTEUR (NUMA, AGENT, SPECIALITE, TAILLE, POIDS)
--
-- L’attribut REALISATEUR de la relation FILM est l’identifiant d’une PERSONNE. Il en est de même pour les attributs NUMA et AGENT de la relation ACTEUR. Donner les requêtes SQL permettant de répondre aux questions suivantes.
--
--
-- 1. Retrouver la liste de tous les films.
-- 2. Retrouver la liste des films dont la longueur dépasse 180 min.
-- 3. Donner la liste de tous les genres de film.
-- 4. Donner le nombre de films par genre.
-- 5. Trouver le/les titre(s) et l’/les année(s) du/des film(s) le(s) plus long(s).
-- 6. Trouver tous les ”couples d’acteurs”, i.e., les acteurs ayant jouées le ”Premier” rôle dans un même film (sans doublons).
-- 7. Trouver le nom des personnes qui ne sont ni agents, ni acteurs et ni réalisateurs.
-- 8. Donner le nom et le prénom des réalisateurs qui ont jouée dans au moins un de leurs propres films
-- 9. Quel est le total des salaires des acteurs du film “Nuits blanches à Seattle”.
-- 10. Pour chaque film de Spielberg (titre, année), donner le total des salaires des acteurs.


CREATE DATABASE IF NOT EXISTS  CINEMA;

USE CINEMA;


CREATE TABLE IF NOT EXISTS FILM
(
  NUMF         INTEGER PRIMARY KEY AUTO_INCREMENT,
  TITRE        VARCHAR(255),
  GENRE        VARCHAR(255),
  ANNEE        INTEGER,
  DUREE        INTEGER,
  BUDGET       INTEGER,
  REALISATEUR  INTEGER,
  SALAIRE_REAL INTEGER
);

-- DISTRIBUTION (NUMF, NUMA, ROLE, SALAIRE)
CREATE TABLE IF NOT EXISTS DISTRIBUTION
(
  NUMF    INTEGER,
  NUMA    INTEGER,
  ROLE    VARCHAR(255),
  SALAIRE INTEGER
);

-- • PERSONNE (NUMP, PRENOM, NOM, DATENAIS)
DROP TABLE PERSONNE;
CREATE TABLE IF NOT EXISTS PERSONNE
(
  NUMP     INTEGER PRIMARY KEY AUTO_INCREMENT,
  PRENOM   VARCHAR(255),
  NOM      VARCHAR(255),
  -- DATENAIS DATE
  DATENAIS YEAR
);


--• ACTEUR (NUMA, AGENT, SPECIALITE, TAILLE, POIDS)
CREATE TABLE IF NOT EXISTS ACTEUR
(
  NUMA       INTEGER PRIMARY KEY AUTO_INCREMENT,
  AGENT      INTEGER,
  SPECIALITE VARCHAR(255),
  TAILLE     INTEGER,
  POIDS      INTEGER
);


-- 1. Retrouver la liste de tous les films.
SELECT * from FILM;

-- 2. Retrouver la liste des films dont la longueur dépasse 180 min.
SELECT  * FROM FILM WHERE DUREE > 160;


-- 3. Donner la liste de tous les genres de film.
SELECT GENRE FROM FILM GROUP BY GENRE;
SELECT DISTINCT GENRE from FILM;

-- 3b

SELECT DISTINCT GENRE FROM FILM;

-- 4. Donner le nombre de films par genre.
select CONTAGE.nombre_par_genre
FROM (SELECT M.GENRE, COUNT(NUMF) nombre_par_genre
      FROM FILM M
      GROUP BY GENRE
      ORDER BY
        GENRE) AS CONTAGE
WHERE CONTAGE.nombre_par_genre > 100;

--
select MAX(DUREE) FROM FILM;

-- 5. Trouver le/les titre(s) et l’/les année(s) du/des film(s) le(s) plus long(s).
SELECT TITRE FROM FILM WHERE DUREE



-- 6. Trouver tous les ”couples d’acteurs”, i.e., les acteurs ayant jouées le ”Premier” rôle dans un même film (sans doublons).
SELECT PERSONNE.NOM, PERSONNE.PRENOM, FILM.TITRE
FROM DISTRIBUTION,
     PERSONNE,
     FILM
WHERE DISTRIBUTION.NUMA = PERSONNE.NUMP
  AND FILM.NUMF = DISTRIBUTION.NUMF
  AND DISTRIBUTION.ROLE = 'Premier'
GROUP BY PERSONNE.NOM, PERSONNE.PRENOM,  FILM.TITRE;
HAVING COUNT( DISTINCT PERSONNE.NOM,PERSONNE.PRENOM) = 2;


-- 7. Trouver le nom des personnes qui ne sont ni agents, ni acteurs et ni réalisateurs.
SELECT NOM
FROM PERSONNE,
     ACTEUR
WHERE PERSONNE.NUMP NOT IN (SELECT AGENT
                            FROM ACTEUR
                            UNION
                            SELECT NUMA
                            FROM ACTEUR
                            UNION
                            SELECT REALISATEUR
                            FROM FILM);

-- 8. Donner le nom et le prénom des réalisateurs qui ont jouée dans au moins un de leurs propres films
SELECT NOM, PRENOM
FROM PERSONNE,
     FILM,
     DISTRIBUTION
WHERE FILM.REALISATEUR = DISTRIBUTION.NUMA
  AND DISTRIBUTION.NUMA = PERSONNE.NUMP;

-- 9. Quel est le total des salaires des acteurs du film “Nuits blanches à Seattle”.
SELECT SUM(SALAIRE) FROM DISTRIBUTION, FILM WHERE DISTRIBUTION.NUMF = FILM.NUMF AND FILM.TITRE = 'Nuits blanches à Seattle'


-- 10. Pour chaque film de Spielberg (titre, année), donner le total des salaires des acteurs.
SELECT FILM.TITRE, FILM.ANNEE, SUM(SALAIRE)
FROM DISTRIBUTION,
     FILM,
     PERSONNE
WHERE PERSONNE.NUMP = FILM.REALISATEUR
  AND FILM.NUMF = DISTRIBUTION.NUMF
  AND PERSONNE.NOM = 'Spielberg'
GROUP BY DISTRIBUTION.NUMF

TRUNCATE FILM;

LOAD DATA LOCAL INFILE "/Users/alisaidomar/passnum/nodejs/film.txt" INTO TABLE
  FILM COLUMNS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"' LINES TERMINATED BY '\n' IGNORE 1 LINES;


LOAD DATA LOCAL INFILE "/Users/alisaidomar/passnum/nodejs/personnes.txt" INTO TABLE
  PERSONNE COLUMNS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"' LINES TERMINATED BY '\n';


LOAD DATA LOCAL INFILE "/Users/alisaidomar/passnum/nodejs/actors.txt" INTO TABLE
  ACTEUR COLUMNS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"' LINES TERMINATED BY '\n';

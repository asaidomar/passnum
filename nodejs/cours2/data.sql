CREATE DATABASE NODE_APP;

USE NODE_APP;
CREATE TABLE IF NOT EXISTS User ( id INTEGER PRIMARY KEY AUTO_INCREMENT,
                  prenom VARCHAR(100),
                  nom VARCHAR(100),
                  email VARCHAR(100) UNIQUE ,
                  tel VARCHAR(100),
                  mdp VARCHAR(100)
 );

DROP TABLE Connection;
CREATE TABLE  IF NOT EXISTS Connection(email VARCHAR(100), connection_date VARCHAR(100));
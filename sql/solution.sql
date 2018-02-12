CREATE TABLE Client
  (
     Code_Client INT(10) PRIMARY KEY,
     Nom         VARCHAR(250),
     Prenom      VARCHAR(250),
     Code_Postal INT(5),
     Ville       VARCHAR(100),
     Nom_Voie    VARCHAR(100),
     Type_Voie   VARCHAR(20),
     Num_Banque  VARCHAR(34),
     Date_Acc    DATE,
     Date_Sortie DATE,
     Entreprise  TINYINT(1),
     Particulier TINYINT(1)
  );
CREATE TABLE Client_Archive
  (
     Code_Client INT(10) PRIMARY KEY,
     Nom         VARCHAR(250),
     Prenom      VARCHAR(250),
     Code_Postal INT(5),
     Ville       VARCHAR(100),
     Nom_Voie    VARCHAR(100),
     Type_Voie   VARCHAR(20),
     Num_Banque  VARCHAR(34),
     Date_Acc    DATE,
     Date_Sortie DATE,
     Entreprise  TINYINT(1),
     Particulier TINYINT(1)
  );
CREATE TABLE Facture
  (
     Num_Facture   VARCHAR(30) PRIMARY KEY,
     Code_Client   VARCHAR(10),
     Montant_HT    DECIMAL(10, 1),
     Montant_TVA   DECIMAL(2, 1),
     Date_Facture  DATE,
     Paye          DECIMAL(10, 1),
     Reste_A_Payer DECIMAL(10, 1),
     Type_Paiement SET("cheque", "virement", "cb", "autre")
  );
CREATE TABLE Produit
  (
     Code_Produit VARCHAR(30) PRIMARY KEY,
     Lib_Produit  VARCHAR(30) UNIQUE,
     Montant_U_HT DECIMAL(10, 1),
     Description  TEXT
  );
CREATE TABLE Produit_In_Stock
  (
     Code_Produit VARCHAR(30),
     Quantite     INT(5),
     Date_Stock   DATETIME
   );
CREATE TABLE Facture_Produit
  (
     Code_Produit VARCHAR(30),
     Num_Facture  VARCHAR(30),
     Quantite     INT(5)
   );
   
INSERT INTO Produit VALUES ("978-0-596-00173-5", "Expert BDD", 30, "Devenir export en MySQL"), ("978-0-596-00173-4", "Expert Git", 27, "Devenir expert GIT"), ("978-0-596-00173-9", "Export Node", 32, "Devenir Export NodeJs");




SELECT SUM(Montant_HT)
FROM Facture
WHERE Date_Facture
BETWEEN
  DATE_SUB(CURDATE(), INTERVAL 365 DAY)
AND
  CURDATE();


-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le :  mar. 27 nov. 2018 à 09:42
-- Version du serveur :  10.1.36-MariaDB
-- Version de PHP :  7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `Annuaire`
--

-- --------------------------------------------------------

--
-- Structure de la table `Batiment`
--

CREATE TABLE `Batiment` (
  `id_ecole` int(10) NOT NULL,
  `id_batiment` int(10) NOT NULL,
  `nom_batiment` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Cours`
--

CREATE TABLE `Cours` (
  `id_cours` int(10) NOT NULL,
  `id_salle` int(10) NOT NULL,
  `id_professeur` int(10) NOT NULL,
  `nom` varchar(250) NOT NULL,
  `date` datetime NOT NULL,
  `duree` time NOT NULL,
  `matiere` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Ecole`
--

CREATE TABLE `Ecole` (
  `id_ecole` int(10) NOT NULL,
  `nom_ecole` varchar(30) NOT NULL,
  `directeur` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Etudiant`
--

CREATE TABLE `Etudiant` (
  `id_etudiant` int(10) NOT NULL,
  `id_promo` int(10) NOT NULL,
  `nom` varchar(250) NOT NULL,
  `prenom` varchar(250) NOT NULL,
  `id_secu` int(20) NOT NULL,
  `num_banque` varchar(50) NOT NULL,
  `age` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Personnel`
--

CREATE TABLE `Personnel` (
  `id_personnel` int(10) NOT NULL,
  `id_responsable` int(10) NULL,
  `nom` varchar(250) NOT NULL,
  `prenom` varchar(250) NOT NULL,
  `id_secu` int(20) NOT NULL,
  `status` enum('Vacataire','Interne','Prestataire') NOT NULL,
  `num_banque` varchar(50) NOT NULL,
  `date_entree` date NOT NULL,
  `date_sortie` date NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Promo`
--

CREATE TABLE `Promo` (
  `id_promo` int(10) NOT NULL,
  `id_ecole` int(10) NOT NULL,
  `id_responsable` int(10) NOT NULL,
  `annee` int(4) NOT NULL,
  `specialite` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Salle`
--

CREATE TABLE `Salle` (
  `id_batiment` int(10) NOT NULL,
  `id_salle` int(10) NOT NULL,
  `num_salle` varchar(30) NOT NULL,
  `capacite_salle` int(4) NOT NULL,
  `possede_tableau` enum('0','1') NOT NULL,
  `possede_retro` enum('0','1') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Service`
--

CREATE TABLE `Service` (
  `id_ecole` int(10) NOT NULL,
  `id_service` int(10) NOT NULL,
  `nom_service` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Service_has_user`
--

CREATE TABLE `Service_has_user` (
  `id_personnel` int(10) NOT NULL,
  `id_service` int(10) NOT NULL,
  `role` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Batiment`
--
ALTER TABLE `Batiment`
  ADD PRIMARY KEY (`id_batiment`),
  ADD KEY `id_ecole` (`id_ecole`);

--
-- Index pour la table `Cours`
--
ALTER TABLE `Cours`
  ADD PRIMARY KEY (`id_cours`);

--
-- Index pour la table `Ecole`
--
ALTER TABLE `Ecole`
  ADD PRIMARY KEY (`id_ecole`),
  ADD UNIQUE KEY `nom_ecole` (`nom_ecole`);

--
-- Index pour la table `Etudiant`
--
ALTER TABLE `Etudiant`
  ADD PRIMARY KEY (`id_etudiant`),
  ADD KEY `id_promo` (`id_promo`);

--
-- Index pour la table `Personnel`
--
ALTER TABLE `Personnel`
  ADD PRIMARY KEY (`id_personnel`),
  ADD KEY `id_responsable` (`id_responsable`);

--
-- Index pour la table `Promo`
--
ALTER TABLE `Promo`
  ADD PRIMARY KEY (`id_promo`),
  ADD KEY `id_ecole` (`id_ecole`),
  ADD KEY `id_responsable` (`id_responsable`);

--
-- Index pour la table `Salle`
--
ALTER TABLE `Salle`
  ADD PRIMARY KEY (`id_salle`),
  ADD KEY `id_batiment` (`id_batiment`);

--
-- Index pour la table `Service`
--
ALTER TABLE `Service`
  ADD PRIMARY KEY (`id_service`),
  ADD UNIQUE KEY `nom_service` (`nom_service`),
  ADD KEY `id_ecole` (`id_ecole`);

--
-- Index pour la table `Service_has_user`
--
ALTER TABLE `Service_has_user`
  ADD KEY `id_service` (`id_service`),
  ADD KEY `id_personnel` (`id_personnel`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Batiment`
--
ALTER TABLE `Batiment`
  ADD CONSTRAINT `Batiment_ibfk_1` FOREIGN KEY (`id_ecole`) REFERENCES `Ecole` (`id_ecole`);

--
-- Contraintes pour la table `Etudiant`
--
ALTER TABLE `Etudiant`
  ADD CONSTRAINT `Etudiant_ibfk_1` FOREIGN KEY (`id_promo`) REFERENCES `Promo` (`id_promo`);

--
-- Contraintes pour la table `Personnel`
--
ALTER TABLE `Personnel`
  ADD CONSTRAINT `Personnel_ibfk_1` FOREIGN KEY (`id_responsable`) REFERENCES `Personnel` (`id_personnel`);

--
-- Contraintes pour la table `Promo`
--
ALTER TABLE `Promo`
  ADD CONSTRAINT `Promo_ibfk_1` FOREIGN KEY (`id_ecole`) REFERENCES `Ecole` (`id_ecole`);

--
-- Contraintes pour la table `Salle`
--
ALTER TABLE `Salle`
  ADD CONSTRAINT `Salle_ibfk_1` FOREIGN KEY (`id_batiment`) REFERENCES `Batiment` (`id_batiment`);

--
-- Contraintes pour la table `Service`
--
ALTER TABLE `Service`
  ADD CONSTRAINT `Service_ibfk_1` FOREIGN KEY (`id_ecole`) REFERENCES `Ecole` (`id_ecole`);

--
-- Contraintes pour la table `Service_has_user`
--
ALTER TABLE `Service_has_user`
  ADD CONSTRAINT `Service_has_user_ibfk_1` FOREIGN KEY (`id_service`) REFERENCES `Service` (`id_service`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

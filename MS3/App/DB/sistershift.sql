-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Erstellungszeit: 06. Jan 2019 um 20:20
-- Server-Version: 5.6.34-log
-- PHP-Version: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `sistershift`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `abwesenheitsmeldung`
--

CREATE TABLE `abwesenheitsmeldung` (
  `stationID` int(11) NOT NULL,
  `MitarbeiterID` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `datumBeginn` date NOT NULL,
  `datumEnde` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `dienstplan`
--

CREATE TABLE `dienstplan` (
  `stationID` int(9) NOT NULL,
  `id` int(9) NOT NULL,
  `monat` int(10) NOT NULL,
  `jahr` int(10) NOT NULL,
  `tag1` int(9) DEFAULT NULL,
  `tag2` int(9) DEFAULT NULL,
  `tag3` int(9) DEFAULT NULL,
  `tag4` int(9) DEFAULT NULL,
  `tag5` int(9) DEFAULT NULL,
  `tag6` int(9) DEFAULT NULL,
  `tag7` int(9) DEFAULT NULL,
  `tag8` int(9) DEFAULT NULL,
  `tag9` int(9) DEFAULT NULL,
  `tag10` int(9) DEFAULT NULL,
  `tag11` int(9) DEFAULT NULL,
  `tag12` int(9) DEFAULT NULL,
  `tag13` int(9) DEFAULT NULL,
  `tag14` int(9) DEFAULT NULL,
  `tag15` int(9) DEFAULT NULL,
  `tag16` int(9) DEFAULT NULL,
  `tag17` int(9) DEFAULT NULL,
  `tag18` int(9) DEFAULT NULL,
  `tag19` int(9) DEFAULT NULL,
  `tag20` int(9) DEFAULT NULL,
  `tag21` int(9) DEFAULT NULL,
  `tag22` int(9) DEFAULT NULL,
  `tag23` int(9) DEFAULT NULL,
  `tag24` int(9) DEFAULT NULL,
  `tag25` int(9) DEFAULT NULL,
  `tag26` int(9) DEFAULT NULL,
  `tag27` int(9) DEFAULT NULL,
  `tag28` int(9) DEFAULT NULL,
  `tag29` int(9) DEFAULT NULL,
  `tag30` int(9) DEFAULT NULL,
  `tag31` int(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ersatzanfrage`
--

CREATE TABLE `ersatzanfrage` (
  `stationID` int(10) NOT NULL,
  `mitarbeiterID` int(10) NOT NULL,
  `abwesenheitsmeldungID` int(10) NOT NULL,
  `datumÜbernahme` date NOT NULL,
  `schichtArt` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ersatzeintragung`
--

CREATE TABLE `ersatzeintragung` (
  `stationID` int(10) NOT NULL,
  `mitarbeiterID` int(10) NOT NULL,
  `abwesenheitsmeldungID` int(10) NOT NULL,
  `datumÜbernahme` date NOT NULL,
  `schichtArt` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `mitarbeiter`
--

CREATE TABLE `mitarbeiter` (
  `id` int(10) NOT NULL,
  `stationID` int(10) NOT NULL,
  `anrede` varchar(10) NOT NULL,
  `vorname` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `beschaeftigungsArt` varchar(30) NOT NULL,
  `beschaeftigungsBeginn` varchar(15) NOT NULL,
  `rolle` varchar(30) NOT NULL,
  `wunschRating` int(10) NOT NULL,
  `dienstplanRating` int(10) NOT NULL,
  `ueberstunden` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `mitarbeiter`
--

INSERT INTO `mitarbeiter` (`id`, `stationID`, `anrede`, `vorname`, `name`, `beschaeftigungsArt`, `beschaeftigungsBeginn`, `rolle`, `wunschRating`, `dienstplanRating`, `ueberstunden`) VALUES
(16, 1, 'Herr', 'Max', 'Mustermann', 'Teilzeit', '2018-12-13', 'Arzt', 2, 2, 24),
(17, 1, 'Herr', 'Manfred', 'Mustermann', 'Teilzeit', '2018-12-13', 'Arzt', 0, 3, 0),
(18, 1, 'Frau', 'Marta', 'Mustermann', 'VOLL', '2018-12-13', 'Krankenpfleger', 0, 0, 0),
(19, 1, 'Frau', 'a', 'Mustermann', 'VOLL', '2018-12-13', 'Krankenpfleger', 0, 0, 0),
(20, 1, 'Frau', 'b', 'Mustermann', 'VOLL', '2018-12-13', 'Krankenpfleger', 0, 0, 0),
(21, 1, 'Frau', 'c', 'Mustermann', 'VOLL', '2018-12-13', 'Krankenpfleger', 0, 0, 0),
(22, 1, 'Frau', 'd', 'Mustermann', 'VOLL', '2018-12-13', 'Krankenpfleger', 0, 0, 0),
(23, 1, 'Frau', '8', 'Mustermann', 'VOLL', '2018-12-13', 'Krankenpfleger', 0, 0, 0),
(24, 1, 'Frau', '9', 'Mustermann', 'VOLL', '2018-12-13', 'Krankenpfleger', 0, 0, 0),
(25, 1, 'Frau', '10', 'Mustermann', 'VOLL', '2018-12-13', 'Krankenpfleger', 0, 0, 0),
(26, 1, 'Frau', '11', 'Mustermann', 'VOLL', '2018-12-13', 'Krankenpfleger', 0, 0, 0),
(27, 1, 'Frau', '12', 'Mustermann', 'VOLL', '2018-12-13', 'Krankenpfleger', 0, 0, 0),
(28, 1, 'Frau', '13', 'Mustermann', 'VOLL', '2018-12-13', 'Krankenpfleger', 0, 0, 0),
(29, 1, 'Frau', '14', 'Mustermann', 'VOLL', '2018-12-13', 'Krankenpfleger', 0, 0, 0),
(30, 1, 'Frau', '15', 'Mustermann', 'VOLL', '2018-12-13', 'Krankenpfleger', 0, 0, 0),
(31, 1, 'Frau', '16', 'Mustermann', 'VOLL', '2018-12-13', 'Krankenpfleger', 0, 0, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `schichttausch`
--

CREATE TABLE `schichttausch` (
  `stationID` int(11) NOT NULL,
  `mitarbeiterID` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `datumTausch` date NOT NULL,
  `tauschStatus` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `schichtzuweisung`
--

CREATE TABLE `schichtzuweisung` (
  `id` int(20) NOT NULL,
  `datum` varchar(15) NOT NULL,
  `schichtArt` varchar(30) NOT NULL,
  `mitarbeiterID1` int(10) NOT NULL,
  `mitarbeiterID2` int(10) NOT NULL,
  `mitarbeiterID3` int(10) NOT NULL,
  `mitarbeiterID4` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `station`
--

CREATE TABLE `station` (
  `id` int(10) NOT NULL,
  `stationsArt` varchar(20) NOT NULL,
  `ort` varchar(30) NOT NULL,
  `plz` varchar(20) NOT NULL,
  `straße` varchar(30) NOT NULL,
  `hausnummer` varchar(10) NOT NULL,
  `krankenhaus` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `tag`
--

CREATE TABLE `tag` (
  `id` int(10) NOT NULL,
  `schichtzuweisungID1` int(10) NOT NULL,
  `schichtzuweisungID2` int(10) NOT NULL,
  `schichtzuweisungID3` int(10) NOT NULL,
  `schichtzuweisungID4` int(10) NOT NULL,
  `datum` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `wunsch`
--

CREATE TABLE `wunsch` (
  `stationID` int(10) NOT NULL,
  `mitarbeiterID` int(10) NOT NULL,
  `id` int(10) NOT NULL,
  `datumWunsch` date NOT NULL,
  `wunschBeschreibung` varchar(100) NOT NULL,
  `schichtArt` varchar(20) NOT NULL,
  `wunschStatus` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `abwesenheitsmeldung`
--
ALTER TABLE `abwesenheitsmeldung`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `dienstplan`
--
ALTER TABLE `dienstplan`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `ersatzanfrage`
--
ALTER TABLE `ersatzanfrage`
  ADD PRIMARY KEY (`stationID`,`mitarbeiterID`,`abwesenheitsmeldungID`) KEY_BLOCK_SIZE=3;

--
-- Indizes für die Tabelle `ersatzeintragung`
--
ALTER TABLE `ersatzeintragung`
  ADD PRIMARY KEY (`stationID`,`mitarbeiterID`,`abwesenheitsmeldungID`);

--
-- Indizes für die Tabelle `mitarbeiter`
--
ALTER TABLE `mitarbeiter`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `schichttausch`
--
ALTER TABLE `schichttausch`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `schichtzuweisung`
--
ALTER TABLE `schichtzuweisung`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `station`
--
ALTER TABLE `station`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `wunsch`
--
ALTER TABLE `wunsch`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `abwesenheitsmeldung`
--
ALTER TABLE `abwesenheitsmeldung`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `dienstplan`
--
ALTER TABLE `dienstplan`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT für Tabelle `mitarbeiter`
--
ALTER TABLE `mitarbeiter`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;
--
-- AUTO_INCREMENT für Tabelle `schichttausch`
--
ALTER TABLE `schichttausch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `schichtzuweisung`
--
ALTER TABLE `schichtzuweisung`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1445;
--
-- AUTO_INCREMENT für Tabelle `station`
--
ALTER TABLE `station`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=362;
--
-- AUTO_INCREMENT für Tabelle `wunsch`
--
ALTER TABLE `wunsch`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

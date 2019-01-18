-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Erstellungszeit: 18. Jan 2019 um 15:54
-- Server-Version: 5.7.24-log
-- PHP-Version: 7.2.10

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
  `datumBeginn` varchar(15) NOT NULL,
  `datumEnde` varchar(15) NOT NULL
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

--
-- Daten für Tabelle `dienstplan`
--

INSERT INTO `dienstplan` (`stationID`, `id`, `monat`, `jahr`, `tag1`, `tag2`, `tag3`, `tag4`, `tag5`, `tag6`, `tag7`, `tag8`, `tag9`, `tag10`, `tag11`, `tag12`, `tag13`, `tag14`, `tag15`, `tag16`, `tag17`, `tag18`, `tag19`, `tag20`, `tag21`, `tag22`, `tag23`, `tag24`, `tag25`, `tag26`, `tag27`, `tag28`, `tag29`, `tag30`, `tag31`) VALUES
(1, 1, 12, 2018, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ersatzanfrage`
--

CREATE TABLE `ersatzanfrage` (
  `stationID` int(10) NOT NULL,
  `mitarbeiterID` int(10) NOT NULL,
  `abwesenheitsmeldungID` int(10) NOT NULL,
  `datumUebernahme` varchar(15) NOT NULL,
  `schichtArt` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ersatzeintragung`
--

CREATE TABLE `ersatzeintragung` (
  `stationID` int(10) NOT NULL,
  `mitarbeiterID` int(10) NOT NULL,
  `abwesenheitsmeldungID` int(10) NOT NULL,
  `datumUebernahme` varchar(15) NOT NULL,
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
(1, 1, 'Herr', 'Max', 'Mustermann', 'Vollzeit', '01-1-2000', 'Krankenpfleger', 0, 0, 0),
(2, 1, 'Herr', 'Manfred', 'Müller', 'Vollzeit', '13-12-2012', 'Krankenpfleger', 0, 0, 0),
(3, 1, 'Frau', 'Marta', 'Mutze', 'Vollzeit', '05-2-2013', 'Krankenpfleger', 0, 0, 0),
(4, 1, 'Frau', 'Angela', 'Küster', 'Vollzeit', '01-10-2013', 'Krankenpfleger', 0, 0, 0),
(5, 1, 'Frau', 'Berta', 'Krumm', 'Vollzeit', '07-2-2014', 'Krankenpfleger', 0, 0, 0),
(6, 1, 'Frau', 'Claudia', 'Turm', 'Vollzeit', '01-8-2014', 'Krankenpfleger', 0, 0, 0),
(7, 1, 'Frau', 'Dora', 'Dopke', 'Vollzeit', '02-8-2002', 'Krankenpfleger', 0, 0, 0),
(8, 1, 'Frau', 'Julia', 'Bach', 'Vollzeit', '01-8-2007', 'Krankenpfleger', 0, 0, 0),
(9, 1, 'Herr', 'Dave', 'Hudson', 'Vollzeit', '01-5-2011', 'Krankenpfleger', 0, 0, 0),
(10, 1, 'Herr', 'Tosihiko', 'Asao', 'Vollzeit', '01-4-2006', 'Krankenpfleger', 0, 0, 0),
(11, 1, 'Frau', 'Lisa', 'Lütchen', 'Vollzeit', '01-1-2011', 'Krankenpfleger', 0, 0, 0),
(12, 1, 'Frau', 'Ruth', 'Schneider', 'Vollzeit', '01-12-2017', 'Krankenpfleger', 0, 0, 0),
(13, 1, 'Frau', 'Gina', 'Ruttmann', 'Vollzeit', '01-8-2008', 'Krankenpfleger', 0, 0, 0),
(14, 1, 'Herr', 'Jürgen', 'Stolz', 'Vollzeit', '01-11-2010', 'Krankenpfleger', 0, 0, 0),
(15, 1, 'Frau', 'Anna', 'Weg', 'Vollzeit', '07-7-2007', 'Krankenpfleger', 0, 0, 0),
(16, 1, 'Frau', 'Jasmin', 'Frohtal', 'VOLL', '01-3-2018', 'Krankenpfleger', 0, 0, 0),
(17, 1, 'Frau', 'Henriette', 'Holz', 'Vollzeit', '01-6-2009', 'Krankenpfleger', 0, 0, 0),
(18, 1, 'Frau', 'Claudia', 'Columda', 'Vollzeit', '01-9-2014', 'Krankenpfleger', 0, 0, 0);

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
  `datumWunsch` varchar(15) NOT NULL,
  `wunschBeschreibung` varchar(100) NOT NULL,
  `schichtArt` varchar(20) NOT NULL
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
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT für Tabelle `mitarbeiter`
--
ALTER TABLE `mitarbeiter`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT für Tabelle `schichttausch`
--
ALTER TABLE `schichttausch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `schichtzuweisung`
--
ALTER TABLE `schichtzuweisung`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16940;

--
-- AUTO_INCREMENT für Tabelle `station`
--
ALTER TABLE `station`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4751;

--
-- AUTO_INCREMENT für Tabelle `wunsch`
--
ALTER TABLE `wunsch`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

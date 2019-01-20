-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Erstellungszeit: 20. Jan 2019 um 14:37
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
(1, 7, 12, 2020, 4751, 4752, 4753, 4754, 4755, 4756, 4757, 4758, 4759, 4760, 4761, 4762, 4763, 4764, 4765, 4766, 4767, 4768, 4769, 4770, 4771, 4772, 4773, 4774, 4775, 4776, 4777, 4778, 4779, 4780, 4781);

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

--
-- Daten für Tabelle `schichtzuweisung`
--

INSERT INTO `schichtzuweisung` (`id`, `datum`, `schichtArt`, `mitarbeiterID1`, `mitarbeiterID2`, `mitarbeiterID3`, `mitarbeiterID4`) VALUES
(16940, '01-12-2020', 'Fruehschicht', 7, 8, 9, 10),
(16941, '01-12-2020', 'Spaetschicht', 11, 12, 13, 14),
(16942, '01-12-2020', 'Nachtschicht', 15, 16, 17, 18),
(16943, '02-12-2020', 'Fruehschicht', 7, 8, 9, 10),
(16944, '02-12-2020', 'Spaetschicht', 11, 12, 13, 14),
(16945, '02-12-2020', 'Nachtschicht', 15, 16, 17, 18),
(16946, '03-12-2020', 'Fruehschicht', 1, 2, 3, 4),
(16947, '03-12-2020', 'Spaetschicht', 5, 6, 7, 8),
(16948, '03-12-2020', 'Nachtschicht', 9, 10, 11, 12),
(16949, '04-12-2020', 'Fruehschicht', 1, 2, 3, 4),
(16950, '04-12-2020', 'Spaetschicht', 5, 6, 7, 8),
(16951, '04-12-2020', 'Nachtschicht', 9, 10, 11, 12),
(16952, '05-12-2020', 'Fruehschicht', 13, 14, 15, 16),
(16953, '05-12-2020', 'Spaetschicht', 17, 18, 3, 4),
(16954, '05-12-2020', 'Nachtschicht', 5, 6, 1, 2),
(16955, '06-12-2020', 'Fruehschicht', 13, 14, 15, 16),
(16956, '06-12-2020', 'Spaetschicht', 17, 18, 3, 4),
(16957, '06-12-2020', 'Nachtschicht', 5, 6, 1, 2),
(16958, '07-12-2020', 'Fruehschicht', 7, 8, 9, 10),
(16959, '07-12-2020', 'Spaetschicht', 11, 12, 13, 14),
(16960, '07-12-2020', 'Nachtschicht', 15, 16, 17, 18),
(16961, '08-12-2020', 'Fruehschicht', 7, 8, 9, 10),
(16962, '08-12-2020', 'Spaetschicht', 11, 12, 13, 14),
(16963, '08-12-2020', 'Nachtschicht', 15, 16, 17, 18),
(16964, '09-12-2020', 'Fruehschicht', 1, 2, 3, 4),
(16965, '09-12-2020', 'Spaetschicht', 5, 6, 7, 8),
(16966, '09-12-2020', 'Nachtschicht', 9, 10, 11, 12),
(16967, '10-12-2020', 'Fruehschicht', 1, 2, 3, 4),
(16968, '10-12-2020', 'Spaetschicht', 5, 6, 7, 8),
(16969, '10-12-2020', 'Nachtschicht', 9, 10, 11, 12),
(16970, '11-12-2020', 'Fruehschicht', 13, 14, 15, 16),
(16971, '11-12-2020', 'Spaetschicht', 17, 18, 3, 4),
(16972, '11-12-2020', 'Nachtschicht', 5, 6, 1, 2),
(16973, '12-12-2020', 'Fruehschicht', 13, 14, 15, 16),
(16974, '12-12-2020', 'Spaetschicht', 17, 18, 3, 4),
(16975, '12-12-2020', 'Nachtschicht', 5, 6, 1, 2),
(16976, '13-12-2020', 'Fruehschicht', 7, 8, 9, 10),
(16977, '13-12-2020', 'Spaetschicht', 11, 12, 13, 14),
(16978, '13-12-2020', 'Nachtschicht', 15, 16, 17, 18),
(16979, '14-12-2020', 'Fruehschicht', 7, 8, 9, 10),
(16980, '14-12-2020', 'Spaetschicht', 11, 12, 13, 14),
(16981, '14-12-2020', 'Nachtschicht', 15, 16, 17, 18),
(16982, '15-12-2020', 'Fruehschicht', 1, 2, 3, 4),
(16983, '15-12-2020', 'Spaetschicht', 5, 6, 7, 8),
(16984, '15-12-2020', 'Nachtschicht', 9, 10, 11, 12),
(16985, '16-12-2020', 'Fruehschicht', 1, 2, 3, 4),
(16986, '16-12-2020', 'Spaetschicht', 5, 6, 7, 8),
(16987, '16-12-2020', 'Nachtschicht', 9, 10, 11, 12),
(16988, '17-12-2020', 'Fruehschicht', 13, 14, 15, 16),
(16989, '17-12-2020', 'Spaetschicht', 17, 18, 3, 4),
(16990, '17-12-2020', 'Nachtschicht', 5, 6, 1, 2),
(16991, '18-12-2020', 'Fruehschicht', 13, 14, 15, 16),
(16992, '18-12-2020', 'Spaetschicht', 17, 18, 3, 4),
(16993, '18-12-2020', 'Nachtschicht', 5, 6, 1, 2),
(16994, '19-12-2020', 'Fruehschicht', 7, 8, 9, 10),
(16995, '19-12-2020', 'Spaetschicht', 11, 12, 13, 14),
(16996, '19-12-2020', 'Nachtschicht', 15, 16, 17, 18),
(16997, '20-12-2020', 'Fruehschicht', 7, 8, 9, 10),
(16998, '20-12-2020', 'Spaetschicht', 11, 12, 13, 14),
(16999, '20-12-2020', 'Nachtschicht', 15, 16, 17, 18),
(17000, '21-12-2020', 'Fruehschicht', 1, 2, 3, 4),
(17001, '21-12-2020', 'Spaetschicht', 5, 6, 7, 8),
(17002, '21-12-2020', 'Nachtschicht', 9, 10, 11, 12),
(17003, '22-12-2020', 'Fruehschicht', 1, 2, 3, 4),
(17004, '22-12-2020', 'Spaetschicht', 5, 6, 7, 8),
(17005, '22-12-2020', 'Nachtschicht', 9, 10, 11, 12),
(17006, '23-12-2020', 'Fruehschicht', 13, 14, 15, 16),
(17007, '23-12-2020', 'Spaetschicht', 17, 18, 3, 4),
(17008, '23-12-2020', 'Nachtschicht', 5, 6, 1, 2),
(17009, '24-12-2020', 'Fruehschicht', 13, 14, 15, 16),
(17010, '24-12-2020', 'Spaetschicht', 17, 18, 3, 4),
(17011, '24-12-2020', 'Nachtschicht', 5, 6, 1, 2),
(17012, '25-12-2020', 'Fruehschicht', 7, 8, 9, 10),
(17013, '25-12-2020', 'Spaetschicht', 11, 12, 13, 14),
(17014, '25-12-2020', 'Nachtschicht', 15, 16, 17, 18),
(17015, '26-12-2020', 'Fruehschicht', 7, 8, 9, 10),
(17016, '26-12-2020', 'Spaetschicht', 11, 12, 13, 14),
(17017, '26-12-2020', 'Nachtschicht', 15, 16, 17, 18),
(17018, '27-12-2020', 'Fruehschicht', 1, 2, 3, 4),
(17019, '27-12-2020', 'Spaetschicht', 5, 6, 7, 8),
(17020, '27-12-2020', 'Nachtschicht', 9, 10, 11, 12),
(17021, '28-12-2020', 'Fruehschicht', 1, 2, 3, 4),
(17022, '28-12-2020', 'Spaetschicht', 5, 6, 7, 8),
(17023, '28-12-2020', 'Nachtschicht', 9, 10, 11, 12),
(17024, '29-12-2020', 'Fruehschicht', 13, 14, 15, 16),
(17025, '29-12-2020', 'Spaetschicht', 17, 18, 3, 4),
(17026, '29-12-2020', 'Nachtschicht', 5, 6, 1, 2),
(17027, '30-12-2020', 'Fruehschicht', 13, 14, 15, 16),
(17028, '30-12-2020', 'Spaetschicht', 17, 18, 3, 4),
(17029, '30-12-2020', 'Nachtschicht', 5, 6, 1, 2),
(17030, '31-12-2020', 'Fruehschicht', 13, 14, 15, 16),
(17031, '31-12-2020', 'Spaetschicht', 17, 18, 3, 4),
(17032, '31-12-2020', 'Nachtschicht', 5, 6, 1, 2);

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

--
-- Daten für Tabelle `station`
--

INSERT INTO `station` (`id`, `stationsArt`, `ort`, `plz`, `straße`, `hausnummer`, `krankenhaus`) VALUES
(1, 'Notaufnahme', 'Leverkusen', '51375', 'Krankenhaustr.', '1', 'Klinikum Leverkusen');

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

--
-- Daten für Tabelle `tag`
--

INSERT INTO `tag` (`id`, `schichtzuweisungID1`, `schichtzuweisungID2`, `schichtzuweisungID3`, `datum`) VALUES
(4751, 16940, 16941, 16942, '01-12-2020'),
(4752, 16943, 16944, 16945, '02-12-2020'),
(4753, 16946, 16947, 16948, '03-12-2020'),
(4754, 16949, 16950, 16951, '04-12-2020'),
(4755, 16952, 16953, 16954, '05-12-2020'),
(4756, 16955, 16956, 16957, '06-12-2020'),
(4757, 16958, 16959, 16960, '07-12-2020'),
(4758, 16961, 16962, 16963, '08-12-2020'),
(4759, 16964, 16965, 16966, '09-12-2020'),
(4760, 16967, 16968, 16969, '10-12-2020'),
(4761, 16970, 16971, 16972, '11-12-2020'),
(4762, 16973, 16974, 16975, '12-12-2020'),
(4763, 16976, 16977, 16978, '13-12-2020'),
(4764, 16979, 16980, 16981, '14-12-2020'),
(4765, 16982, 16983, 16984, '15-12-2020'),
(4766, 16985, 16986, 16987, '16-12-2020'),
(4767, 16988, 16989, 16990, '17-12-2020'),
(4768, 16991, 16992, 16993, '18-12-2020'),
(4769, 16994, 16995, 16996, '19-12-2020'),
(4770, 16997, 16998, 16999, '20-12-2020'),
(4771, 17000, 17001, 17002, '21-12-2020'),
(4772, 17003, 17004, 17005, '22-12-2020'),
(4773, 17006, 17007, 17008, '23-12-2020'),
(4774, 17009, 17010, 17011, '24-12-2020'),
(4775, 17012, 17013, 17014, '25-12-2020'),
(4776, 17015, 17016, 17017, '26-12-2020'),
(4777, 17018, 17019, 17020, '27-12-2020'),
(4778, 17021, 17022, 17023, '28-12-2020'),
(4779, 17024, 17025, 17026, '29-12-2020'),
(4780, 17027, 17028, 17029, '30-12-2020'),
(4781, 17030, 17031, 17032, '31-12-2020');

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
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
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
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17033;
--
-- AUTO_INCREMENT für Tabelle `station`
--
ALTER TABLE `station`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4782;
--
-- AUTO_INCREMENT für Tabelle `wunsch`
--
ALTER TABLE `wunsch`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

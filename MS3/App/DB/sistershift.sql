-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Erstellungszeit: 16. Jan 2019 um 22:47
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

--
-- Daten für Tabelle `dienstplan`
--

INSERT INTO `dienstplan` (`stationID`, `id`, `monat`, `jahr`, `tag1`, `tag2`, `tag3`, `tag4`, `tag5`, `tag6`, `tag7`, `tag8`, `tag9`, `tag10`, `tag11`, `tag12`, `tag13`, `tag14`, `tag15`, `tag16`, `tag17`, `tag18`, `tag19`, `tag20`, `tag21`, `tag22`, `tag23`, `tag24`, `tag25`, `tag26`, `tag27`, `tag28`, `tag29`, `tag30`, `tag31`) VALUES
(1, 4, 1, 2019, 4662, 4663, 4664, 4665, 4666, 4667, 4668, 4669, 4670, 4671, 4672, 4673, 4674, 4675, 4676, 4677, 4678, 4679, 4680, 4681, 4682, 4683, 4684, 4685, 4686, 4687, 4688, 4689, 4690, 4691, 4692),
(1, 5, 4, 2019, 4693, 4694, 4695, 4696, 4697, 4698, 4699, 4700, 4701, 4702, 4703, 4704, 4705, 4706, 4707, 4708, 4709, 4710, 4711, 4712, 4713, 4714, 4715, 4716, 4717, 4718, 4719, 4720, 4721, 4722, -1),
(1, 6, 2, 2019, 4723, 4724, 4725, 4726, 4727, 4728, 4729, 4730, 4731, 4732, 4733, 4734, 4735, 4736, 4737, 4738, 4739, 4740, 4741, 4742, 4743, 4744, 4745, 4746, 4747, 4748, 4749, 4750, -1, -1, -1);

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

--
-- Daten für Tabelle `ersatzanfrage`
--

INSERT INTO `ersatzanfrage` (`stationID`, `mitarbeiterID`, `abwesenheitsmeldungID`, `datumUebernahme`, `schichtArt`) VALUES
(1, 16, 1, '02-1-2019', 'Fruehschicht'),
(1, 16, 2, '04-2-2019', 'Spaetschicht');

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
(16, 1, 'Herr', 'Max', 'Mustermann', 'Teilzeit', '2018-12-13', 'Arzt', 0, 2, 24),
(17, 1, 'Herr', 'Manfred', 'Mustermann', 'Teilzeit', '2018-12-13', 'Arzt', 2, 3, 0),
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
(31, 1, 'Frau', '16', 'Mustermann', 'VOLL', '2018-12-13', 'Krankenpfleger', 0, 0, 0),
(32, 1, 'Frau', 'Henriette', 'MÜstermann', 'VOLL', '2018-12-13', 'Krankenpfleger', 0, 0, 0),
(33, 1, 'Frau', 'Claudia', 'Hanswurst', 'VOLL', '2018-12-13', 'Krankenpfleger', 0, 0, 0);

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
(16673, '01-1-2019', 'Fruehschicht', 16, 17, 18, 19),
(16674, '01-1-2019', 'Spaetschicht', 20, 21, 22, 23),
(16675, '01-1-2019', 'Nachtschicht', 24, 25, 26, 27),
(16676, '02-1-2019', 'Fruehschicht', 16, 17, 18, 19),
(16677, '02-1-2019', 'Spaetschicht', 20, 21, 22, 23),
(16678, '02-1-2019', 'Nachtschicht', 24, 25, 26, 27),
(16679, '03-1-2019', 'Fruehschicht', 28, 29, 30, 31),
(16680, '03-1-2019', 'Spaetschicht', 32, 33, 18, 19),
(16681, '03-1-2019', 'Nachtschicht', 20, 21, 16, 17),
(16682, '04-1-2019', 'Fruehschicht', 28, 29, 30, 31),
(16683, '04-1-2019', 'Spaetschicht', 32, 33, 18, 19),
(16684, '04-1-2019', 'Nachtschicht', 20, 21, 16, 17),
(16685, '05-1-2019', 'Fruehschicht', 22, 23, 24, 25),
(16686, '05-1-2019', 'Spaetschicht', 26, 27, 28, 29),
(16687, '05-1-2019', 'Nachtschicht', 30, 31, 32, 33),
(16688, '06-1-2019', 'Fruehschicht', 22, 23, 24, 25),
(16689, '06-1-2019', 'Spaetschicht', 26, 27, 28, 29),
(16690, '06-1-2019', 'Nachtschicht', 30, 31, 32, 33),
(16691, '07-1-2019', 'Fruehschicht', 16, 17, 18, 19),
(16692, '07-1-2019', 'Spaetschicht', 20, 21, 22, 23),
(16693, '07-1-2019', 'Nachtschicht', 24, 25, 26, 27),
(16694, '08-1-2019', 'Fruehschicht', 16, 17, 18, 19),
(16695, '08-1-2019', 'Spaetschicht', 20, 21, 22, 23),
(16696, '08-1-2019', 'Nachtschicht', 24, 25, 26, 27),
(16697, '09-1-2019', 'Fruehschicht', 28, 29, 30, 31),
(16698, '09-1-2019', 'Spaetschicht', 32, 33, 18, 19),
(16699, '09-1-2019', 'Nachtschicht', 20, 21, 16, 17),
(16700, '10-1-2019', 'Fruehschicht', 28, 29, 30, 31),
(16701, '10-1-2019', 'Spaetschicht', 32, 33, 18, 19),
(16702, '10-1-2019', 'Nachtschicht', 20, 21, 16, 17),
(16703, '11-1-2019', 'Fruehschicht', 22, 23, 24, 25),
(16704, '11-1-2019', 'Spaetschicht', 26, 27, 28, 29),
(16705, '11-1-2019', 'Nachtschicht', 30, 31, 32, 33),
(16706, '12-1-2019', 'Fruehschicht', 22, 23, 24, 25),
(16707, '12-1-2019', 'Spaetschicht', 26, 27, 28, 29),
(16708, '12-1-2019', 'Nachtschicht', 30, 31, 32, 33),
(16709, '13-1-2019', 'Fruehschicht', 16, 17, 18, 19),
(16710, '13-1-2019', 'Spaetschicht', 20, 21, 22, 23),
(16711, '13-1-2019', 'Nachtschicht', 24, 25, 26, 27),
(16712, '14-1-2019', 'Fruehschicht', 16, 17, 18, 19),
(16713, '14-1-2019', 'Spaetschicht', 20, 21, 22, 23),
(16714, '14-1-2019', 'Nachtschicht', 24, 25, 26, 27),
(16715, '15-1-2019', 'Fruehschicht', 28, 29, 30, 31),
(16716, '15-1-2019', 'Spaetschicht', 32, 33, 18, 19),
(16717, '15-1-2019', 'Nachtschicht', 20, 21, 16, 17),
(16718, '16-1-2019', 'Fruehschicht', 28, 29, 30, 31),
(16719, '16-1-2019', 'Spaetschicht', 32, 33, 18, 19),
(16720, '16-1-2019', 'Nachtschicht', 20, 21, 16, 17),
(16721, '17-1-2019', 'Fruehschicht', 22, 23, 24, 25),
(16722, '17-1-2019', 'Spaetschicht', 26, 27, 28, 29),
(16723, '17-1-2019', 'Nachtschicht', 30, 31, 32, 33),
(16724, '18-1-2019', 'Fruehschicht', 22, 23, 24, 25),
(16725, '18-1-2019', 'Spaetschicht', 26, 27, 28, 29),
(16726, '18-1-2019', 'Nachtschicht', 30, 31, 32, 33),
(16727, '19-1-2019', 'Fruehschicht', 16, 17, 18, 19),
(16728, '19-1-2019', 'Spaetschicht', 20, 21, 22, 23),
(16729, '19-1-2019', 'Nachtschicht', 24, 25, 26, 27),
(16730, '20-1-2019', 'Fruehschicht', 16, 17, 18, 19),
(16731, '20-1-2019', 'Spaetschicht', 20, 21, 22, 23),
(16732, '20-1-2019', 'Nachtschicht', 24, 25, 26, 27),
(16733, '21-1-2019', 'Fruehschicht', 28, 29, 30, 31),
(16734, '21-1-2019', 'Spaetschicht', 32, 33, 18, 19),
(16735, '21-1-2019', 'Nachtschicht', 20, 21, 16, 17),
(16736, '22-1-2019', 'Fruehschicht', 28, 29, 30, 31),
(16737, '22-1-2019', 'Spaetschicht', 32, 33, 18, 19),
(16738, '22-1-2019', 'Nachtschicht', 20, 21, 16, 17),
(16739, '23-1-2019', 'Fruehschicht', 22, 23, 24, 25),
(16740, '23-1-2019', 'Spaetschicht', 26, 27, 28, 29),
(16741, '23-1-2019', 'Nachtschicht', 30, 31, 32, 33),
(16742, '24-1-2019', 'Fruehschicht', 22, 23, 24, 25),
(16743, '24-1-2019', 'Spaetschicht', 26, 27, 28, 29),
(16744, '24-1-2019', 'Nachtschicht', 30, 31, 32, 33),
(16745, '25-1-2019', 'Fruehschicht', 16, 17, 18, 19),
(16746, '25-1-2019', 'Spaetschicht', 20, 21, 22, 23),
(16747, '25-1-2019', 'Nachtschicht', 24, 25, 26, 27),
(16748, '26-1-2019', 'Fruehschicht', 16, 17, 18, 19),
(16749, '26-1-2019', 'Spaetschicht', 20, 21, 22, 23),
(16750, '26-1-2019', 'Nachtschicht', 24, 25, 26, 27),
(16751, '27-1-2019', 'Fruehschicht', 28, 29, 30, 31),
(16752, '27-1-2019', 'Spaetschicht', 32, 33, 18, 19),
(16753, '27-1-2019', 'Nachtschicht', 20, 21, 16, 17),
(16754, '28-1-2019', 'Fruehschicht', 28, 29, 30, 31),
(16755, '28-1-2019', 'Spaetschicht', 32, 33, 18, 19),
(16756, '28-1-2019', 'Nachtschicht', 20, 21, 16, 17),
(16757, '29-1-2019', 'Fruehschicht', 22, 23, 24, 25),
(16758, '29-1-2019', 'Spaetschicht', 26, 27, 28, 29),
(16759, '29-1-2019', 'Nachtschicht', 30, 31, 32, 33),
(16760, '30-1-2019', 'Fruehschicht', 22, 23, 24, 25),
(16761, '30-1-2019', 'Spaetschicht', 26, 27, 28, 29),
(16762, '30-1-2019', 'Nachtschicht', 30, 31, 32, 33),
(16763, '31-1-2019', 'Fruehschicht', 22, 23, 24, 25),
(16764, '31-1-2019', 'Spaetschicht', 26, 27, 28, 29),
(16765, '31-1-2019', 'Nachtschicht', 30, 31, 32, 33),
(16766, '01-4-2019', 'Fruehschicht', 16, 17, 18, 19),
(16767, '01-4-2019', 'Spaetschicht', 20, 21, 22, 23),
(16768, '01-4-2019', 'Nachtschicht', 24, 25, 26, 27),
(16769, '02-4-2019', 'Fruehschicht', 16, 17, 18, 19),
(16770, '02-4-2019', 'Spaetschicht', 20, 21, 22, 23),
(16771, '02-4-2019', 'Nachtschicht', 24, 25, 26, 27),
(16772, '03-4-2019', 'Fruehschicht', 28, 29, 30, 31),
(16773, '03-4-2019', 'Spaetschicht', 32, 33, 18, 19),
(16774, '03-4-2019', 'Nachtschicht', 20, 21, 16, 17),
(16775, '04-4-2019', 'Fruehschicht', 28, 29, 30, 31),
(16776, '04-4-2019', 'Spaetschicht', 32, 33, 18, 19),
(16777, '04-4-2019', 'Nachtschicht', 20, 21, 16, 17),
(16778, '05-4-2019', 'Fruehschicht', 22, 23, 24, 25),
(16779, '05-4-2019', 'Spaetschicht', 26, 27, 28, 29),
(16780, '05-4-2019', 'Nachtschicht', 30, 31, 32, 33),
(16781, '06-4-2019', 'Fruehschicht', 22, 23, 24, 25),
(16782, '06-4-2019', 'Spaetschicht', 26, 27, 28, 29),
(16783, '06-4-2019', 'Nachtschicht', 30, 31, 32, 33),
(16784, '07-4-2019', 'Fruehschicht', 16, 17, 18, 19),
(16785, '07-4-2019', 'Spaetschicht', 20, 21, 22, 23),
(16786, '07-4-2019', 'Nachtschicht', 24, 25, 26, 27),
(16787, '08-4-2019', 'Fruehschicht', 16, 17, 18, 19),
(16788, '08-4-2019', 'Spaetschicht', 20, 21, 22, 23),
(16789, '08-4-2019', 'Nachtschicht', 24, 25, 26, 27),
(16790, '09-4-2019', 'Fruehschicht', 28, 29, 30, 31),
(16791, '09-4-2019', 'Spaetschicht', 32, 33, 18, 19),
(16792, '09-4-2019', 'Nachtschicht', 20, 21, 16, 17),
(16793, '10-4-2019', 'Fruehschicht', 28, 29, 30, 31),
(16794, '10-4-2019', 'Spaetschicht', 32, 33, 18, 19),
(16795, '10-4-2019', 'Nachtschicht', 20, 21, 16, 17),
(16796, '11-4-2019', 'Fruehschicht', 22, 23, 24, 25),
(16797, '11-4-2019', 'Spaetschicht', 26, 27, 28, 29),
(16798, '11-4-2019', 'Nachtschicht', 30, 31, 32, 33),
(16799, '12-4-2019', 'Fruehschicht', 22, 23, 24, 25),
(16800, '12-4-2019', 'Spaetschicht', 26, 27, 28, 29),
(16801, '12-4-2019', 'Nachtschicht', 30, 31, 32, 33),
(16802, '13-4-2019', 'Fruehschicht', 16, 17, 18, 19),
(16803, '13-4-2019', 'Spaetschicht', 20, 21, 22, 23),
(16804, '13-4-2019', 'Nachtschicht', 24, 25, 26, 27),
(16805, '14-4-2019', 'Fruehschicht', 16, 17, 18, 19),
(16806, '14-4-2019', 'Spaetschicht', 20, 21, 22, 23),
(16807, '14-4-2019', 'Nachtschicht', 24, 25, 26, 27),
(16808, '15-4-2019', 'Fruehschicht', 28, 29, 30, 31),
(16809, '15-4-2019', 'Spaetschicht', 32, 33, 18, 19),
(16810, '15-4-2019', 'Nachtschicht', 20, 21, 16, 17),
(16811, '16-4-2019', 'Fruehschicht', 28, 29, 30, 31),
(16812, '16-4-2019', 'Spaetschicht', 32, 33, 18, 19),
(16813, '16-4-2019', 'Nachtschicht', 20, 21, 16, 17),
(16814, '17-4-2019', 'Fruehschicht', 22, 23, 24, 25),
(16815, '17-4-2019', 'Spaetschicht', 26, 27, 28, 29),
(16816, '17-4-2019', 'Nachtschicht', 30, 31, 32, 33),
(16817, '18-4-2019', 'Fruehschicht', 22, 23, 24, 25),
(16818, '18-4-2019', 'Spaetschicht', 26, 27, 28, 29),
(16819, '18-4-2019', 'Nachtschicht', 30, 31, 32, 33),
(16820, '19-4-2019', 'Fruehschicht', 16, 17, 18, 19),
(16821, '19-4-2019', 'Spaetschicht', 20, 21, 22, 23),
(16822, '19-4-2019', 'Nachtschicht', 24, 25, 26, 27),
(16823, '20-4-2019', 'Fruehschicht', 16, 17, 18, 19),
(16824, '20-4-2019', 'Spaetschicht', 20, 21, 22, 23),
(16825, '20-4-2019', 'Nachtschicht', 24, 25, 26, 27),
(16826, '21-4-2019', 'Fruehschicht', 28, 29, 30, 31),
(16827, '21-4-2019', 'Spaetschicht', 32, 33, 18, 19),
(16828, '21-4-2019', 'Nachtschicht', 20, 21, 16, 17),
(16829, '22-4-2019', 'Fruehschicht', 28, 29, 30, 31),
(16830, '22-4-2019', 'Spaetschicht', 32, 33, 18, 19),
(16831, '22-4-2019', 'Nachtschicht', 20, 21, 16, 17),
(16832, '23-4-2019', 'Fruehschicht', 22, 23, 24, 25),
(16833, '23-4-2019', 'Spaetschicht', 26, 27, 28, 29),
(16834, '23-4-2019', 'Nachtschicht', 30, 31, 32, 33),
(16835, '24-4-2019', 'Fruehschicht', 22, 23, 24, 25),
(16836, '24-4-2019', 'Spaetschicht', 26, 27, 28, 29),
(16837, '24-4-2019', 'Nachtschicht', 30, 31, 32, 33),
(16838, '25-4-2019', 'Fruehschicht', 16, 17, 18, 19),
(16839, '25-4-2019', 'Spaetschicht', 20, 21, 22, 23),
(16840, '25-4-2019', 'Nachtschicht', 24, 25, 26, 27),
(16841, '26-4-2019', 'Fruehschicht', 16, 17, 18, 19),
(16842, '26-4-2019', 'Spaetschicht', 20, 21, 22, 23),
(16843, '26-4-2019', 'Nachtschicht', 24, 25, 26, 27),
(16844, '27-4-2019', 'Fruehschicht', 28, 29, 30, 31),
(16845, '27-4-2019', 'Spaetschicht', 32, 33, 18, 19),
(16846, '27-4-2019', 'Nachtschicht', 20, 21, 16, 17),
(16847, '28-4-2019', 'Fruehschicht', 28, 29, 30, 31),
(16848, '28-4-2019', 'Spaetschicht', 32, 33, 18, 19),
(16849, '28-4-2019', 'Nachtschicht', 20, 21, 16, 17),
(16850, '29-4-2019', 'Fruehschicht', 22, 23, 24, 25),
(16851, '29-4-2019', 'Spaetschicht', 26, 27, 28, 29),
(16852, '29-4-2019', 'Nachtschicht', 30, 31, 32, 33),
(16853, '30-4-2019', 'Fruehschicht', 22, 23, 24, 25),
(16854, '30-4-2019', 'Spaetschicht', 26, 27, 28, 29),
(16855, '30-4-2019', 'Nachtschicht', 30, 31, 32, 33),
(16856, '01-2-2019', 'Fruehschicht', 28, 29, 30, 31),
(16857, '01-2-2019', 'Spaetschicht', 32, 33, 18, 19),
(16858, '01-2-2019', 'Nachtschicht', 20, 21, 16, 17),
(16859, '02-2-2019', 'Fruehschicht', 28, 29, 30, 31),
(16860, '02-2-2019', 'Spaetschicht', 32, 33, 18, 19),
(16861, '02-2-2019', 'Nachtschicht', 20, 21, 16, 17),
(16862, '03-2-2019', 'Fruehschicht', 22, 23, 24, 25),
(16863, '03-2-2019', 'Spaetschicht', 26, 27, 28, 29),
(16864, '03-2-2019', 'Nachtschicht', 30, 31, 32, 33),
(16865, '04-2-2019', 'Fruehschicht', 22, 23, 24, 25),
(16866, '04-2-2019', 'Spaetschicht', 26, 27, 28, 29),
(16867, '04-2-2019', 'Nachtschicht', 30, 31, 32, 33),
(16868, '05-2-2019', 'Fruehschicht', 16, 17, 18, 19),
(16869, '05-2-2019', 'Spaetschicht', 20, 21, 22, 23),
(16870, '05-2-2019', 'Nachtschicht', 24, 25, 26, 27),
(16871, '06-2-2019', 'Fruehschicht', 16, 17, 18, 19),
(16872, '06-2-2019', 'Spaetschicht', 20, 21, 22, 23),
(16873, '06-2-2019', 'Nachtschicht', 24, 25, 26, 27),
(16874, '07-2-2019', 'Fruehschicht', 28, 29, 30, 31),
(16875, '07-2-2019', 'Spaetschicht', 32, 33, 18, 19),
(16876, '07-2-2019', 'Nachtschicht', 20, 21, 16, 17),
(16877, '08-2-2019', 'Fruehschicht', 28, 29, 30, 31),
(16878, '08-2-2019', 'Spaetschicht', 32, 33, 18, 19),
(16879, '08-2-2019', 'Nachtschicht', 20, 21, 16, 17),
(16880, '09-2-2019', 'Fruehschicht', 22, 23, 24, 25),
(16881, '09-2-2019', 'Spaetschicht', 26, 27, 28, 29),
(16882, '09-2-2019', 'Nachtschicht', 30, 31, 32, 33),
(16883, '10-2-2019', 'Fruehschicht', 22, 23, 24, 25),
(16884, '10-2-2019', 'Spaetschicht', 26, 27, 28, 29),
(16885, '10-2-2019', 'Nachtschicht', 30, 31, 32, 33),
(16886, '11-2-2019', 'Fruehschicht', 16, 17, 18, 19),
(16887, '11-2-2019', 'Spaetschicht', 20, 21, 22, 23),
(16888, '11-2-2019', 'Nachtschicht', 24, 25, 26, 27),
(16889, '12-2-2019', 'Fruehschicht', 16, 17, 18, 19),
(16890, '12-2-2019', 'Spaetschicht', 20, 21, 22, 23),
(16891, '12-2-2019', 'Nachtschicht', 24, 25, 26, 27),
(16892, '13-2-2019', 'Fruehschicht', 28, 29, 30, 31),
(16893, '13-2-2019', 'Spaetschicht', 32, 33, 18, 19),
(16894, '13-2-2019', 'Nachtschicht', 20, 21, 16, 17),
(16895, '14-2-2019', 'Fruehschicht', 28, 29, 30, 31),
(16896, '14-2-2019', 'Spaetschicht', 32, 33, 18, 19),
(16897, '14-2-2019', 'Nachtschicht', 20, 21, 16, 17),
(16898, '15-2-2019', 'Fruehschicht', 22, 23, 24, 25),
(16899, '15-2-2019', 'Spaetschicht', 26, 27, 28, 29),
(16900, '15-2-2019', 'Nachtschicht', 30, 31, 32, 33),
(16901, '16-2-2019', 'Fruehschicht', 22, 23, 24, 25),
(16902, '16-2-2019', 'Spaetschicht', 26, 27, 28, 29),
(16903, '16-2-2019', 'Nachtschicht', 30, 31, 32, 33),
(16904, '17-2-2019', 'Fruehschicht', 16, 17, 18, 19),
(16905, '17-2-2019', 'Spaetschicht', 20, 21, 22, 23),
(16906, '17-2-2019', 'Nachtschicht', 24, 25, 26, 27),
(16907, '18-2-2019', 'Fruehschicht', 16, 17, 18, 19),
(16908, '18-2-2019', 'Spaetschicht', 20, 21, 22, 23),
(16909, '18-2-2019', 'Nachtschicht', 24, 25, 26, 27),
(16910, '19-2-2019', 'Fruehschicht', 28, 29, 30, 31),
(16911, '19-2-2019', 'Spaetschicht', 32, 33, 18, 19),
(16912, '19-2-2019', 'Nachtschicht', 20, 21, 16, 17),
(16913, '20-2-2019', 'Fruehschicht', 28, 29, 30, 31),
(16914, '20-2-2019', 'Spaetschicht', 32, 33, 18, 19),
(16915, '20-2-2019', 'Nachtschicht', 20, 21, 16, 17),
(16916, '21-2-2019', 'Fruehschicht', 22, 23, 24, 25),
(16917, '21-2-2019', 'Spaetschicht', 26, 27, 28, 29),
(16918, '21-2-2019', 'Nachtschicht', 30, 31, 32, 33),
(16919, '22-2-2019', 'Fruehschicht', 22, 23, 24, 25),
(16920, '22-2-2019', 'Spaetschicht', 26, 27, 28, 29),
(16921, '22-2-2019', 'Nachtschicht', 30, 31, 32, 33),
(16922, '23-2-2019', 'Fruehschicht', 16, 17, 18, 19),
(16923, '23-2-2019', 'Spaetschicht', 20, 21, 22, 23),
(16924, '23-2-2019', 'Nachtschicht', 24, 25, 26, 27),
(16925, '24-2-2019', 'Fruehschicht', 16, 17, 18, 19),
(16926, '24-2-2019', 'Spaetschicht', 20, 21, 22, 23),
(16927, '24-2-2019', 'Nachtschicht', 24, 25, 26, 27),
(16928, '25-2-2019', 'Fruehschicht', 28, 29, 30, 31),
(16929, '25-2-2019', 'Spaetschicht', 32, 33, 18, 19),
(16930, '25-2-2019', 'Nachtschicht', 20, 21, 16, 17),
(16931, '26-2-2019', 'Fruehschicht', 28, 29, 30, 31),
(16932, '26-2-2019', 'Spaetschicht', 32, 33, 18, 19),
(16933, '26-2-2019', 'Nachtschicht', 20, 21, 16, 17),
(16934, '27-2-2019', 'Fruehschicht', 22, 23, 24, 25),
(16935, '27-2-2019', 'Spaetschicht', 26, 27, 28, 29),
(16936, '27-2-2019', 'Nachtschicht', 30, 31, 32, 33),
(16937, '28-2-2019', 'Fruehschicht', 22, 23, 24, 25),
(16938, '28-2-2019', 'Spaetschicht', 26, 27, 28, 29),
(16939, '28-2-2019', 'Nachtschicht', 30, 31, 32, 33);

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

--
-- Daten für Tabelle `tag`
--

INSERT INTO `tag` (`id`, `schichtzuweisungID1`, `schichtzuweisungID2`, `schichtzuweisungID3`, `datum`) VALUES
(4662, 16673, 16674, 16675, '01-1-2019'),
(4663, 16676, 16677, 16678, '02-1-2019'),
(4664, 16679, 16680, 16681, '03-1-2019'),
(4665, 16682, 16683, 16684, '04-1-2019'),
(4666, 16685, 16686, 16687, '05-1-2019'),
(4667, 16688, 16689, 16690, '06-1-2019'),
(4668, 16691, 16692, 16693, '07-1-2019'),
(4669, 16694, 16695, 16696, '08-1-2019'),
(4670, 16697, 16698, 16699, '09-1-2019'),
(4671, 16700, 16701, 16702, '10-1-2019'),
(4672, 16703, 16704, 16705, '11-1-2019'),
(4673, 16706, 16707, 16708, '12-1-2019'),
(4674, 16709, 16710, 16711, '13-1-2019'),
(4675, 16712, 16713, 16714, '14-1-2019'),
(4676, 16715, 16716, 16717, '15-1-2019'),
(4677, 16718, 16719, 16720, '16-1-2019'),
(4678, 16721, 16722, 16723, '17-1-2019'),
(4679, 16724, 16725, 16726, '18-1-2019'),
(4680, 16727, 16728, 16729, '19-1-2019'),
(4681, 16730, 16731, 16732, '20-1-2019'),
(4682, 16733, 16734, 16735, '21-1-2019'),
(4683, 16736, 16737, 16738, '22-1-2019'),
(4684, 16739, 16740, 16741, '23-1-2019'),
(4685, 16742, 16743, 16744, '24-1-2019'),
(4686, 16745, 16746, 16747, '25-1-2019'),
(4687, 16748, 16749, 16750, '26-1-2019'),
(4688, 16751, 16752, 16753, '27-1-2019'),
(4689, 16754, 16755, 16756, '28-1-2019'),
(4690, 16757, 16758, 16759, '29-1-2019'),
(4691, 16760, 16761, 16762, '30-1-2019'),
(4692, 16763, 16764, 16765, '31-1-2019'),
(4693, 16766, 16767, 16768, '01-4-2019'),
(4694, 16769, 16770, 16771, '02-4-2019'),
(4695, 16772, 16773, 16774, '03-4-2019'),
(4696, 16775, 16776, 16777, '04-4-2019'),
(4697, 16778, 16779, 16780, '05-4-2019'),
(4698, 16781, 16782, 16783, '06-4-2019'),
(4699, 16784, 16785, 16786, '07-4-2019'),
(4700, 16787, 16788, 16789, '08-4-2019'),
(4701, 16790, 16791, 16792, '09-4-2019'),
(4702, 16793, 16794, 16795, '10-4-2019'),
(4703, 16796, 16797, 16798, '11-4-2019'),
(4704, 16799, 16800, 16801, '12-4-2019'),
(4705, 16802, 16803, 16804, '13-4-2019'),
(4706, 16805, 16806, 16807, '14-4-2019'),
(4707, 16808, 16809, 16810, '15-4-2019'),
(4708, 16811, 16812, 16813, '16-4-2019'),
(4709, 16814, 16815, 16816, '17-4-2019'),
(4710, 16817, 16818, 16819, '18-4-2019'),
(4711, 16820, 16821, 16822, '19-4-2019'),
(4712, 16823, 16824, 16825, '20-4-2019'),
(4713, 16826, 16827, 16828, '21-4-2019'),
(4714, 16829, 16830, 16831, '22-4-2019'),
(4715, 16832, 16833, 16834, '23-4-2019'),
(4716, 16835, 16836, 16837, '24-4-2019'),
(4717, 16838, 16839, 16840, '25-4-2019'),
(4718, 16841, 16842, 16843, '26-4-2019'),
(4719, 16844, 16845, 16846, '27-4-2019'),
(4720, 16847, 16848, 16849, '28-4-2019'),
(4721, 16850, 16851, 16852, '29-4-2019'),
(4722, 16853, 16854, 16855, '30-4-2019'),
(4723, 16856, 16857, 16858, '01-2-2019'),
(4724, 16859, 16860, 16861, '02-2-2019'),
(4725, 16862, 16863, 16864, '03-2-2019'),
(4726, 16865, 16866, 16867, '04-2-2019'),
(4727, 16868, 16869, 16870, '05-2-2019'),
(4728, 16871, 16872, 16873, '06-2-2019'),
(4729, 16874, 16875, 16876, '07-2-2019'),
(4730, 16877, 16878, 16879, '08-2-2019'),
(4731, 16880, 16881, 16882, '09-2-2019'),
(4732, 16883, 16884, 16885, '10-2-2019'),
(4733, 16886, 16887, 16888, '11-2-2019'),
(4734, 16889, 16890, 16891, '12-2-2019'),
(4735, 16892, 16893, 16894, '13-2-2019'),
(4736, 16895, 16896, 16897, '14-2-2019'),
(4737, 16898, 16899, 16900, '15-2-2019'),
(4738, 16901, 16902, 16903, '16-2-2019'),
(4739, 16904, 16905, 16906, '17-2-2019'),
(4740, 16907, 16908, 16909, '18-2-2019'),
(4741, 16910, 16911, 16912, '19-2-2019'),
(4742, 16913, 16914, 16915, '20-2-2019'),
(4743, 16916, 16917, 16918, '21-2-2019'),
(4744, 16919, 16920, 16921, '22-2-2019'),
(4745, 16922, 16923, 16924, '23-2-2019'),
(4746, 16925, 16926, 16927, '24-2-2019'),
(4747, 16928, 16929, 16930, '25-2-2019'),
(4748, 16931, 16932, 16933, '26-2-2019'),
(4749, 16934, 16935, 16936, '27-2-2019'),
(4750, 16937, 16938, 16939, '28-2-2019');

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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

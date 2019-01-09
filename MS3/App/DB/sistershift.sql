-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Erstellungszeit: 09. Jan 2019 um 17:06
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
(1, 1, 7, 2021, 1, 2, 13, 14, 15, 16, 3, 4, 19, 20, 21, 22, 5, 6, 25, 26, 27, 28, 7, 8, 31, 32, 33, 34, 9, 10, 37, 38, 39, 40, 41),
(1, 2, 12, 2021, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72),
(1, 3, 11, 2021, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, -1);

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
(156, '01-12-2021', 'Fruehschicht', 16, 17, 18, 19),
(157, '01-12-2021', 'Spaetschicht', 20, 21, 22, 23),
(158, '01-12-2021', 'Nachtschicht', 24, 25, 26, 27),
(159, '02-12-2021', 'Fruehschicht', 16, 17, 18, 19),
(160, '02-12-2021', 'Spaetschicht', 20, 21, 22, 23),
(161, '02-12-2021', 'Nachtschicht', 24, 25, 26, 27),
(162, '03-12-2021', 'Fruehschicht', 28, 29, 30, 31),
(163, '03-12-2021', 'Spaetschicht', 32, 33, 18, 19),
(164, '03-12-2021', 'Nachtschicht', 20, 21, 16, 17),
(165, '04-12-2021', 'Fruehschicht', 28, 29, 30, 31),
(166, '04-12-2021', 'Spaetschicht', 32, 33, 18, 19),
(167, '04-12-2021', 'Nachtschicht', 20, 21, 16, 17),
(168, '05-12-2021', 'Fruehschicht', 22, 23, 24, 25),
(169, '05-12-2021', 'Spaetschicht', 26, 27, 28, 29),
(170, '05-12-2021', 'Nachtschicht', 30, 31, 32, 33),
(171, '06-12-2021', 'Fruehschicht', 22, 23, 24, 25),
(172, '06-12-2021', 'Spaetschicht', 26, 27, 28, 29),
(173, '06-12-2021', 'Nachtschicht', 30, 31, 32, 33),
(174, '07-12-2021', 'Fruehschicht', 16, 17, 18, 19),
(175, '07-12-2021', 'Spaetschicht', 20, 21, 22, 23),
(176, '07-12-2021', 'Nachtschicht', 24, 25, 26, 27),
(177, '08-12-2021', 'Fruehschicht', 16, 17, 18, 19),
(178, '08-12-2021', 'Spaetschicht', 20, 21, 22, 23),
(179, '08-12-2021', 'Nachtschicht', 24, 25, 26, 27),
(180, '09-12-2021', 'Fruehschicht', 28, 29, 30, 31),
(181, '09-12-2021', 'Spaetschicht', 32, 33, 18, 19),
(182, '09-12-2021', 'Nachtschicht', 20, 21, 16, 17),
(183, '10-12-2021', 'Fruehschicht', 28, 29, 30, 31),
(184, '10-12-2021', 'Spaetschicht', 32, 33, 18, 19),
(185, '10-12-2021', 'Nachtschicht', 20, 21, 16, 17),
(186, '11-12-2021', 'Fruehschicht', 22, 23, 24, 25),
(187, '11-12-2021', 'Spaetschicht', 26, 27, 28, 29),
(188, '11-12-2021', 'Nachtschicht', 30, 31, 32, 33),
(189, '12-12-2021', 'Fruehschicht', 22, 23, 24, 25),
(190, '12-12-2021', 'Spaetschicht', 26, 27, 28, 29),
(191, '12-12-2021', 'Nachtschicht', 30, 31, 32, 33),
(192, '13-12-2021', 'Fruehschicht', 16, 17, 18, 19),
(193, '13-12-2021', 'Spaetschicht', 20, 21, 22, 23),
(194, '13-12-2021', 'Nachtschicht', 24, 25, 26, 27),
(195, '14-12-2021', 'Fruehschicht', 16, 17, 18, 19),
(196, '14-12-2021', 'Spaetschicht', 20, 21, 22, 23),
(197, '14-12-2021', 'Nachtschicht', 24, 25, 26, 27),
(198, '15-12-2021', 'Fruehschicht', 28, 29, 30, 31),
(199, '15-12-2021', 'Spaetschicht', 32, 33, 18, 19),
(200, '15-12-2021', 'Nachtschicht', 20, 21, 16, 17),
(201, '16-12-2021', 'Fruehschicht', 28, 29, 30, 31),
(202, '16-12-2021', 'Spaetschicht', 32, 33, 18, 19),
(203, '16-12-2021', 'Nachtschicht', 20, 21, 16, 17),
(204, '17-12-2021', 'Fruehschicht', 22, 23, 24, 25),
(205, '17-12-2021', 'Spaetschicht', 26, 27, 28, 29),
(206, '17-12-2021', 'Nachtschicht', 30, 31, 32, 33),
(207, '18-12-2021', 'Fruehschicht', 22, 23, 24, 25),
(208, '18-12-2021', 'Spaetschicht', 26, 27, 28, 29),
(209, '18-12-2021', 'Nachtschicht', 30, 31, 32, 33),
(210, '19-12-2021', 'Fruehschicht', 16, 17, 18, 19),
(211, '19-12-2021', 'Spaetschicht', 20, 21, 22, 23),
(212, '19-12-2021', 'Nachtschicht', 24, 25, 26, 27),
(213, '20-12-2021', 'Fruehschicht', 16, 17, 18, 19),
(214, '20-12-2021', 'Spaetschicht', 20, 21, 22, 23),
(215, '20-12-2021', 'Nachtschicht', 24, 25, 26, 27),
(216, '21-12-2021', 'Fruehschicht', 28, 29, 30, 31),
(217, '21-12-2021', 'Spaetschicht', 32, 33, 18, 19),
(218, '21-12-2021', 'Nachtschicht', 20, 21, 16, 17),
(219, '22-12-2021', 'Fruehschicht', 28, 29, 30, 31),
(220, '22-12-2021', 'Spaetschicht', 32, 33, 18, 19),
(221, '22-12-2021', 'Nachtschicht', 20, 21, 16, 17),
(222, '23-12-2021', 'Fruehschicht', 22, 23, 24, 25),
(223, '23-12-2021', 'Spaetschicht', 26, 27, 28, 29),
(224, '23-12-2021', 'Nachtschicht', 30, 31, 32, 33),
(225, '24-12-2021', 'Fruehschicht', 22, 23, 24, 25),
(226, '24-12-2021', 'Spaetschicht', 26, 27, 28, 29),
(227, '24-12-2021', 'Nachtschicht', 30, 31, 32, 33),
(228, '25-12-2021', 'Fruehschicht', 16, 17, 18, 19),
(229, '25-12-2021', 'Spaetschicht', 20, 21, 22, 23),
(230, '25-12-2021', 'Nachtschicht', 24, 25, 26, 27),
(231, '26-12-2021', 'Fruehschicht', 16, 17, 18, 19),
(232, '26-12-2021', 'Spaetschicht', 20, 21, 22, 23),
(233, '26-12-2021', 'Nachtschicht', 24, 25, 26, 27),
(234, '27-12-2021', 'Fruehschicht', 28, 29, 30, 31),
(235, '27-12-2021', 'Spaetschicht', 32, 33, 18, 19),
(236, '27-12-2021', 'Nachtschicht', 20, 21, 16, 17),
(237, '28-12-2021', 'Fruehschicht', 28, 29, 30, 31),
(238, '28-12-2021', 'Spaetschicht', 32, 33, 18, 19),
(239, '28-12-2021', 'Nachtschicht', 20, 21, 16, 17),
(240, '29-12-2021', 'Fruehschicht', 22, 23, 24, 25),
(241, '29-12-2021', 'Spaetschicht', 26, 27, 28, 29),
(242, '29-12-2021', 'Nachtschicht', 30, 31, 32, 33),
(243, '30-12-2021', 'Fruehschicht', 22, 23, 24, 25),
(244, '30-12-2021', 'Spaetschicht', 26, 27, 28, 29),
(245, '30-12-2021', 'Nachtschicht', 30, 31, 32, 33),
(246, '31-12-2021', 'Fruehschicht', 22, 23, 24, 25),
(247, '31-12-2021', 'Spaetschicht', 26, 27, 28, 29),
(248, '31-12-2021', 'Nachtschicht', 30, 31, 32, 33),
(249, '01-11-2021', 'Fruehschicht', 16, 17, 18, 19),
(250, '01-11-2021', 'Spaetschicht', 20, 21, 22, 23),
(251, '01-11-2021', 'Nachtschicht', 24, 25, 26, 27),
(252, '02-11-2021', 'Fruehschicht', 16, 17, 18, 19),
(253, '02-11-2021', 'Spaetschicht', 20, 21, 22, 23),
(254, '02-11-2021', 'Nachtschicht', 24, 25, 26, 27),
(255, '03-11-2021', 'Fruehschicht', 28, 29, 30, 31),
(256, '03-11-2021', 'Spaetschicht', 32, 33, 18, 19),
(257, '03-11-2021', 'Nachtschicht', 20, 21, 16, 17),
(258, '04-11-2021', 'Fruehschicht', 28, 29, 30, 31),
(259, '04-11-2021', 'Spaetschicht', 32, 33, 18, 19),
(260, '04-11-2021', 'Nachtschicht', 20, 21, 16, 17),
(261, '05-11-2021', 'Fruehschicht', 22, 23, 24, 25),
(262, '05-11-2021', 'Spaetschicht', 26, 27, 28, 29),
(263, '05-11-2021', 'Nachtschicht', 30, 31, 32, 33),
(264, '06-11-2021', 'Fruehschicht', 22, 23, 24, 25),
(265, '06-11-2021', 'Spaetschicht', 26, 27, 28, 29),
(266, '06-11-2021', 'Nachtschicht', 30, 31, 32, 33),
(267, '07-11-2021', 'Fruehschicht', 16, 17, 18, 19),
(268, '07-11-2021', 'Spaetschicht', 20, 21, 22, 23),
(269, '07-11-2021', 'Nachtschicht', 24, 25, 26, 27),
(270, '08-11-2021', 'Fruehschicht', 16, 17, 18, 19),
(271, '08-11-2021', 'Spaetschicht', 20, 21, 22, 23),
(272, '08-11-2021', 'Nachtschicht', 24, 25, 26, 27),
(273, '09-11-2021', 'Fruehschicht', 28, 29, 30, 31),
(274, '09-11-2021', 'Spaetschicht', 32, 33, 18, 19),
(275, '09-11-2021', 'Nachtschicht', 20, 21, 16, 17),
(276, '10-11-2021', 'Fruehschicht', 28, 29, 30, 31),
(277, '10-11-2021', 'Spaetschicht', 32, 33, 18, 19),
(278, '10-11-2021', 'Nachtschicht', 20, 21, 16, 17),
(279, '11-11-2021', 'Fruehschicht', 22, 23, 24, 25),
(280, '11-11-2021', 'Spaetschicht', 26, 27, 28, 29),
(281, '11-11-2021', 'Nachtschicht', 30, 31, 32, 33),
(282, '12-11-2021', 'Fruehschicht', 22, 23, 24, 25),
(283, '12-11-2021', 'Spaetschicht', 26, 27, 28, 29),
(284, '12-11-2021', 'Nachtschicht', 30, 31, 32, 33),
(285, '13-11-2021', 'Fruehschicht', 16, 17, 18, 19),
(286, '13-11-2021', 'Spaetschicht', 20, 21, 22, 23),
(287, '13-11-2021', 'Nachtschicht', 24, 25, 26, 27),
(288, '14-11-2021', 'Fruehschicht', 16, 17, 18, 19),
(289, '14-11-2021', 'Spaetschicht', 20, 21, 22, 23),
(290, '14-11-2021', 'Nachtschicht', 24, 25, 26, 27),
(291, '15-11-2021', 'Fruehschicht', 28, 29, 30, 31),
(292, '15-11-2021', 'Spaetschicht', 32, 33, 18, 19),
(293, '15-11-2021', 'Nachtschicht', 20, 21, 16, 17),
(294, '16-11-2021', 'Fruehschicht', 28, 29, 30, 31),
(295, '16-11-2021', 'Spaetschicht', 32, 33, 18, 19),
(296, '16-11-2021', 'Nachtschicht', 20, 21, 16, 17),
(297, '17-11-2021', 'Fruehschicht', 22, 23, 24, 25),
(298, '17-11-2021', 'Spaetschicht', 26, 27, 28, 29),
(299, '17-11-2021', 'Nachtschicht', 30, 31, 32, 33),
(300, '18-11-2021', 'Fruehschicht', 22, 23, 24, 25),
(301, '18-11-2021', 'Spaetschicht', 26, 27, 28, 29),
(302, '18-11-2021', 'Nachtschicht', 30, 31, 32, 33),
(303, '19-11-2021', 'Fruehschicht', 16, 17, 18, 19),
(304, '19-11-2021', 'Spaetschicht', 20, 21, 22, 23),
(305, '19-11-2021', 'Nachtschicht', 24, 25, 26, 27),
(306, '20-11-2021', 'Fruehschicht', 16, 17, 18, 19),
(307, '20-11-2021', 'Spaetschicht', 20, 21, 22, 23),
(308, '20-11-2021', 'Nachtschicht', 24, 25, 26, 27),
(309, '21-11-2021', 'Fruehschicht', 28, 29, 30, 31),
(310, '21-11-2021', 'Spaetschicht', 32, 33, 18, 19),
(311, '21-11-2021', 'Nachtschicht', 20, 21, 16, 17),
(312, '22-11-2021', 'Fruehschicht', 28, 29, 30, 31),
(313, '22-11-2021', 'Spaetschicht', 32, 33, 18, 19),
(314, '22-11-2021', 'Nachtschicht', 20, 21, 16, 17),
(315, '23-11-2021', 'Fruehschicht', 22, 23, 24, 25),
(316, '23-11-2021', 'Spaetschicht', 26, 27, 28, 29),
(317, '23-11-2021', 'Nachtschicht', 30, 31, 32, 33),
(318, '24-11-2021', 'Fruehschicht', 22, 23, 24, 25),
(319, '24-11-2021', 'Spaetschicht', 26, 27, 28, 29),
(320, '24-11-2021', 'Nachtschicht', 30, 31, 32, 33),
(321, '25-11-2021', 'Fruehschicht', 16, 17, 18, 19),
(322, '25-11-2021', 'Spaetschicht', 20, 21, 22, 23),
(323, '25-11-2021', 'Nachtschicht', 24, 25, 26, 27),
(324, '26-11-2021', 'Fruehschicht', 16, 17, 18, 19),
(325, '26-11-2021', 'Spaetschicht', 20, 21, 22, 23),
(326, '26-11-2021', 'Nachtschicht', 24, 25, 26, 27),
(327, '27-11-2021', 'Fruehschicht', 28, 29, 30, 31),
(328, '27-11-2021', 'Spaetschicht', 32, 33, 18, 19),
(329, '27-11-2021', 'Nachtschicht', 20, 21, 16, 17),
(330, '28-11-2021', 'Fruehschicht', 28, 29, 30, 31),
(331, '28-11-2021', 'Spaetschicht', 32, 33, 18, 19),
(332, '28-11-2021', 'Nachtschicht', 20, 21, 16, 17),
(333, '29-11-2021', 'Fruehschicht', 22, 23, 24, 25),
(334, '29-11-2021', 'Spaetschicht', 26, 27, 28, 29),
(335, '29-11-2021', 'Nachtschicht', 30, 31, 32, 33),
(336, '30-11-2021', 'Fruehschicht', 22, 23, 24, 25),
(337, '30-11-2021', 'Spaetschicht', 26, 27, 28, 29),
(338, '30-11-2021', 'Nachtschicht', 30, 31, 32, 33);

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
(1, 1, 2, 3, '01-7-2021'),
(2, 4, 5, 6, '02-7-2021'),
(3, 13, 14, 15, '07-7-2021'),
(4, 16, 17, 18, '08-7-2021'),
(5, 25, 26, 27, '13-7-2021'),
(6, 28, 29, 30, '14-7-2021'),
(7, 37, 38, 39, '19-7-2021'),
(8, 40, 41, 42, '20-7-2021'),
(9, 49, 50, 51, '25-7-2021'),
(10, 52, 53, 54, '26-7-2021'),
(11, 1, 2, 3, '01-7-2021'),
(12, 4, 5, 6, '02-7-2021'),
(13, 7, 70, 71, '03-7-2021'),
(14, 8, 73, 74, '04-7-2021'),
(15, 9, 10, 77, '05-7-2021'),
(16, 11, 12, 80, '06-7-2021'),
(17, 13, 14, 15, '07-7-2021'),
(18, 16, 17, 18, '08-7-2021'),
(19, 19, 88, 89, '09-7-2021'),
(20, 20, 91, 92, '10-7-2021'),
(21, 21, 22, 95, '11-7-2021'),
(22, 23, 24, 98, '12-7-2021'),
(23, 25, 26, 27, '13-7-2021'),
(24, 28, 29, 30, '14-7-2021'),
(25, 31, 106, 107, '15-7-2021'),
(26, 32, 109, 110, '16-7-2021'),
(27, 33, 34, 113, '17-7-2021'),
(28, 35, 36, 116, '18-7-2021'),
(29, 37, 38, 39, '19-7-2021'),
(30, 40, 41, 42, '20-7-2021'),
(31, 43, 124, 125, '21-7-2021'),
(32, 44, 127, 128, '22-7-2021'),
(33, 45, 46, 131, '23-7-2021'),
(34, 47, 48, 134, '24-7-2021'),
(35, 49, 50, 51, '25-7-2021'),
(36, 52, 53, 54, '26-7-2021'),
(37, 55, 142, 143, '27-7-2021'),
(38, 56, 145, 146, '28-7-2021'),
(39, 57, 58, 149, '29-7-2021'),
(40, 59, 60, 152, '30-7-2021'),
(41, 61, 62, 155, '31-7-2021'),
(42, 156, 157, 158, '01-12-2021'),
(43, 159, 160, 161, '02-12-2021'),
(44, 162, 163, 164, '03-12-2021'),
(45, 165, 166, 167, '04-12-2021'),
(46, 168, 169, 170, '05-12-2021'),
(47, 171, 172, 173, '06-12-2021'),
(48, 174, 175, 176, '07-12-2021'),
(49, 177, 178, 179, '08-12-2021'),
(50, 180, 181, 182, '09-12-2021'),
(51, 183, 184, 185, '10-12-2021'),
(52, 186, 187, 188, '11-12-2021'),
(53, 189, 190, 191, '12-12-2021'),
(54, 192, 193, 194, '13-12-2021'),
(55, 195, 196, 197, '14-12-2021'),
(56, 198, 199, 200, '15-12-2021'),
(57, 201, 202, 203, '16-12-2021'),
(58, 204, 205, 206, '17-12-2021'),
(59, 207, 208, 209, '18-12-2021'),
(60, 210, 211, 212, '19-12-2021'),
(61, 213, 214, 215, '20-12-2021'),
(62, 216, 217, 218, '21-12-2021'),
(63, 219, 220, 221, '22-12-2021'),
(64, 222, 223, 224, '23-12-2021'),
(65, 225, 226, 227, '24-12-2021'),
(66, 228, 229, 230, '25-12-2021'),
(67, 231, 232, 233, '26-12-2021'),
(68, 234, 235, 236, '27-12-2021'),
(69, 237, 238, 239, '28-12-2021'),
(70, 240, 241, 242, '29-12-2021'),
(71, 243, 244, 245, '30-12-2021'),
(72, 246, 247, 248, '31-12-2021'),
(73, 249, 250, 251, '01-11-2021'),
(74, 252, 253, 254, '02-11-2021'),
(75, 255, 256, 257, '03-11-2021'),
(76, 258, 259, 260, '04-11-2021'),
(77, 261, 262, 263, '05-11-2021'),
(78, 264, 265, 266, '06-11-2021'),
(79, 267, 268, 269, '07-11-2021'),
(80, 270, 271, 272, '08-11-2021'),
(81, 273, 274, 275, '09-11-2021'),
(82, 276, 277, 278, '10-11-2021'),
(83, 279, 280, 281, '11-11-2021'),
(84, 282, 283, 284, '12-11-2021'),
(85, 285, 286, 287, '13-11-2021'),
(86, 288, 289, 290, '14-11-2021'),
(87, 291, 292, 293, '15-11-2021'),
(88, 294, 295, 296, '16-11-2021'),
(89, 297, 298, 299, '17-11-2021'),
(90, 300, 301, 302, '18-11-2021'),
(91, 303, 304, 305, '19-11-2021'),
(92, 306, 307, 308, '20-11-2021'),
(93, 309, 310, 311, '21-11-2021'),
(94, 312, 313, 314, '22-11-2021'),
(95, 315, 316, 317, '23-11-2021'),
(96, 318, 319, 320, '24-11-2021'),
(97, 321, 322, 323, '25-11-2021'),
(98, 324, 325, 326, '26-11-2021'),
(99, 327, 328, 329, '27-11-2021'),
(100, 330, 331, 332, '28-11-2021'),
(101, 333, 334, 335, '29-11-2021'),
(102, 336, 337, 338, '30-11-2021');

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
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
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
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=339;
--
-- AUTO_INCREMENT für Tabelle `station`
--
ALTER TABLE `station`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;
--
-- AUTO_INCREMENT für Tabelle `wunsch`
--
ALTER TABLE `wunsch`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

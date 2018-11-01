-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Erstellungszeit: 01. Nov 2018 um 13:35
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
-- Datenbank: `krankenpfleger`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `krankmeldungen`
--

CREATE TABLE `krankmeldungen` (
  `id` int(30) NOT NULL,
  `pflegerID` int(11) NOT NULL,
  `stationID` int(30) NOT NULL,
  `start` date NOT NULL,
  `ende` date NOT NULL,
  `dienstArt` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `krankmeldungen`
--

INSERT INTO `krankmeldungen` (`id`, `pflegerID`, `stationID`, `start`, `ende`, `dienstArt`) VALUES
(8, 10, 1, '2018-12-19', '2018-12-31', 'Fruehdienst'),
(9, 10, 1, '2018-12-01', '2018-12-31', 'Fruehdienst'),
(10, 10, 1, '2018-12-02', '2018-12-31', 'Fruehdienst'),
(11, 10, 1, '2018-12-03', '2018-12-31', 'Fruehdienst'),
(12, 10, 1, '2018-12-04', '2018-12-31', 'Fruehdienst'),
(13, 10, 1, '2018-12-05', '2018-12-31', 'Fruehdienst'),
(14, 10, 1, '2018-12-06', '2018-12-31', 'Fruehdienst'),
(15, 10, 1, '2018-12-07', '2018-12-31', 'Fruehdienst'),
(16, 10, 1, '2018-12-08', '2018-12-31', 'Fruehdienst'),
(17, 10, 1, '2018-12-09', '2018-12-31', 'Fruehdienst'),
(18, 10, 1, '2018-12-10', '2018-12-31', 'Fruehdienst');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `pfleger`
--

CREATE TABLE `pfleger` (
  `id` int(11) NOT NULL,
  `stationID` int(30) NOT NULL,
  `anrede` varchar(20) NOT NULL,
  `vorname` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefon` varchar(30) NOT NULL,
  `beschaeftigungsArt` varchar(30) NOT NULL,
  `start` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `pfleger`
--

INSERT INTO `pfleger` (`id`, `stationID`, `anrede`, `vorname`, `name`, `email`, `telefon`, `beschaeftigungsArt`, `start`) VALUES
(10, 1, 'Frau', 'Hannelore', 'König', 'HK@gmail.com', '017727327', 'Vollzeit', '2017-09-13'),
(12, 1, 'Herr', 'David', 'Jova', 'davidjova94@gmail.com', '017727327', 'Vollzeit', '2017-09-13');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `station`
--

CREATE TABLE `station` (
  `StationID` int(30) NOT NULL,
  `StationsArt` varchar(50) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Ort` varchar(50) NOT NULL,
  `PLZ` int(5) NOT NULL,
  `Straße` varchar(50) NOT NULL,
  `Hausnummer` int(5) NOT NULL,
  `Telefon` int(30) NOT NULL,
  `Email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `station`
--

INSERT INTO `station` (`StationID`, `StationsArt`, `Name`, `Ort`, `PLZ`, `Straße`, `Hausnummer`, `Telefon`, `Email`) VALUES
(1, 'Ambulanz', 'ZNA Leverkusen', 'Leverkusen', 51375, 'Krankenhausstrasse', 32, 20210210, 'kh@lev.de');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `krankmeldungen`
--
ALTER TABLE `krankmeldungen`
  ADD PRIMARY KEY (`id`,`start`,`ende`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `Pfleger-Krankmeldung` (`pflegerID`),
  ADD KEY `Station-Krankmeldung` (`stationID`);

--
-- Indizes für die Tabelle `pfleger`
--
ALTER TABLE `pfleger`
  ADD PRIMARY KEY (`id`,`stationID`),
  ADD KEY `Station-Pfleger` (`stationID`);

--
-- Indizes für die Tabelle `station`
--
ALTER TABLE `station`
  ADD PRIMARY KEY (`StationID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `krankmeldungen`
--
ALTER TABLE `krankmeldungen`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT für Tabelle `pfleger`
--
ALTER TABLE `pfleger`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT für Tabelle `station`
--
ALTER TABLE `station`
  MODIFY `StationID` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `krankmeldungen`
--
ALTER TABLE `krankmeldungen`
  ADD CONSTRAINT `Pfleger-Krankmeldung` FOREIGN KEY (`pflegerID`) REFERENCES `pfleger` (`id`),
  ADD CONSTRAINT `Station-Krankmeldung` FOREIGN KEY (`stationID`) REFERENCES `station` (`StationID`);

--
-- Constraints der Tabelle `pfleger`
--
ALTER TABLE `pfleger`
  ADD CONSTRAINT `Station-Pfleger` FOREIGN KEY (`stationID`) REFERENCES `station` (`StationID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

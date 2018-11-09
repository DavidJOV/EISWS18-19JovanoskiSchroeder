-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Erstellungszeit: 09. Nov 2018 um 16:17
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
  `start` varchar(30) NOT NULL,
  `ende` date NOT NULL,
  `dienstArt` varchar(50) NOT NULL,
  `dienstBeginn` time NOT NULL,
  `ersatzGefunden` tinyint(1) NOT NULL,
  `ersatzPfleger` int(11) DEFAULT NULL,
  `zeitStempel` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `krankmeldungen`
--

INSERT INTO `krankmeldungen` (`id`, `pflegerID`, `stationID`, `start`, `ende`, `dienstArt`, `dienstBeginn`, `ersatzGefunden`, `ersatzPfleger`, `zeitStempel`) VALUES
(68, 13, 1, '2018-11-08', '2018-03-11', 'Spaetdienst', '18:00:00', 1, 12, '2018-11-09 14:31:22'),
(69, 13, 1, '2018-11-08', '2018-02-11', 'Spaetdienst', '18:00:00', 0, NULL, '2018-11-09 14:31:22'),
(70, 13, 1, '2018-10-08', '2018-02-11', 'Spaetdienst', '18:00:00', 0, NULL, '2018-11-09 14:31:22'),
(71, 13, 1, '2018-10-07', '2018-02-11', 'Spaetdienst', '18:00:00', 0, NULL, '2018-11-09 14:31:22'),
(72, 13, 1, '2018-11-12', '2018-02-11', 'Spaetdienst', '18:00:00', 0, NULL, '2018-11-09 14:31:22'),
(73, 13, 1, '2018-11-12', '2018-02-01', 'Spaetdienst', '18:00:00', 0, NULL, '2018-11-09 14:31:22'),
(74, 13, 1, '2018-11-12', '2018-02-02', 'Spaetdienst', '18:00:00', 0, NULL, '2018-11-09 14:31:22'),
(75, 13, 1, '2018-11-12', '2018-02-03', 'Spaetdienst', '18:00:00', 0, NULL, '2018-11-09 14:31:22'),
(76, 13, 1, '2018-11-12', '2018-02-04', 'Spaetdienst', '18:00:00', 0, NULL, '2018-11-09 14:31:22'),
(78, 13, 1, '2018-11-12', '2018-02-05', 'Spaetdienst', '18:00:00', 0, NULL, '2018-11-09 14:31:22'),
(79, 13, 1, '2018-11-12', '2018-02-06', 'Spaetdienst', '18:00:00', 0, NULL, '2018-11-09 14:31:22'),
(80, 13, 1, '2018-11-12', '2018-02-07', 'Spaetdienst', '18:00:00', 0, NULL, '2018-11-09 14:31:22'),
(82, 13, 1, '2018-11-12', '2018-02-08', 'Spaetdienst', '18:00:00', 0, NULL, '2018-11-09 14:31:22'),
(83, 13, 1, '2018-11-02', '2018-02-08', 'Spaetdienst', '18:00:00', 0, NULL, '2018-11-09 14:31:22'),
(84, 13, 1, '2018-11-02', '2018-02-01', 'Spaetdienst', '18:00:00', 0, NULL, '2018-11-09 14:31:22'),
(85, 13, 1, '2018-11-02', '2018-02-02', 'Spaetdienst', '18:00:00', 0, NULL, '2018-11-09 14:31:22'),
(86, 13, 1, '2018-11-02', '2018-02-03', 'Spaetdienst', '18:00:00', 0, NULL, '2018-11-09 14:31:22'),
(87, 13, 1, '2018-11-02', '2018-02-04', 'Spaetdienst', '18:00:00', 0, NULL, '2018-11-09 14:31:22'),
(88, 13, 1, '2018-11-11', '2019-02-04', 'Spaetdienst', '18:00:00', 0, NULL, '2018-11-09 14:31:22'),
(89, 13, 1, '2018-11-11', '2019-02-03', 'Spaetdienst', '18:00:00', 1, 12, '2018-11-09 14:31:22'),
(91, 13, 1, '2018-11-11', '2019-02-05', 'Spaetdienst', '18:00:00', 1, 12, '2018-11-09 14:31:22'),
(92, 13, 1, '2018-11-12', '2019-02-05', 'Spaetdienst', '18:00:00', 1, 12, '2018-11-09 14:31:22'),
(93, 13, 1, '2018-11-24', '2019-02-05', 'Spaetdienst', '18:00:00', 0, NULL, '2018-11-09 14:32:03'),
(94, 13, 1, '2018-11-10', '2019-02-05', 'Fruehdienst', '06:00:00', 0, NULL, '2018-11-09 15:21:30'),
(95, 13, 1, '2018-11-11', '2019-02-05', 'Fruehdienst', '06:00:00', 0, NULL, '2018-11-09 15:35:00'),
(96, 13, 1, '2018-11-12', '2019-02-05', 'Fruehdienst', '06:00:00', 1, 12, '2018-11-09 15:42:43'),
(98, 13, 1, '2018-11-13', '2019-02-05', 'Fruehdienst', '06:00:00', 0, NULL, '2018-11-09 15:43:45'),
(99, 13, 1, '2018-11-14', '2019-02-05', 'Fruehdienst', '06:00:00', 0, NULL, '2018-11-09 15:48:05'),
(100, 13, 1, '2018-11-15', '2019-02-05', 'Fruehdienst', '06:00:00', 0, NULL, '2018-11-09 15:58:32'),
(101, 13, 1, '2018-11-17', '2019-02-05', 'Fruehdienst', '06:00:00', 1, 12, '2018-11-09 16:16:26');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `krankmeldungen`
--
ALTER TABLE `krankmeldungen`
  ADD PRIMARY KEY (`id`,`start`,`ende`),
  ADD UNIQUE KEY `pflegerID` (`pflegerID`,`stationID`,`start`,`ende`,`dienstArt`),
  ADD KEY `Station-Krankmeldung` (`stationID`),
  ADD KEY `ersatzPfleger` (`ersatzPfleger`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `krankmeldungen`
--
ALTER TABLE `krankmeldungen`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;
--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `krankmeldungen`
--
ALTER TABLE `krankmeldungen`
  ADD CONSTRAINT `Pfleger-Krankmeldung` FOREIGN KEY (`pflegerID`) REFERENCES `pfleger` (`id`),
  ADD CONSTRAINT `Station-Krankmeldung` FOREIGN KEY (`stationID`) REFERENCES `station` (`StationID`),
  ADD CONSTRAINT `ersatzPfleger` FOREIGN KEY (`ersatzPfleger`) REFERENCES `pfleger` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

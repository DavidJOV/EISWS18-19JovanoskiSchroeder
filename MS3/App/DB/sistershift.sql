-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Erstellungszeit: 20. Dez 2018 um 15:18
-- Server-Version: 5.7.23
-- PHP-Version: 7.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Datenbank: `sistershift`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Abwesenheitsmeldung`
--

CREATE TABLE `Abwesenheitsmeldung` (
  `stationID` int(11) NOT NULL,
  `MitarbeiterID` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `datumBeginn` date NOT NULL,
  `datumEnde` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Dienstplan`
--

CREATE TABLE `Dienstplan` (
  `stationID` int(9) NOT NULL,
  `id` int(9) NOT NULL,
  `datumBeginn` date NOT NULL,
  `datumEnde` date NOT NULL,
  `tag1` int(9) NOT NULL,
  `tag2` int(9) NOT NULL,
  `tag3` int(9) NOT NULL,
  `tag4` int(9) NOT NULL,
  `tag5` int(9) NOT NULL,
  `tag6` int(9) NOT NULL,
  `tag7` int(9) NOT NULL,
  `tag8` int(9) NOT NULL,
  `tag9` int(9) NOT NULL,
  `tag10` int(9) NOT NULL,
  `tag11` int(9) NOT NULL,
  `tag12` int(9) NOT NULL,
  `tag13` int(9) NOT NULL,
  `tag14` int(9) NOT NULL,
  `tag15` int(9) NOT NULL,
  `tag16` int(9) NOT NULL,
  `tag17` int(9) NOT NULL,
  `tag18` int(9) NOT NULL,
  `tag19` int(9) NOT NULL,
  `tag20` int(9) NOT NULL,
  `tag21` int(9) NOT NULL,
  `tag22` int(9) NOT NULL,
  `tag23` int(9) NOT NULL,
  `tag24` int(9) NOT NULL,
  `tag25` int(9) NOT NULL,
  `tag26` int(9) NOT NULL,
  `tag27` int(9) NOT NULL,
  `tag28` int(9) NOT NULL,
  `tag29` int(9) NOT NULL,
  `tag30` int(9) NOT NULL,
  `tag31` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Ersatzanfrage`
--

CREATE TABLE `Ersatzanfrage` (
  `stationID` int(10) NOT NULL,
  `mitarbeiterID` int(10) NOT NULL,
  `abwesenheitsmeldungID` int(10) NOT NULL,
  `datumÜbernahme` date NOT NULL,
  `schichtArt` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Ersatzeintragung`
--

CREATE TABLE `Ersatzeintragung` (
  `stationID` int(10) NOT NULL,
  `mitarbeiterID` int(10) NOT NULL,
  `abwesenheitsmeldungID` int(10) NOT NULL,
  `datumÜbernahme` date NOT NULL,
  `schichtArt` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Mitarbeiter`
--

CREATE TABLE `Mitarbeiter` (
  `id` int(10) NOT NULL,
  `stationID` int(10) NOT NULL,
  `anrede` varchar(10) NOT NULL,
  `vorname` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `beschaeftigungsArt` varchar(30) NOT NULL,
  `beschaeftigungsBeginn` date NOT NULL,
  `rolle` varchar(30) NOT NULL,
  `wunschRating` int(10) NOT NULL,
  `dienstplanRating` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Schichttausch`
--

CREATE TABLE `Schichttausch` (
  `stationID` int(11) NOT NULL,
  `mitarbeiterID` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `datumTausch` date NOT NULL,
  `tauschStatus` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Schichtzuweisung`
--

CREATE TABLE `Schichtzuweisung` (
  `id` int(20) NOT NULL,
  `datum` date NOT NULL,
  `schichtArt` varchar(30) NOT NULL,
  `mitarbeiterID1` int(10) NOT NULL,
  `mitarbeiterID2` int(10) NOT NULL,
  `mitarbeiterID3` int(10) NOT NULL,
  `mitarbeiterID4` int(10) NOT NULL,
  `mitarbeiterID5` int(10) NOT NULL,
  `mitarbeiterID6` int(10) NOT NULL,
  `mitarbeiterID7` int(10) NOT NULL,
  `mitarbeiterID8` int(10) NOT NULL,
  `mitarbeiterID9` int(10) NOT NULL,
  `mitarbeiterID10` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Station`
--

CREATE TABLE `Station` (
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
-- Tabellenstruktur für Tabelle `Tag`
--

CREATE TABLE `Tag` (
  `id` int(10) NOT NULL,
  `schichtzuweisungID1` int(10) NOT NULL,
  `schichtzuweisungID2` int(10) NOT NULL,
  `schichtzuweisungID3` int(10) NOT NULL,
  `schichtzuweisungID4` int(10) NOT NULL,
  `datum` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Wunsch`
--

CREATE TABLE `Wunsch` (
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
-- Indizes für die Tabelle `Abwesenheitsmeldung`
--
ALTER TABLE `Abwesenheitsmeldung`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `Dienstplan`
--
ALTER TABLE `Dienstplan`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `Ersatzanfrage`
--
ALTER TABLE `Ersatzanfrage`
  ADD PRIMARY KEY (`stationID`,`mitarbeiterID`,`abwesenheitsmeldungID`) KEY_BLOCK_SIZE=3;

--
-- Indizes für die Tabelle `Ersatzeintragung`
--
ALTER TABLE `Ersatzeintragung`
  ADD PRIMARY KEY (`stationID`,`mitarbeiterID`,`abwesenheitsmeldungID`);

--
-- Indizes für die Tabelle `Mitarbeiter`
--
ALTER TABLE `Mitarbeiter`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `Schichttausch`
--
ALTER TABLE `Schichttausch`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `Schichtzuweisung`
--
ALTER TABLE `Schichtzuweisung`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `Station`
--
ALTER TABLE `Station`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `Tag`
--
ALTER TABLE `Tag`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `Wunsch`
--
ALTER TABLE `Wunsch`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `Abwesenheitsmeldung`
--
ALTER TABLE `Abwesenheitsmeldung`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `Mitarbeiter`
--
ALTER TABLE `Mitarbeiter`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `Schichttausch`
--
ALTER TABLE `Schichttausch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `Schichtzuweisung`
--
ALTER TABLE `Schichtzuweisung`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `Station`
--
ALTER TABLE `Station`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `Wunsch`
--
ALTER TABLE `Wunsch`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

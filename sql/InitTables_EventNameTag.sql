CREATE TABLE `eventnametag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `charid` int(11) NOT NULL DEFAULT '0',
  `activeRed` tinyint(1) NOT NULL DEFAULT '-1',
  `activeBlue` tinyint(1) NOT NULL DEFAULT '-1',
  `activeYellow` tinyint(1) NOT NULL DEFAULT '-1',
  `activeGreen` tinyint(1) NOT NULL DEFAULT '-1',
  `activePurple` tinyint(1) NOT NULL DEFAULT '-1',
  `sRed` varchar(10) NOT NULL DEFAULT '0000000000',
  `sBlue` varchar(10) NOT NULL DEFAULT '0000000000',
  `sYellow` varchar(10) NOT NULL DEFAULT '0000000000',
  `sGreen` varchar(10)  NOT NULL DEFAULT '0000000000',
  `sPurple` varchar(10)  NOT NULL DEFAULT '0000000000',
  PRIMARY KEY (`id`)
  )
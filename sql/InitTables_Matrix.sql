DROP TABLE IF EXISTS `matrixskill`;
CREATE TABLE `matrixskill` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `charid` int(11) NOT NULL DEFAULT '0',
  `state` tinyint(1) NOT NULL DEFAULT '0',
  `coreID` int(11) NOT NULL DEFAULT '0',
  `skillID1` int(11) NOT NULL DEFAULT '0',
  `skillID2` int(11) NOT NULL DEFAULT '0',
  `skillID3` int(11) NOT NULL DEFAULT '0',
  `level` int(11) NOT NULL DEFAULT '0',
  `maxLevel` int(11) NOT NULL DEFAULT '0',
  `experience` int(11) NOT NULL DEFAULT '0',
  `crc` bigint  NOT NULL DEFAULT '0',
  `slot` int(11) NOT NULL DEFAULT '-1',
  PRIMARY KEY (`id`)
  )
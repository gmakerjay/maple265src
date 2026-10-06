ALTER TABLE characters MODIFY COLUMN partyid int DEFAULT NULL;
ALTER TABLE characters RENAME COLUMN partyid to party;

DROP TABLE IF EXISTS `party`;
CREATE TABLE `party` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `partyleaderid` int DEFAULT NULL,
  `appliable` tinyint(1) DEFAULT NULL,
  `isprivateparty` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `partymembers`;
CREATE TABLE `partymembers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `partyid` int DEFAULT NULL,
  `charid` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `job` int DEFAULT NULL,
  `subJob` int DEFAULT NULL,
  `level` int DEFAULT NULL,
  `channel` int DEFAULT NULL,
  `fieldid` int DEFAULT NULL,
  `loggedin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `partyid` (`partyid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
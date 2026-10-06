DROP TABLE IF EXISTS `mcranking`;
CREATE TABLE `mcranking` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`charID` int(11) NOT NULL DEFAULT '0',
	`charname` varchar(255) NOT NULL,
	`totalCP` int(11) NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
  )
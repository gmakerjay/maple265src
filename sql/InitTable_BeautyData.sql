DROP TABLE IF EXISTS `beautydata`;
CREATE TABLE `beautydata` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`charID` int(11) NOT NULL DEFAULT '0',
	`hairSize` int(11) NOT NULL DEFAULT '0',
	`faceSize` int(11) NOT NULL DEFAULT '0',
	`hairString` text(16383) NOT NULL, #Max Size for Safe
	`faceString` text(16383) NOT NULL, #Max Size for Safe
	PRIMARY KEY (`id`)
  )
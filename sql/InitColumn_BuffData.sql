DROP TABLE IF EXISTS `buffdata`;
CREATE TABLE `buffdata` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `charID` int(11) NOT NULL DEFAULT '0',
  `stat` varchar(255) NOT NULL,
  `itemID` int(11) NOT NULL DEFAULT '0',
  `startTime` int(11) NOT NULL DEFAULT '0',
  `value` int(11) NOT NULL DEFAULT '0',
  `duration` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
  )
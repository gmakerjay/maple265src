drop table if exists cores;
CREATE TABLE `cores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pos` int default null,
  `charid` int default null,
  `slottype` int default null,
  `coreid` int default null,
  `leftCount` int default null,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1
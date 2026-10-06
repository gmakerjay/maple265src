drop table if exists partybossentrylimits;
drop table if exists partyboss;
CREATE TABLE `partyboss` (
  `id` int NOT NULL AUTO_INCREMENT,
  `charid` int default null,
  `orderid` int default null,
  `bossname` varchar(255) DEFAULT NULL,
  `difficulty` int default null,
  `attempt` int default null,
  `lastattempttime` datetime(3) default null,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1
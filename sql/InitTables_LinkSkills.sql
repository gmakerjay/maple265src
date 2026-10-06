drop table if exists linkskills;
create table `linkskills` (
  `id` int not null auto_increment,
  `accid` int default null,
  `ownerid` int default null,
  `linkedcharid` int default null,
  `linkskillid` int default null,
  `level` int default null,
  `addeddate` datetime(3),
  PRIMARY KEY (`id`),
  KEY `accid` (`accid`)
);
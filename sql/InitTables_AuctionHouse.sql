drop table if exists `auction_items`;
create table `auction_items` (
  `id` int not null auto_increment,
  `itemid` int default null,
  `state` tinyint(1) default null,
  `owneraccid` int default null,
  `ownerid` int default null,
  `ownername` varchar(255) default null,
  `mesos` bigint default null,
  `buyer` int default null,
  `bid` bigint default null,
  `bidname` varchar(255) default null,
  `expiredtime` datetime(3) DEFAULT NULL,
  `starttime` datetime(3) DEFAULT NULL,
  primary key (`id`)
);

drop table if exists `auction_histories`;
create table `auction_histories` (
  `id` int not null auto_increment,
  `auctionid` int default null,
  `itemid` int default null,
  `refund` tinyint(1) default null,
  `owneraccid` int default null,
  `ownerid` int default null,
  `ownername` varchar(255) default null,
  `historytype` int default null,
  `mesos` bigint default null,
  `buyer` int default null,
  `bid` bigint default null,
  `bidname` varchar(255) default null,
  `expiredtime` datetime(3) DEFAULT NULL,
  `buytime` datetime(3) DEFAULT NULL,
  `starttime` datetime(3) DEFAULT NULL,
  primary key (`id`)
);
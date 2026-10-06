DROP TABLE IF EXISTS `vote_logs`;
CREATE TABLE `vote_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time_1` datetime(3),
  `time_2` varchar(255),
  `username` varchar(255),
  `hasGain` tinyint,
  PRIMARY KEY (`id`)
  )
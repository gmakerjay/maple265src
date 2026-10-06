DROP TABLE IF EXISTS `dailygift`;
CREATE TABLE `dailygift` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`accountID` int(11) DEFAULT NULL,
   	`date` bigint DEFAULT NULL,
	`dateComplete` int(11) NOT NULL DEFAULT '0',
    `isClaim` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
  );

DROP TABLE IF EXISTS `dailycoin`;
CREATE TABLE `dailycoin` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`charID` int(11) DEFAULT NULL,
    `point` int(11) DEFAULT NULL,
    `coin` int(11) DEFAULT NULL,
    `isLock` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
  );
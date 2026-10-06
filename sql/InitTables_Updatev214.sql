ALTER TABLE `rewardinfo`
#ADD COLUMN `starttime` DATETIME(3) NULL DEFAULT NULL AFTER `description`,
#ADD COLUMN `endtime` DATETIME(3) NULL DEFAULT NULL AFTER `starttime`,
CHANGE COLUMN `meso` `meso` MEDIUMTEXT NULL;

ALTER TABLE `equips`
CHANGE COLUMN `exgradeoption` `exgradeoption` BIGINT NULL DEFAULT NULL;

ALTER TABLE `accounts`
ADD COLUMN `achievementPoint`INT NULL DEFAULT '0' AFTER `nxCredit`;

UPDATE characters SET guild = NULL;

DROP TABLE IF EXISTS `gradenames`;
DROP TABLE IF EXISTS `guildgrades`;
CREATE TABLE `guildgrades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gradename` varchar(255) DEFAULT NULL,
  `gradepermission` int DEFAULT NULL,
  `graderole` int DEFAULT NULL,
  `guildid` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `guildid` (`guildid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `guildmembers`;
CREATE TABLE `guildmembers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `charid` int DEFAULT NULL,
  `guildid` int DEFAULT NULL,
  `grade` int DEFAULT NULL,
  `alliancegrade` int DEFAULT NULL,
  `commitment` int DEFAULT NULL,
  `daycommitment` int DEFAULT NULL,
  `igp` int DEFAULT NULL,
  `commitmentinctime` datetime(3) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `job` int DEFAULT NULL,
  `level` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `guildid` (`guildid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `guildrequestors`;
CREATE TABLE `guildrequestors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `requestors_id` int DEFAULT NULL,
  `charid` int DEFAULT NULL,
  `guildid` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `job` int DEFAULT NULL,
  `level` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `guildid` (`guildid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `guilds`;
CREATE TABLE `guilds` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `leaderid` int DEFAULT NULL,
  `worldid` int DEFAULT NULL,
  `markbg` int DEFAULT NULL,
  `markbgcolor` int DEFAULT NULL,
  `mark` int DEFAULT NULL,
  `markcolor` int DEFAULT NULL,
  `customemblem` BLOB DEFAULT NULL ,
  `maxmembers` int DEFAULT NULL,
  `notice` varchar(255) DEFAULT NULL,
  `points` int DEFAULT NULL,
  `seasonpoints` int DEFAULT NULL,
  `allianceid` int DEFAULT NULL,
  `level` int DEFAULT NULL,
  `guildrank` int DEFAULT NULL,
  `ggp` int DEFAULT NULL,
  `appliable` tinyint(1) DEFAULT NULL,
  `joinsetting` int DEFAULT NULL,
  `reqlevel` int DEFAULT NULL,
  `bbsNotice` int DEFAULT NULL,
  `battleSp` int DEFAULT NULL,
  `fk_allianceid` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `guildskills`;
CREATE TABLE `guildskills` (
  `guildskill_id` int NOT NULL AUTO_INCREMENT,
  `skills_id` int DEFAULT NULL,
  `guild_id` int DEFAULT NULL,
  `skillid` int DEFAULT NULL,
  `fk_guildskillid` int DEFAULT NULL,
  PRIMARY KEY (`guildskill_id`),
  KEY `guild_id` (`guild_id`),
  KEY `fk_guildskillid` (`fk_guildskillid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `guildskill`;
CREATE TABLE `guildskill` (
  `id` int NOT NULL AUTO_INCREMENT,
  `skillid` int DEFAULT NULL,
  `level` int DEFAULT NULL,
  `expiredate` datetime(3) DEFAULT NULL,
  `buycharactername` varchar(255) DEFAULT NULL,
  `extendcharactername` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `cs_items`;
DROP TABLE IF EXISTS `cs_categories`;
DROP TABLE IF EXISTS `party`;
DROP TABLE IF EXISTS `partymembers`;

CREATE TABLE `matrixslot` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `charid` INT NOT NULL DEFAULT '0',
  `level` INT NOT NULL DEFAULT '0',
  `experience` INT NOT NULL DEFAULT '0',
  `slot` INT NOT NULL DEFAULT '-1',
  `position` INT NOT NULL DEFAULT '-1',
  `unlocked` TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `achievement_ranks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `accid` int DEFAULT NULL,
  `rank` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  `unlocktime` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `achievement_datas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `accid` int DEFAULT NULL,
  `infoid` int DEFAULT NULL,
  `missionid` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  `msg` varchar(255) DEFAULT NULL,
  `unlocktime` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `union` (
  `id` int NOT NULL AUTO_INCREMENT,
  `accid` int DEFAULT NULL,
  `unioncoin` int DEFAULT NULL,
  `unionrank` int DEFAULT NULL,
  `presets` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `unionboard` (
  `id` int NOT NULL AUTO_INCREMENT,
  `unionid` int DEFAULT NULL,
  `unionpower` int DEFAULT NULL,
  `uniondamage` int DEFAULT NULL,
  `synergygrids` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `unionmember` (
  `id` int NOT NULL AUTO_INCREMENT,
  `unionboardid` int DEFAULT NULL,
  `type` int DEFAULT NULL,
  `charID` int DEFAULT NULL,
  `gridPos` int DEFAULT NULL,
  `gridRotation` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE `items`
ADD COLUMN `bossrewardid`INT NULL DEFAULT '0' AFTER `attribute`,
ADD COLUMN `mobtemplateid`INT NULL DEFAULT '0' AFTER `bossrewardid`,
ADD COLUMN `partysize`INT NULL DEFAULT '0' AFTER `mobtemplateid`,
ADD COLUMN `price`INT NULL DEFAULT '0' AFTER `partysize`;

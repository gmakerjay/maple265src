ALTER TABLE `equips` 
ADD COLUMN `arcaneid` BIGINT NULL DEFAULT NULL AFTER `ijump`;

DROP TABLE IF EXISTS `equip_arcane`;
CREATE TABLE `equip_arcane` (
  `arcaneid` bigint NOT NULL AUTO_INCREMENT,
  `iarc` smallint DEFAULT NULL,
  `arcexp` int DEFAULT NULL,
  `arclevel` int DEFAULT NULL,
  PRIMARY KEY (`arcaneid`)
);
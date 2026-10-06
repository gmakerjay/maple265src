ALTER TABLE `items`
ADD COLUMN `auctionHouseStatus` tinyint(1) NULL DEFAULT 0 AFTER `trunkid`;
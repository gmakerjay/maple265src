ALTER TABLE equips
DROP COLUMN expireonlogout;

ALTER TABLE items
ADD COLUMN expireonlogout TINYINT(1) NULL DEFAULT '0' AFTER quantity;
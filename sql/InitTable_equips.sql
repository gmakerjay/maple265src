ALTER TABLE equips
-- Arcane Table
ADD COLUMN `arcane_stat` smallint DEFAULT 0, 
ADD COLUMN `arcane_exp` int DEFAULT 0,
ADD COLUMN `arcane_level` int DEFAULT 0,
-- Flame Table
ADD COLUMN `flame_str` smallint DEFAULT 0,
ADD COLUMN `flame_dex` smallint DEFAULT 0,
ADD COLUMN `flame_int` smallint DEFAULT 0,
ADD COLUMN `flame_luk` smallint DEFAULT 0,
ADD COLUMN `flame_pad` smallint DEFAULT 0,
ADD COLUMN `flame_mad` smallint DEFAULT 0,
ADD COLUMN `flame_pdd` smallint DEFAULT 0,
ADD COLUMN `flame_hp` smallint DEFAULT 0,
ADD COLUMN `flame_mp` smallint DEFAULT 0,
ADD COLUMN `flame_speed` smallint DEFAULT 0,
ADD COLUMN `flame_jump` smallint DEFAULT 0,
ADD COLUMN `flame_allStatR` smallint DEFAULT 0,
ADD COLUMN `flame_bossDamageR` smallint DEFAULT 0,
ADD COLUMN `flame_damageR` smallint DEFAULT 0,
ADD COLUMN `flame_reduceReqLevel` smallint DEFAULT 0;
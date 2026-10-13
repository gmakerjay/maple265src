/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MariaDB
 Source Server Version : 110802 (11.8.2-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : 123

 Target Server Type    : MariaDB
 Target Server Version : 110802 (11.8.2-MariaDB)
 File Encoding         : 65001

 Date: 15/12/2025 19:39:01
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for acc_and_char_log
-- ----------------------------
DROP TABLE IF EXISTS `acc_and_char_log`;
CREATE TABLE `acc_and_char_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `acc_id` int(11) NOT NULL,
  `char_id` int(11) NOT NULL,
  `event_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL COMMENT '事件名稱',
  `date_created` datetime NOT NULL DEFAULT current_timestamp() COMMENT '資料建立時間',
  `last_updated` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '最後更新時間',
  `count` int(11) NULL DEFAULT 0 COMMENT '記錄次數',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 65100 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for acc_and_char_log_copy1
-- ----------------------------
DROP TABLE IF EXISTS `acc_and_char_log_copy1`;
CREATE TABLE `acc_and_char_log_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `acc_id` int(11) NOT NULL,
  `char_id` int(11) NOT NULL,
  `event_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL COMMENT '事件名稱',
  `date_created` datetime NOT NULL DEFAULT current_timestamp() COMMENT '資料建立時間',
  `last_updated` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '最後更新時間',
  `count` int(11) NULL DEFAULT 0 COMMENT '記錄次數',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 65100 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `password` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `spw` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `salt` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `gender` tinyint(4) NOT NULL DEFAULT 10,
  `authority` tinyint(4) NOT NULL DEFAULT 0,
  `login_stat` tinyint(4) NOT NULL DEFAULT 0,
  `last_login` datetime NOT NULL DEFAULT current_timestamp(),
  `create_date` datetime NOT NULL DEFAULT current_timestamp(),
  `teacher_aid` int(11) NOT NULL DEFAULT -1,
  `teacher_cid` int(11) NOT NULL DEFAULT -1,
  `apprentice_cid` int(11) NOT NULL DEFAULT -1,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for account_ban
-- ----------------------------
DROP TABLE IF EXISTS `account_ban`;
CREATE TABLE `account_ban`  (
  `account_id` int(11) NOT NULL,
  `ban_type` tinyint(4) NOT NULL,
  `unban_date` datetime NOT NULL,
  PRIMARY KEY (`account_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for account_ban_copy1
-- ----------------------------
DROP TABLE IF EXISTS `account_ban_copy1`;
CREATE TABLE `account_ban_copy1`  (
  `account_id` int(11) NOT NULL,
  `ban_type` tinyint(4) NOT NULL,
  `unban_date` datetime NOT NULL,
  PRIMARY KEY (`account_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for account_block
-- ----------------------------
DROP TABLE IF EXISTS `account_block`;
CREATE TABLE `account_block`  (
  `account_id` int(11) NOT NULL,
  `block_type` tinyint(4) NULL DEFAULT NULL,
  `unblock_date` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`account_id`) USING BTREE,
  INDEX `account_id`(`account_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for account_block_copy1
-- ----------------------------
DROP TABLE IF EXISTS `account_block_copy1`;
CREATE TABLE `account_block_copy1`  (
  `account_id` int(11) NOT NULL,
  `block_type` tinyint(4) NULL DEFAULT NULL,
  `unblock_date` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`account_id`) USING BTREE,
  INDEX `account_id`(`account_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for account_cash
-- ----------------------------
DROP TABLE IF EXISTS `account_cash`;
CREATE TABLE `account_cash`  (
  `account_id` int(11) NOT NULL,
  `world_id` int(11) NOT NULL DEFAULT 0,
  `cash` int(11) NOT NULL DEFAULT 0,
  `balance` int(11) NOT NULL DEFAULT 0,
  `point` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`account_id`, `world_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for account_cash_copy1
-- ----------------------------
DROP TABLE IF EXISTS `account_cash_copy1`;
CREATE TABLE `account_cash_copy1`  (
  `account_id` int(11) NOT NULL,
  `world_id` int(11) NOT NULL DEFAULT 0,
  `cash` int(11) NOT NULL DEFAULT 0,
  `balance` int(11) NOT NULL DEFAULT 0,
  `point` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`account_id`, `world_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for account_char_slot
-- ----------------------------
DROP TABLE IF EXISTS `account_char_slot`;
CREATE TABLE `account_char_slot`  (
  `account_id` int(11) NOT NULL,
  `world_id` int(11) NOT NULL,
  `slot_count` int(11) NOT NULL DEFAULT 4,
  `buy_char_count` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`account_id`, `world_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for account_char_slot_copy1
-- ----------------------------
DROP TABLE IF EXISTS `account_char_slot_copy1`;
CREATE TABLE `account_char_slot_copy1`  (
  `account_id` int(11) NOT NULL,
  `world_id` int(11) NOT NULL,
  `slot_count` int(11) NOT NULL DEFAULT 4,
  `buy_char_count` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`account_id`, `world_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for account_copy1
-- ----------------------------
DROP TABLE IF EXISTS `account_copy1`;
CREATE TABLE `account_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `password` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `spw` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `salt` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `gender` tinyint(4) NOT NULL DEFAULT 10,
  `authority` tinyint(4) NOT NULL DEFAULT 0,
  `login_stat` tinyint(4) NOT NULL DEFAULT 0,
  `last_login` datetime NOT NULL DEFAULT current_timestamp(),
  `create_date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 271 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for account_event
-- ----------------------------
DROP TABLE IF EXISTS `account_event`;
CREATE TABLE `account_event`  (
  `account_id` int(11) NOT NULL,
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL DEFAULT '',
  `value` int(11) NOT NULL DEFAULT 0,
  `reset_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`account_id`, `key`) USING BTREE,
  INDEX `characterid`(`account_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = gb2312 COLLATE = gb2312_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for account_event_copy1
-- ----------------------------
DROP TABLE IF EXISTS `account_event_copy1`;
CREATE TABLE `account_event_copy1`  (
  `account_id` int(11) NOT NULL,
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL DEFAULT '',
  `value` int(11) NOT NULL DEFAULT 0,
  `reset_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`account_id`, `key`) USING BTREE,
  INDEX `characterid`(`account_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = gb2312 COLLATE = gb2312_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for account_quick_login
-- ----------------------------
DROP TABLE IF EXISTS `account_quick_login`;
CREATE TABLE `account_quick_login`  (
  `account_id` int(11) NOT NULL,
  `character_id` int(11) NOT NULL DEFAULT 0,
  `collect` tinyint(4) NOT NULL DEFAULT 0,
  `background` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`account_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for account_store_slot
-- ----------------------------
DROP TABLE IF EXISTS `account_store_slot`;
CREATE TABLE `account_store_slot`  (
  `account_id` int(11) NOT NULL,
  `world_id` int(11) NOT NULL,
  `slot_count` int(11) NOT NULL,
  PRIMARY KEY (`account_id`, `world_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for alice_action
-- ----------------------------
DROP TABLE IF EXISTS `alice_action`;
CREATE TABLE `alice_action`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `aid` int(11) NULL DEFAULT NULL,
  `cid` int(11) NULL DEFAULT NULL,
  `cname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `stat` tinyint(4) NULL DEFAULT NULL,
  `equip` int(11) NULL DEFAULT NULL,
  `money` int(11) NULL DEFAULT NULL,
  `type` tinyint(4) NULL DEFAULT NULL,
  `itemid` int(11) NULL DEFAULT NULL,
  `num` int(11) NULL DEFAULT NULL,
  `onlyid` bigint(20) NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `ruc` tinyint(4) NOT NULL DEFAULT 0,
  `cuc` tinyint(4) NOT NULL DEFAULT 0,
  `baseStr` smallint(6) NOT NULL DEFAULT 0,
  `baseDex` smallint(6) NOT NULL DEFAULT 0,
  `baseInt` smallint(6) NOT NULL DEFAULT 0,
  `baseLuk` smallint(6) NOT NULL DEFAULT 0,
  `maxHp` smallint(6) NOT NULL DEFAULT 0,
  `maxMp` smallint(6) NOT NULL DEFAULT 0,
  `pad` smallint(6) NOT NULL DEFAULT 0,
  `mad` smallint(6) NOT NULL DEFAULT 0,
  `pdd` smallint(6) NOT NULL DEFAULT 0,
  `craft` smallint(6) NOT NULL DEFAULT 0,
  `speed` smallint(6) NOT NULL DEFAULT 0,
  `jump` smallint(6) NOT NULL DEFAULT 0,
  `attribute` int(11) NOT NULL DEFAULT 0,
  `levelUpType` tinyint(4) NOT NULL DEFAULT 0,
  `incSkill` int(11) NOT NULL DEFAULT 0,
  `level` tinyint(4) NOT NULL DEFAULT 0,
  `exp` bigint(20) NOT NULL DEFAULT 0,
  `durability` int(11) NOT NULL DEFAULT 0,
  `iuc` int(11) NOT NULL DEFAULT 0,
  `puc` int(11) NOT NULL DEFAULT 0,
  `pvpDamage` smallint(6) NOT NULL DEFAULT 0,
  `reduceReq` tinyint(4) NOT NULL DEFAULT 0,
  `specialAttribute` smallint(6) NOT NULL DEFAULT 0,
  `durabilityMax` int(11) NOT NULL DEFAULT 0,
  `incReq` tinyint(4) NOT NULL DEFAULT 0,
  `growthEnchant` tinyint(4) NOT NULL DEFAULT 0,
  `enchant` tinyint(4) NOT NULL DEFAULT 0,
  `bossDamageR` smallint(6) NOT NULL DEFAULT 0,
  `ignorePdr` smallint(6) NOT NULL DEFAULT 0,
  `damageR` smallint(6) NOT NULL DEFAULT 0,
  `statRate` smallint(6) NOT NULL DEFAULT 0,
  `cuttable` tinyint(4) NOT NULL DEFAULT -1,
  `exGradeOption` bigint(20) NOT NULL DEFAULT 0,
  `itemState` int(11) NOT NULL DEFAULT 0,
  `euc` tinyint(4) NOT NULL DEFAULT 0,
  `reuc` tinyint(4) NOT NULL DEFAULT 0,
  `excelStr` smallint(6) NOT NULL DEFAULT 0,
  `excelDex` smallint(6) NOT NULL DEFAULT 0,
  `excelInt` smallint(6) NOT NULL DEFAULT 0,
  `excelLuk` smallint(6) NOT NULL DEFAULT 0,
  `excelMaxHp` smallint(6) NOT NULL DEFAULT 0,
  `excelMaxMp` smallint(6) NOT NULL DEFAULT 0,
  `excelPad` smallint(6) NOT NULL DEFAULT 0,
  `excelMad` smallint(6) NOT NULL DEFAULT 0,
  `excelPdd` smallint(6) NOT NULL DEFAULT 0,
  `excelCraft` smallint(6) NOT NULL DEFAULT 0,
  `excelSpeed` smallint(6) NOT NULL DEFAULT 0,
  `excelJump` smallint(6) NOT NULL DEFAULT 0,
  `grade` tinyint(4) NOT NULL DEFAULT 0,
  `chuc` tinyint(4) NOT NULL DEFAULT 0,
  `option1` int(11) NOT NULL DEFAULT 0,
  `option1Lv` tinyint(4) NOT NULL DEFAULT 0,
  `option2` int(11) NOT NULL DEFAULT 0,
  `option2Lv` tinyint(4) NOT NULL DEFAULT 0,
  `option3` int(11) NOT NULL DEFAULT 0,
  `option3Lv` tinyint(4) NOT NULL DEFAULT 0,
  `option4` int(11) NOT NULL DEFAULT 0,
  `option4Lv` tinyint(4) NOT NULL DEFAULT 0,
  `option5` int(11) NOT NULL DEFAULT 0,
  `option5Lv` tinyint(4) NOT NULL DEFAULT 0,
  `option6` int(11) NOT NULL DEFAULT 0,
  `option6Lv` tinyint(4) NOT NULL DEFAULT 0,
  `skin` int(11) NOT NULL DEFAULT 0,
  `socketGrade` smallint(6) NOT NULL DEFAULT 0,
  `socket1` smallint(6) NOT NULL DEFAULT 0,
  `socket2` smallint(6) NOT NULL DEFAULT 0,
  `socket3` smallint(6) NOT NULL DEFAULT 0,
  `color` int(11) NOT NULL DEFAULT 0,
  `soulOptionId` smallint(6) NOT NULL DEFAULT 0,
  `soulSocket` smallint(6) NOT NULL DEFAULT 0,
  `soulOption` smallint(6) NOT NULL DEFAULT 0,
  `arc` smallint(6) NOT NULL DEFAULT 0,
  `arcExp` int(11) NOT NULL DEFAULT 0,
  `arcLevel` smallint(6) NOT NULL DEFAULT 0,
  `aut` smallint(6) NOT NULL DEFAULT 0,
  `autExp` int(11) NOT NULL DEFAULT 0,
  `autLevel` smallint(6) NOT NULL DEFAULT 0,
  `startdate` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 192 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for alice_action_copy1
-- ----------------------------
DROP TABLE IF EXISTS `alice_action_copy1`;
CREATE TABLE `alice_action_copy1`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `aid` int(11) NULL DEFAULT NULL,
  `cid` int(11) NULL DEFAULT NULL,
  `cname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `stat` tinyint(4) NULL DEFAULT NULL,
  `equip` int(11) NULL DEFAULT NULL,
  `money` int(11) NULL DEFAULT NULL,
  `type` tinyint(4) NULL DEFAULT NULL,
  `itemid` int(11) NULL DEFAULT NULL,
  `num` int(11) NULL DEFAULT NULL,
  `onlyid` bigint(20) NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `ruc` tinyint(4) NOT NULL DEFAULT 0,
  `cuc` tinyint(4) NOT NULL DEFAULT 0,
  `baseStr` smallint(6) NOT NULL DEFAULT 0,
  `baseDex` smallint(6) NOT NULL DEFAULT 0,
  `baseInt` smallint(6) NOT NULL DEFAULT 0,
  `baseLuk` smallint(6) NOT NULL DEFAULT 0,
  `maxHp` smallint(6) NOT NULL DEFAULT 0,
  `maxMp` smallint(6) NOT NULL DEFAULT 0,
  `pad` smallint(6) NOT NULL DEFAULT 0,
  `mad` smallint(6) NOT NULL DEFAULT 0,
  `pdd` smallint(6) NOT NULL DEFAULT 0,
  `craft` smallint(6) NOT NULL DEFAULT 0,
  `speed` smallint(6) NOT NULL DEFAULT 0,
  `jump` smallint(6) NOT NULL DEFAULT 0,
  `attribute` int(11) NOT NULL DEFAULT 0,
  `levelUpType` tinyint(4) NOT NULL DEFAULT 0,
  `incSkill` int(11) NOT NULL DEFAULT 0,
  `level` tinyint(4) NOT NULL DEFAULT 0,
  `exp` bigint(20) NOT NULL DEFAULT 0,
  `durability` int(11) NOT NULL DEFAULT 0,
  `iuc` int(11) NOT NULL DEFAULT 0,
  `puc` int(11) NOT NULL DEFAULT 0,
  `pvpDamage` smallint(6) NOT NULL DEFAULT 0,
  `reduceReq` tinyint(4) NOT NULL DEFAULT 0,
  `specialAttribute` smallint(6) NOT NULL DEFAULT 0,
  `durabilityMax` int(11) NOT NULL DEFAULT 0,
  `incReq` tinyint(4) NOT NULL DEFAULT 0,
  `growthEnchant` tinyint(4) NOT NULL DEFAULT 0,
  `enchant` tinyint(4) NOT NULL DEFAULT 0,
  `bossDamageR` smallint(6) NOT NULL DEFAULT 0,
  `ignorePdr` smallint(6) NOT NULL DEFAULT 0,
  `damageR` smallint(6) NOT NULL DEFAULT 0,
  `statRate` smallint(6) NOT NULL DEFAULT 0,
  `cuttable` tinyint(4) NOT NULL DEFAULT -1,
  `exGradeOption` bigint(20) NOT NULL DEFAULT 0,
  `itemState` int(11) NOT NULL DEFAULT 0,
  `euc` tinyint(4) NOT NULL DEFAULT 0,
  `reuc` tinyint(4) NOT NULL DEFAULT 0,
  `excelStr` smallint(6) NOT NULL DEFAULT 0,
  `excelDex` smallint(6) NOT NULL DEFAULT 0,
  `excelInt` smallint(6) NOT NULL DEFAULT 0,
  `excelLuk` smallint(6) NOT NULL DEFAULT 0,
  `excelMaxHp` smallint(6) NOT NULL DEFAULT 0,
  `excelMaxMp` smallint(6) NOT NULL DEFAULT 0,
  `excelPad` smallint(6) NOT NULL DEFAULT 0,
  `excelMad` smallint(6) NOT NULL DEFAULT 0,
  `excelPdd` smallint(6) NOT NULL DEFAULT 0,
  `excelCraft` smallint(6) NOT NULL DEFAULT 0,
  `excelSpeed` smallint(6) NOT NULL DEFAULT 0,
  `excelJump` smallint(6) NOT NULL DEFAULT 0,
  `grade` tinyint(4) NOT NULL DEFAULT 0,
  `chuc` tinyint(4) NOT NULL DEFAULT 0,
  `option1` int(11) NOT NULL DEFAULT 0,
  `option1Lv` tinyint(4) NOT NULL DEFAULT 0,
  `option2` int(11) NOT NULL DEFAULT 0,
  `option2Lv` tinyint(4) NOT NULL DEFAULT 0,
  `option3` int(11) NOT NULL DEFAULT 0,
  `option3Lv` tinyint(4) NOT NULL DEFAULT 0,
  `option4` int(11) NOT NULL DEFAULT 0,
  `option4Lv` tinyint(4) NOT NULL DEFAULT 0,
  `option5` int(11) NOT NULL DEFAULT 0,
  `option5Lv` tinyint(4) NOT NULL DEFAULT 0,
  `option6` int(11) NOT NULL DEFAULT 0,
  `option6Lv` tinyint(4) NOT NULL DEFAULT 0,
  `skin` int(11) NOT NULL DEFAULT 0,
  `socketGrade` smallint(6) NOT NULL DEFAULT 0,
  `socket1` smallint(6) NOT NULL DEFAULT 0,
  `socket2` smallint(6) NOT NULL DEFAULT 0,
  `socket3` smallint(6) NOT NULL DEFAULT 0,
  `color` int(11) NOT NULL DEFAULT 0,
  `soulOptionId` smallint(6) NOT NULL DEFAULT 0,
  `soulSocket` smallint(6) NOT NULL DEFAULT 0,
  `soulOption` smallint(6) NOT NULL DEFAULT 0,
  `arc` smallint(6) NOT NULL DEFAULT 0,
  `arcExp` int(11) NOT NULL DEFAULT 0,
  `arcLevel` smallint(6) NOT NULL DEFAULT 0,
  `aut` smallint(6) NOT NULL DEFAULT 0,
  `autExp` int(11) NOT NULL DEFAULT 0,
  `autLevel` smallint(6) NOT NULL DEFAULT 0,
  `startdate` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 192 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for alice_action_log
-- ----------------------------
DROP TABLE IF EXISTS `alice_action_log`;
CREATE TABLE `alice_action_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state` int(11) NULL DEFAULT NULL,
  `aid` int(11) NULL DEFAULT NULL,
  `cid` int(11) NULL DEFAULT NULL,
  `cname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `buyer_id` int(11) NULL DEFAULT NULL,
  `buyer_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `onlyid` int(11) NULL DEFAULT NULL,
  `itemid` int(11) NULL DEFAULT NULL,
  `itemname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `num` int(11) NULL DEFAULT NULL,
  `date` datetime NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for auction_collection
-- ----------------------------
DROP TABLE IF EXISTS `auction_collection`;
CREATE TABLE `auction_collection`  (
  `character_id` int(11) NULL DEFAULT NULL,
  `auction_id` int(11) NULL DEFAULT NULL,
  INDEX `charcter_id`(`character_id` ASC) USING BTREE,
  INDEX `charcter_id_2`(`character_id` ASC, `auction_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for auction_collection_copy1
-- ----------------------------
DROP TABLE IF EXISTS `auction_collection_copy1`;
CREATE TABLE `auction_collection_copy1`  (
  `character_id` int(11) NULL DEFAULT NULL,
  `auction_id` int(11) NULL DEFAULT NULL,
  INDEX `charcter_id`(`character_id` ASC) USING BTREE,
  INDEX `charcter_id_2`(`character_id` ASC, `auction_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for auction_info
-- ----------------------------
DROP TABLE IF EXISTS `auction_info`;
CREATE TABLE `auction_info`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `world_id` int(11) NOT NULL DEFAULT 0,
  `account_id` int(11) NOT NULL DEFAULT 0,
  `seller_id` int(11) NOT NULL DEFAULT 0,
  `seller` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `buyer_id` int(11) NOT NULL DEFAULT 0,
  `buyer` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `type` int(11) NOT NULL DEFAULT 0,
  `state` int(11) NOT NULL DEFAULT 0,
  `price` bigint(20) NOT NULL DEFAULT 0,
  `deposit` bigint(20) NOT NULL DEFAULT 0,
  `expire_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `start_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `deal_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `item_id` int(11) NOT NULL DEFAULT 0,
  `item_type` tinyint(4) NOT NULL DEFAULT 0,
  `item_entity_id` bigint(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `world`(`world_id` ASC, `type` ASC, `state` ASC) USING BTREE,
  INDEX `world_2`(`world_id` ASC, `state` ASC, `seller_id` ASC) USING BTREE,
  INDEX `world_3`(`world_id` ASC, `type` ASC, `state` ASC, `item_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for auction_info_copy1
-- ----------------------------
DROP TABLE IF EXISTS `auction_info_copy1`;
CREATE TABLE `auction_info_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `world_id` int(11) NOT NULL DEFAULT 0,
  `account_id` int(11) NOT NULL DEFAULT 0,
  `seller_id` int(11) NOT NULL DEFAULT 0,
  `seller` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `buyer_id` int(11) NOT NULL DEFAULT 0,
  `buyer` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `type` int(11) NOT NULL DEFAULT 0,
  `state` int(11) NOT NULL DEFAULT 0,
  `price` bigint(20) NOT NULL DEFAULT 0,
  `deposit` bigint(20) NOT NULL DEFAULT 0,
  `expire_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `start_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `deal_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `item_id` int(11) NOT NULL DEFAULT 0,
  `item_type` tinyint(4) NOT NULL DEFAULT 0,
  `item_entity_id` bigint(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `world`(`world_id` ASC, `type` ASC, `state` ASC) USING BTREE,
  INDEX `world_2`(`world_id` ASC, `state` ASC, `seller_id` ASC) USING BTREE,
  INDEX `world_3`(`world_id` ASC, `type` ASC, `state` ASC, `item_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 670 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for auction_log
-- ----------------------------
DROP TABLE IF EXISTS `auction_log`;
CREATE TABLE `auction_log`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `world_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `character_id` int(11) NOT NULL,
  `auction_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `price` bigint(20) NOT NULL,
  `date` datetime NOT NULL,
  `deposit` bigint(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for auction_log_copy1
-- ----------------------------
DROP TABLE IF EXISTS `auction_log_copy1`;
CREATE TABLE `auction_log_copy1`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `world_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `character_id` int(11) NOT NULL,
  `auction_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `price` bigint(20) NOT NULL,
  `date` datetime NOT NULL,
  `deposit` bigint(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 728 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for ban_ip
-- ----------------------------
DROP TABLE IF EXISTS `ban_ip`;
CREATE TABLE `ban_ip`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(17) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `unban_date` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ban_ip_copy1
-- ----------------------------
DROP TABLE IF EXISTS `ban_ip_copy1`;
CREATE TABLE `ban_ip_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(17) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `unban_date` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ban_mac
-- ----------------------------
DROP TABLE IF EXISTS `ban_mac`;
CREATE TABLE `ban_mac`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mac` varchar(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `unban_date` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ban_mac_copy1
-- ----------------------------
DROP TABLE IF EXISTS `ban_mac_copy1`;
CREATE TABLE `ban_mac_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mac` varchar(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `unban_date` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for bossrank
-- ----------------------------
DROP TABLE IF EXISTS `bossrank`;
CREATE TABLE `bossrank`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime NULL DEFAULT NULL,
  `info` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for bossrank_copy1
-- ----------------------------
DROP TABLE IF EXISTS `bossrank_copy1`;
CREATE TABLE `bossrank_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime NULL DEFAULT NULL,
  `info` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for c_fast
-- ----------------------------
DROP TABLE IF EXISTS `c_fast`;
CREATE TABLE `c_fast`  (
  `id` int(11) NOT NULL,
  `account_id` int(11) NULL DEFAULT NULL,
  `返回主城` int(255) NULL DEFAULT NULL,
  `返回主城YN` int(11) NULL DEFAULT NULL,
  `返回主城SX` int(11) NULL DEFAULT NULL,
  `快捷傳送` int(255) NULL DEFAULT NULL,
  `快捷傳送YN` int(11) NULL DEFAULT NULL,
  `快捷傳送SX` int(11) NULL DEFAULT NULL,
  `首領傳送` int(255) NULL DEFAULT NULL,
  `首領傳送YN` int(11) NULL DEFAULT NULL,
  `首領傳送SX` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for c_fast_copy1
-- ----------------------------
DROP TABLE IF EXISTS `c_fast_copy1`;
CREATE TABLE `c_fast_copy1`  (
  `id` int(11) NOT NULL,
  `account_id` int(11) NULL DEFAULT NULL,
  `返回主城` int(255) NULL DEFAULT NULL,
  `返回主城YN` int(11) NULL DEFAULT NULL,
  `返回主城SX` int(11) NULL DEFAULT NULL,
  `快捷傳送` int(255) NULL DEFAULT NULL,
  `快捷傳送YN` int(11) NULL DEFAULT NULL,
  `快捷傳送SX` int(11) NULL DEFAULT NULL,
  `首領傳送` int(255) NULL DEFAULT NULL,
  `首領傳送YN` int(11) NULL DEFAULT NULL,
  `首領傳送SX` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for c_keyvalue
-- ----------------------------
DROP TABLE IF EXISTS `c_keyvalue`;
CREATE TABLE `c_keyvalue`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `value` varchar(999) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for c_keyvalue_copy1
-- ----------------------------
DROP TABLE IF EXISTS `c_keyvalue_copy1`;
CREATE TABLE `c_keyvalue_copy1`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `value` varchar(999) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for c_robotrequest
-- ----------------------------
DROP TABLE IF EXISTS `c_robotrequest`;
CREATE TABLE `c_robotrequest`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `request` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL DEFAULT '',
  `parameter` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL DEFAULT '',
  `result_ch1` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `done_ch1` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `result_ch2` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `done_ch2` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `result_ch3` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `done_ch3` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `result_ch4` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `done_ch4` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `result_ch5` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `done_ch5` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `result_ch6` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `done_ch6` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `result_ch7` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `done_ch7` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `result_ch8` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `done_ch8` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `result_ch9` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `done_ch9` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `result_ch10` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `done_ch10` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `qq` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL DEFAULT '',
  `time` timestamp NOT NULL DEFAULT current_timestamp(),
  `issend` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`, `done_ch8`, `done_ch10`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15148 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for c_robotrequest_copy1
-- ----------------------------
DROP TABLE IF EXISTS `c_robotrequest_copy1`;
CREATE TABLE `c_robotrequest_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `request` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL DEFAULT '',
  `parameter` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL DEFAULT '',
  `result_ch1` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `done_ch1` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `result_ch2` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `done_ch2` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `result_ch3` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `done_ch3` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `result_ch4` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `done_ch4` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `result_ch5` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `done_ch5` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `result_ch6` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `done_ch6` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `result_ch7` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `done_ch7` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `result_ch8` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `done_ch8` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `result_ch9` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `done_ch9` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `result_ch10` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `done_ch10` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `qq` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL DEFAULT '',
  `time` timestamp NOT NULL DEFAULT current_timestamp(),
  `issend` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`, `done_ch8`, `done_ch10`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15148 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for c_setting
-- ----------------------------
DROP TABLE IF EXISTS `c_setting`;
CREATE TABLE `c_setting`  (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `charid` int(10) NOT NULL,
  `Box_Summary` int(11) NOT NULL DEFAULT 1,
  `Boss_Animation` int(11) NOT NULL DEFAULT 0,
  `Daily_Remind` int(11) NOT NULL DEFAULT 0,
  `Fly` int(11) NOT NULL DEFAULT 0,
  `Pet_Food` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for c_setting_copy1
-- ----------------------------
DROP TABLE IF EXISTS `c_setting_copy1`;
CREATE TABLE `c_setting_copy1`  (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `charid` int(10) NOT NULL,
  `Box_Summary` int(11) NOT NULL DEFAULT 1,
  `Boss_Animation` int(11) NOT NULL DEFAULT 0,
  `Daily_Remind` int(11) NOT NULL DEFAULT 0,
  `Fly` int(11) NOT NULL DEFAULT 0,
  `Pet_Food` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for c_tempitembox
-- ----------------------------
DROP TABLE IF EXISTS `c_tempitembox`;
CREATE TABLE `c_tempitembox`  (
  `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `characterid` bigint(10) NULL DEFAULT NULL,
  `itemid` bigint(10) NULL DEFAULT NULL,
  `quantity` bigint(5) NULL DEFAULT NULL,
  `from` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `notice` int(1) NULL DEFAULT NULL,
  `weight` double(10, 2) NULL DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `name` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `characterid`(`characterid`) USING BTREE,
  INDEX `itemid`(`itemid`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for c_tempitembox_copy1
-- ----------------------------
DROP TABLE IF EXISTS `c_tempitembox_copy1`;
CREATE TABLE `c_tempitembox_copy1`  (
  `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `characterid` bigint(10) NULL DEFAULT NULL,
  `itemid` bigint(10) NULL DEFAULT NULL,
  `quantity` bigint(5) NULL DEFAULT NULL,
  `from` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `notice` int(1) NULL DEFAULT NULL,
  `weight` double(10, 2) NULL DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `name` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `characterid`(`characterid`) USING BTREE,
  INDEX `itemid`(`itemid`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for c_tempitembox_log
-- ----------------------------
DROP TABLE IF EXISTS `c_tempitembox_log`;
CREATE TABLE `c_tempitembox_log`  (
  `id` bigint(10) NOT NULL AUTO_INCREMENT,
  `characterid` bigint(10) NULL DEFAULT NULL,
  `itemid` bigint(10) NULL DEFAULT NULL,
  `quantity` bigint(5) NULL DEFAULT NULL,
  `from` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `notice` int(1) NULL DEFAULT NULL,
  `weight` double(10, 2) NULL DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `name` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for c_tempitembox_log_copy1
-- ----------------------------
DROP TABLE IF EXISTS `c_tempitembox_log_copy1`;
CREATE TABLE `c_tempitembox_log_copy1`  (
  `id` bigint(10) NOT NULL AUTO_INCREMENT,
  `characterid` bigint(10) NULL DEFAULT NULL,
  `itemid` bigint(10) NULL DEFAULT NULL,
  `quantity` bigint(5) NULL DEFAULT NULL,
  `from` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `notice` int(1) NULL DEFAULT NULL,
  `weight` double(10, 2) NULL DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `name` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cash_coupon
-- ----------------------------
DROP TABLE IF EXISTS `cash_coupon`;
CREATE TABLE `cash_coupon`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NULL DEFAULT NULL,
  `coupon` varchar(16) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `commodity_id` int(11) NULL DEFAULT NULL,
  `used` int(11) NULL DEFAULT NULL,
  `start_date` datetime NULL DEFAULT NULL,
  `end_date` datetime NULL DEFAULT NULL,
  `used_date` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `coupon`(`coupon` ASC) USING BTREE,
  INDEX `account_id`(`account_id` ASC, `used` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cash_coupon_copy1
-- ----------------------------
DROP TABLE IF EXISTS `cash_coupon_copy1`;
CREATE TABLE `cash_coupon_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NULL DEFAULT NULL,
  `coupon` varchar(16) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `commodity_id` int(11) NULL DEFAULT NULL,
  `used` int(11) NULL DEFAULT NULL,
  `start_date` datetime NULL DEFAULT NULL,
  `end_date` datetime NULL DEFAULT NULL,
  `used_date` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `coupon`(`coupon` ASC) USING BTREE,
  INDEX `account_id`(`account_id` ASC, `used` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cash_gift_message
-- ----------------------------
DROP TABLE IF EXISTS `cash_gift_message`;
CREATE TABLE `cash_gift_message`  (
  `account_id` int(11) NOT NULL,
  `world_id` int(11) NOT NULL,
  `read` tinyint(4) NOT NULL,
  `sn` bigint(20) NOT NULL,
  `item_id` int(11) NOT NULL,
  `giver` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `message` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `pop` tinyint(4) NOT NULL,
  INDEX `account_id`(`account_id` ASC, `world_id` ASC) USING BTREE,
  INDEX `sn`(`sn` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cash_gift_message_copy1
-- ----------------------------
DROP TABLE IF EXISTS `cash_gift_message_copy1`;
CREATE TABLE `cash_gift_message_copy1`  (
  `account_id` int(11) NOT NULL,
  `world_id` int(11) NOT NULL,
  `read` tinyint(4) NOT NULL,
  `sn` bigint(20) NOT NULL,
  `item_id` int(11) NOT NULL,
  `giver` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `message` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `pop` tinyint(4) NOT NULL,
  INDEX `account_id`(`account_id` ASC, `world_id` ASC) USING BTREE,
  INDEX `sn`(`sn` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cash_shopping_cart
-- ----------------------------
DROP TABLE IF EXISTS `cash_shopping_cart`;
CREATE TABLE `cash_shopping_cart`  (
  `character_id` int(11) NOT NULL,
  `commodity_id` int(11) NULL DEFAULT NULL,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cash_shopping_cart_copy1
-- ----------------------------
DROP TABLE IF EXISTS `cash_shopping_cart_copy1`;
CREATE TABLE `cash_shopping_cart_copy1`  (
  `character_id` int(11) NOT NULL,
  `commodity_id` int(11) NULL DEFAULT NULL,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cash_vip
-- ----------------------------
DROP TABLE IF EXISTS `cash_vip`;
CREATE TABLE `cash_vip`  (
  `account_id` int(11) NOT NULL,
  `level` int(11) NULL DEFAULT NULL,
  `start_date` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`account_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cash_vip_consum
-- ----------------------------
DROP TABLE IF EXISTS `cash_vip_consum`;
CREATE TABLE `cash_vip_consum`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NULL DEFAULT NULL,
  `point` int(11) NULL DEFAULT NULL,
  `info` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `date` datetime NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `account_id`(`account_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cash_vip_consum_copy1
-- ----------------------------
DROP TABLE IF EXISTS `cash_vip_consum_copy1`;
CREATE TABLE `cash_vip_consum_copy1`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NULL DEFAULT NULL,
  `point` int(11) NULL DEFAULT NULL,
  `info` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `date` datetime NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `account_id`(`account_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cash_vip_copy1
-- ----------------------------
DROP TABLE IF EXISTS `cash_vip_copy1`;
CREATE TABLE `cash_vip_copy1`  (
  `account_id` int(11) NOT NULL,
  `level` int(11) NULL DEFAULT NULL,
  `start_date` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`account_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cash_vip_point
-- ----------------------------
DROP TABLE IF EXISTS `cash_vip_point`;
CREATE TABLE `cash_vip_point`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NULL DEFAULT NULL,
  `type` int(11) NULL DEFAULT NULL,
  `amount` int(11) NULL DEFAULT NULL,
  `point` int(11) NULL DEFAULT NULL,
  `consum` int(11) NULL DEFAULT NULL,
  `info` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT '',
  `date` datetime NULL DEFAULT current_timestamp(),
  `expire_date` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `account_id`(`account_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cash_vip_point_copy1
-- ----------------------------
DROP TABLE IF EXISTS `cash_vip_point_copy1`;
CREATE TABLE `cash_vip_point_copy1`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NULL DEFAULT NULL,
  `type` int(11) NULL DEFAULT NULL,
  `amount` int(11) NULL DEFAULT NULL,
  `point` int(11) NULL DEFAULT NULL,
  `consum` int(11) NULL DEFAULT NULL,
  `info` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT '',
  `date` datetime NULL DEFAULT current_timestamp(),
  `expire_date` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `account_id`(`account_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cashshop_randombox
-- ----------------------------
DROP TABLE IF EXISTS `cashshop_randombox`;
CREATE TABLE `cashshop_randombox`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `randboxID` int(11) NOT NULL,
  `itemSN` int(11) NOT NULL,
  `count` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `randboxID`(`randboxID` ASC) USING BTREE,
  INDEX `itemSN`(`itemSN` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cashshop_randombox_copy1
-- ----------------------------
DROP TABLE IF EXISTS `cashshop_randombox_copy1`;
CREATE TABLE `cashshop_randombox_copy1`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `randboxID` int(11) NOT NULL,
  `itemSN` int(11) NOT NULL,
  `count` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `randboxID`(`randboxID` ASC) USING BTREE,
  INDEX `itemSN`(`itemSN` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character
-- ----------------------------
DROP TABLE IF EXISTS `character`;
CREATE TABLE `character`  (
  `id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL DEFAULT 0,
  `world_id` int(11) NOT NULL DEFAULT 0,
  `del` tinyint(1) NOT NULL DEFAULT 0,
  `idx` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `account_id`(`account_id` ASC) USING BTREE,
  CONSTRAINT `character_ibfk_1` FOREIGN KEY (`id`) REFERENCES `character_stat` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_auto_buff
-- ----------------------------
DROP TABLE IF EXISTS `character_auto_buff`;
CREATE TABLE `character_auto_buff`  (
  `character_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL DEFAULT 0,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_auto_buff_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_auto_buff_copy1`;
CREATE TABLE `character_auto_buff_copy1`  (
  `character_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL DEFAULT 0,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_burning
-- ----------------------------
DROP TABLE IF EXISTS `character_burning`;
CREATE TABLE `character_burning`  (
  `character_id` int(11) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `min_level` int(11) NOT NULL,
  `max_level` int(11) NOT NULL,
  `add_point` int(11) NOT NULL,
  `type` tinyint(4) NOT NULL,
  PRIMARY KEY (`character_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_burning_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_burning_copy1`;
CREATE TABLE `character_burning_copy1`  (
  `character_id` int(11) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `min_level` int(11) NOT NULL,
  `max_level` int(11) NOT NULL,
  `add_point` int(11) NOT NULL,
  `type` tinyint(4) NOT NULL,
  PRIMARY KEY (`character_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_chosen_skill
-- ----------------------------
DROP TABLE IF EXISTS `character_chosen_skill`;
CREATE TABLE `character_chosen_skill`  (
  `character_id` int(11) NOT NULL,
  `slot` tinyint(4) NOT NULL DEFAULT 0,
  `skill_id` int(11) NOT NULL DEFAULT 0,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_chosen_skill_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_chosen_skill_copy1`;
CREATE TABLE `character_chosen_skill_copy1`  (
  `character_id` int(11) NOT NULL,
  `slot` tinyint(4) NOT NULL DEFAULT 0,
  `skill_id` int(11) NOT NULL DEFAULT 0,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_copy1`;
CREATE TABLE `character_copy1`  (
  `id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL DEFAULT 0,
  `world_id` int(11) NOT NULL DEFAULT 0,
  `del` tinyint(1) NOT NULL DEFAULT 0,
  `idx` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `account_id`(`account_id` ASC) USING BTREE,
  CONSTRAINT `character_copy1_ibfk_1` FOREIGN KEY (`id`) REFERENCES `character_stat` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_damage_skin
-- ----------------------------
DROP TABLE IF EXISTS `character_damage_skin`;
CREATE TABLE `character_damage_skin`  (
  `character_id` int(11) NOT NULL,
  `damage_skin` int(11) NOT NULL DEFAULT 0,
  `item_id` int(11) NOT NULL DEFAULT 0,
  `type` int(11) NOT NULL DEFAULT 0,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_damage_skin_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_damage_skin_copy1`;
CREATE TABLE `character_damage_skin_copy1`  (
  `character_id` int(11) NOT NULL,
  `damage_skin` int(11) NOT NULL DEFAULT 0,
  `item_id` int(11) NOT NULL DEFAULT 0,
  `type` int(11) NOT NULL DEFAULT 0,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_delete
-- ----------------------------
DROP TABLE IF EXISTS `character_delete`;
CREATE TABLE `character_delete`  (
  `character_id` int(11) NOT NULL,
  `confirm_date` datetime NULL DEFAULT NULL,
  `del_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`character_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_delete_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_delete_copy1`;
CREATE TABLE `character_delete_copy1`  (
  `character_id` int(11) NOT NULL,
  `confirm_date` datetime NULL DEFAULT NULL,
  `del_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`character_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_dress_up
-- ----------------------------
DROP TABLE IF EXISTS `character_dress_up`;
CREATE TABLE `character_dress_up`  (
  `character_id` int(11) NOT NULL,
  `face` int(11) NOT NULL DEFAULT 0,
  `hair` int(11) NOT NULL DEFAULT 0,
  `long_coat` int(11) NOT NULL DEFAULT 0,
  `skin` tinyint(4) NOT NULL DEFAULT 0,
  `angel` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`character_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_dress_up_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_dress_up_copy1`;
CREATE TABLE `character_dress_up_copy1`  (
  `character_id` int(11) NOT NULL,
  `face` int(11) NOT NULL DEFAULT 0,
  `hair` int(11) NOT NULL DEFAULT 0,
  `long_coat` int(11) NOT NULL DEFAULT 0,
  `skin` tinyint(4) NOT NULL DEFAULT 0,
  `angel` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`character_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_effect_off
-- ----------------------------
DROP TABLE IF EXISTS `character_effect_off`;
CREATE TABLE `character_effect_off`  (
  `character_id` int(11) NOT NULL,
  `effect_id` int(11) NOT NULL,
  INDEX `character_effect_off_character_id_IDX`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_effect_off_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_effect_off_copy1`;
CREATE TABLE `character_effect_off_copy1`  (
  `character_id` int(11) NOT NULL,
  `effect_id` int(11) NOT NULL,
  INDEX `character_effect_off_character_id_IDX`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_emoticon
-- ----------------------------
DROP TABLE IF EXISTS `character_emoticon`;
CREATE TABLE `character_emoticon`  (
  `character_id` int(11) NOT NULL,
  `emoticon_id` int(11) NOT NULL,
  `collect_slot` smallint(6) NOT NULL,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_emoticon_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_emoticon_copy1`;
CREATE TABLE `character_emoticon_copy1`  (
  `character_id` int(11) NOT NULL,
  `emoticon_id` int(11) NOT NULL,
  `collect_slot` smallint(6) NOT NULL,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_emoticon_group
-- ----------------------------
DROP TABLE IF EXISTS `character_emoticon_group`;
CREATE TABLE `character_emoticon_group`  (
  `character_id` int(11) NOT NULL,
  `page` smallint(6) NOT NULL,
  `group` int(11) NOT NULL DEFAULT 0,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_emoticon_group_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_emoticon_group_copy1`;
CREATE TABLE `character_emoticon_group_copy1`  (
  `character_id` int(11) NOT NULL,
  `page` smallint(6) NOT NULL,
  `group` int(11) NOT NULL DEFAULT 0,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_emoticon_macro
-- ----------------------------
DROP TABLE IF EXISTS `character_emoticon_macro`;
CREATE TABLE `character_emoticon_macro`  (
  `character_id` int(11) NOT NULL,
  `emoticon_id` int(11) NOT NULL,
  `macro` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_emoticon_macro_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_emoticon_macro_copy1`;
CREATE TABLE `character_emoticon_macro_copy1`  (
  `character_id` int(11) NOT NULL,
  `emoticon_id` int(11) NOT NULL,
  `macro` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_equipped_page
-- ----------------------------
DROP TABLE IF EXISTS `character_equipped_page`;
CREATE TABLE `character_equipped_page`  (
  `character_id` int(11) NOT NULL,
  `page` tinyint(4) NULL DEFAULT NULL,
  PRIMARY KEY (`character_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_equipped_page_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_equipped_page_copy1`;
CREATE TABLE `character_equipped_page_copy1`  (
  `character_id` int(11) NOT NULL,
  `page` tinyint(4) NULL DEFAULT NULL,
  PRIMARY KEY (`character_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_familiar
-- ----------------------------
DROP TABLE IF EXISTS `character_familiar`;
CREATE TABLE `character_familiar`  (
  `id` bigint(20) NOT NULL,
  `character_id` int(11) NOT NULL,
  `state` int(11) NOT NULL DEFAULT 0,
  `familiar_id` int(11) NOT NULL DEFAULT 0,
  `name` varchar(13) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `level` smallint(6) NOT NULL DEFAULT 0,
  `skill_id` smallint(6) NOT NULL DEFAULT 0,
  `exp` smallint(6) NOT NULL DEFAULT 0,
  `potential1` int(11) NOT NULL DEFAULT 0,
  `potential2` int(11) NOT NULL DEFAULT 0,
  `potential3` int(11) NOT NULL DEFAULT 0,
  `grade` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_familiar_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_familiar_copy1`;
CREATE TABLE `character_familiar_copy1`  (
  `id` bigint(20) NOT NULL,
  `character_id` int(11) NOT NULL,
  `state` int(11) NOT NULL DEFAULT 0,
  `familiar_id` int(11) NOT NULL DEFAULT 0,
  `name` varchar(13) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `level` smallint(6) NOT NULL DEFAULT 0,
  `skill_id` smallint(6) NOT NULL DEFAULT 0,
  `exp` smallint(6) NOT NULL DEFAULT 0,
  `potential1` int(11) NOT NULL DEFAULT 0,
  `potential2` int(11) NOT NULL DEFAULT 0,
  `potential3` int(11) NOT NULL DEFAULT 0,
  `grade` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_familiar_table
-- ----------------------------
DROP TABLE IF EXISTS `character_familiar_table`;
CREATE TABLE `character_familiar_table`  (
  `character_id` int(11) NOT NULL,
  `table_idx` smallint(6) NOT NULL DEFAULT 0,
  `potential1` int(11) NOT NULL DEFAULT 0,
  `potential2` int(11) NOT NULL DEFAULT 0,
  `potential3` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`character_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_familiar_table_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_familiar_table_copy1`;
CREATE TABLE `character_familiar_table_copy1`  (
  `character_id` int(11) NOT NULL,
  `table_idx` smallint(6) NOT NULL DEFAULT 0,
  `potential1` int(11) NOT NULL DEFAULT 0,
  `potential2` int(11) NOT NULL DEFAULT 0,
  `potential3` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`character_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_func_key
-- ----------------------------
DROP TABLE IF EXISTS `character_func_key`;
CREATE TABLE `character_func_key`  (
  `character_id` int(11) NOT NULL,
  `page` tinyint(4) NOT NULL,
  `key` int(4) NOT NULL,
  `type` tinyint(3) NOT NULL DEFAULT 0,
  `action` int(11) NOT NULL DEFAULT 0,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_func_key_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_func_key_copy1`;
CREATE TABLE `character_func_key_copy1`  (
  `character_id` int(11) NOT NULL,
  `page` tinyint(4) NOT NULL,
  `key` int(11) NOT NULL,
  `type` tinyint(4) NOT NULL DEFAULT 0,
  `action` int(11) NOT NULL DEFAULT 0,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_hexa_skill
-- ----------------------------
DROP TABLE IF EXISTS `character_hexa_skill`;
CREATE TABLE `character_hexa_skill`  (
  `character_id` int(11) NOT NULL,
  `core_id` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_hexa_skill_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_hexa_skill_copy1`;
CREATE TABLE `character_hexa_skill_copy1`  (
  `character_id` int(11) NOT NULL,
  `core_id` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_hexa_stat
-- ----------------------------
DROP TABLE IF EXISTS `character_hexa_stat`;
CREATE TABLE `character_hexa_stat`  (
  `character_id` int(11) NOT NULL,
  `core_id` int(11) NOT NULL,
  `idx` int(11) NOT NULL,
  `stat` int(11) NOT NULL,
  `opt1_type` int(11) NOT NULL,
  `opt1_level` int(11) NOT NULL,
  `opt2_type` int(11) NOT NULL,
  `opt2_level` int(11) NOT NULL,
  `opt3_type` int(11) NOT NULL,
  `opt3_level` int(11) NOT NULL,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_hexa_stat_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_hexa_stat_copy1`;
CREATE TABLE `character_hexa_stat_copy1`  (
  `character_id` int(11) NOT NULL,
  `core_id` int(11) NOT NULL,
  `idx` int(11) NOT NULL,
  `stat` int(11) NOT NULL,
  `opt1_type` int(11) NOT NULL,
  `opt1_level` int(11) NOT NULL,
  `opt2_type` int(11) NOT NULL,
  `opt2_level` int(11) NOT NULL,
  `opt3_type` int(11) NOT NULL,
  `opt3_level` int(11) NOT NULL,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_hexa_stat_select
-- ----------------------------
DROP TABLE IF EXISTS `character_hexa_stat_select`;
CREATE TABLE `character_hexa_stat_select`  (
  `character_id` int(11) NOT NULL,
  `core_id` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `select` int(11) NOT NULL,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_hexa_stat_select_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_hexa_stat_select_copy1`;
CREATE TABLE `character_hexa_stat_select_copy1`  (
  `character_id` int(11) NOT NULL,
  `core_id` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `select` int(11) NOT NULL,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_honor
-- ----------------------------
DROP TABLE IF EXISTS `character_honor`;
CREATE TABLE `character_honor`  (
  `character_id` int(11) NOT NULL,
  `honor` int(11) NOT NULL,
  PRIMARY KEY (`character_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_honor_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_honor_copy1`;
CREATE TABLE `character_honor_copy1`  (
  `character_id` int(11) NOT NULL,
  `honor` int(11) NOT NULL,
  PRIMARY KEY (`character_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_inv_size
-- ----------------------------
DROP TABLE IF EXISTS `character_inv_size`;
CREATE TABLE `character_inv_size`  (
  `character_id` int(11) NOT NULL,
  `equip` int(11) NOT NULL DEFAULT 0,
  `consume` int(11) NOT NULL DEFAULT 0,
  `install` int(11) NOT NULL DEFAULT 0,
  `etc` int(11) NOT NULL DEFAULT 0,
  `cash` int(11) NOT NULL DEFAULT 0,
  `attire` int(11) NOT NULL,
  PRIMARY KEY (`character_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_inv_size_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_inv_size_copy1`;
CREATE TABLE `character_inv_size_copy1`  (
  `character_id` int(11) NOT NULL,
  `equip` int(11) NOT NULL DEFAULT 0,
  `consume` int(11) NOT NULL DEFAULT 0,
  `install` int(11) NOT NULL DEFAULT 0,
  `etc` int(11) NOT NULL DEFAULT 0,
  `cash` int(11) NOT NULL DEFAULT 0,
  `attire` int(11) NOT NULL,
  PRIMARY KEY (`character_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_like_point
-- ----------------------------
DROP TABLE IF EXISTS `character_like_point`;
CREATE TABLE `character_like_point`  (
  `character_id` int(11) NOT NULL,
  `like_point` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`character_id`) USING BTREE,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_like_point_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_like_point_copy1`;
CREATE TABLE `character_like_point_copy1`  (
  `character_id` int(11) NOT NULL,
  `like_point` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`character_id`) USING BTREE,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_mannequin
-- ----------------------------
DROP TABLE IF EXISTS `character_mannequin`;
CREATE TABLE `character_mannequin`  (
  `character_id` int(11) NOT NULL,
  `type` tinyint(4) NOT NULL,
  `slot` tinyint(4) NOT NULL DEFAULT 0,
  `angel` tinyint(4) NOT NULL DEFAULT 0,
  `beauty_id` int(11) NOT NULL,
  INDEX `character_id`(`character_id` ASC, `type` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_mannequin_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_mannequin_copy1`;
CREATE TABLE `character_mannequin_copy1`  (
  `character_id` int(11) NOT NULL,
  `type` tinyint(4) NOT NULL,
  `slot` tinyint(4) NOT NULL DEFAULT 0,
  `angel` tinyint(4) NOT NULL DEFAULT 0,
  `beauty_id` int(11) NOT NULL,
  INDEX `character_id`(`character_id` ASC, `type` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_map_transfer
-- ----------------------------
DROP TABLE IF EXISTS `character_map_transfer`;
CREATE TABLE `character_map_transfer`  (
  `character_id` int(11) NOT NULL,
  `type` tinyint(4) NOT NULL,
  `field_id` int(11) NOT NULL DEFAULT 999999999,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_map_transfer_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_map_transfer_copy1`;
CREATE TABLE `character_map_transfer_copy1`  (
  `character_id` int(11) NOT NULL,
  `type` tinyint(4) NOT NULL,
  `field_id` int(11) NOT NULL DEFAULT 999999999,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_marriage_record
-- ----------------------------
DROP TABLE IF EXISTS `character_marriage_record`;
CREATE TABLE `character_marriage_record`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groom_id` int(11) NOT NULL,
  `bride_id` int(11) NOT NULL,
  `status` smallint(6) NOT NULL,
  `groom_item_id` int(11) NOT NULL,
  `bride_item_id` int(11) NOT NULL,
  `groom_name` varchar(13) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `bride_name` varchar(13) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_marriage_record_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_marriage_record_copy1`;
CREATE TABLE `character_marriage_record_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groom_id` int(11) NOT NULL,
  `bride_id` int(11) NOT NULL,
  `status` smallint(6) NOT NULL,
  `groom_item_id` int(11) NOT NULL,
  `bride_item_id` int(11) NOT NULL,
  `groom_name` varchar(13) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `bride_name` varchar(13) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_mob_collection
-- ----------------------------
DROP TABLE IF EXISTS `character_mob_collection`;
CREATE TABLE `character_mob_collection`  (
  `account_id` int(11) NOT NULL,
  `world_id` int(11) NOT NULL DEFAULT 0,
  `record_id` int(11) NOT NULL DEFAULT 0,
  `str_raw` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`account_id`, `world_id`, `record_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_mob_collection_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_mob_collection_copy1`;
CREATE TABLE `character_mob_collection_copy1`  (
  `account_id` int(11) NOT NULL,
  `world_id` int(11) NOT NULL DEFAULT 0,
  `record_id` int(11) NOT NULL DEFAULT 0,
  `str_raw` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`account_id`, `world_id`, `record_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_money
-- ----------------------------
DROP TABLE IF EXISTS `character_money`;
CREATE TABLE `character_money`  (
  `character_id` int(11) NOT NULL,
  `money` bigint(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`character_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_money_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_money_copy1`;
CREATE TABLE `character_money_copy1`  (
  `character_id` int(11) NOT NULL,
  `money` bigint(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`character_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_potential_page
-- ----------------------------
DROP TABLE IF EXISTS `character_potential_page`;
CREATE TABLE `character_potential_page`  (
  `character_id` int(11) NOT NULL,
  `page` tinyint(4) NULL DEFAULT NULL,
  PRIMARY KEY (`character_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_potential_page_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_potential_page_copy1`;
CREATE TABLE `character_potential_page_copy1`  (
  `character_id` int(11) NOT NULL,
  `page` tinyint(4) NULL DEFAULT NULL,
  PRIMARY KEY (`character_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_potential_skill
-- ----------------------------
DROP TABLE IF EXISTS `character_potential_skill`;
CREATE TABLE `character_potential_skill`  (
  `character_id` int(11) NOT NULL DEFAULT 0,
  `page` tinyint(4) NOT NULL DEFAULT 0,
  `pos` tinyint(4) NOT NULL DEFAULT 0,
  `skill_id` int(11) NOT NULL DEFAULT 0,
  `level` tinyint(4) NOT NULL DEFAULT 0,
  `grade` tinyint(4) NOT NULL DEFAULT 0,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_potential_skill_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_potential_skill_copy1`;
CREATE TABLE `character_potential_skill_copy1`  (
  `character_id` int(11) NOT NULL DEFAULT 0,
  `pos` tinyint(4) NOT NULL DEFAULT 0,
  `skill_id` int(11) NOT NULL DEFAULT 0,
  `level` tinyint(4) NOT NULL DEFAULT 0,
  `grade` tinyint(4) NOT NULL DEFAULT 0,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_potential_skill_copy1_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_potential_skill_copy1_copy1`;
CREATE TABLE `character_potential_skill_copy1_copy1`  (
  `character_id` int(11) NOT NULL DEFAULT 0,
  `pos` tinyint(4) NOT NULL DEFAULT 0,
  `skill_id` int(11) NOT NULL DEFAULT 0,
  `level` tinyint(4) NOT NULL DEFAULT 0,
  `grade` tinyint(4) NOT NULL DEFAULT 0,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_potential_skill_copy2
-- ----------------------------
DROP TABLE IF EXISTS `character_potential_skill_copy2`;
CREATE TABLE `character_potential_skill_copy2`  (
  `character_id` int(11) NOT NULL DEFAULT 0,
  `page` tinyint(4) NOT NULL DEFAULT 0,
  `pos` tinyint(4) NOT NULL DEFAULT 0,
  `skill_id` int(11) NOT NULL DEFAULT 0,
  `level` tinyint(4) NOT NULL DEFAULT 0,
  `grade` tinyint(4) NOT NULL DEFAULT 0,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_potion_pot
-- ----------------------------
DROP TABLE IF EXISTS `character_potion_pot`;
CREATE TABLE `character_potion_pot`  (
  `character_id` int(11) NOT NULL DEFAULT 0,
  `item_id` int(11) NOT NULL DEFAULT 0,
  `hp` int(11) NOT NULL DEFAULT 0,
  `mp` int(11) NOT NULL DEFAULT 0,
  `max_value` int(11) NOT NULL DEFAULT 1000000,
  `start_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `end_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`character_id`) USING BTREE,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for character_potion_pot_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_potion_pot_copy1`;
CREATE TABLE `character_potion_pot_copy1`  (
  `character_id` int(11) NOT NULL DEFAULT 0,
  `item_id` int(11) NOT NULL DEFAULT 0,
  `hp` int(11) NOT NULL DEFAULT 0,
  `mp` int(11) NOT NULL DEFAULT 0,
  `max_value` int(11) NOT NULL DEFAULT 1000000,
  `start_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `end_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`character_id`) USING BTREE,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for character_pqlog
-- ----------------------------
DROP TABLE IF EXISTS `character_pqlog`;
CREATE TABLE `character_pqlog`  (
  `characters_id` int(10) NOT NULL,
  `key` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL DEFAULT '',
  `value` int(10) NOT NULL DEFAULT 0,
  `reset_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`characters_id`, `key`) USING BTREE,
  INDEX `characterid`(`characters_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_pqlog_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_pqlog_copy1`;
CREATE TABLE `character_pqlog_copy1`  (
  `characters_id` int(11) NOT NULL,
  `key` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL DEFAULT '',
  `value` int(11) NOT NULL DEFAULT 0,
  `reset_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`characters_id`, `key`) USING BTREE,
  INDEX `characterid`(`characters_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_preset_record
-- ----------------------------
DROP TABLE IF EXISTS `character_preset_record`;
CREATE TABLE `character_preset_record`  (
  `character_id` int(11) NOT NULL,
  `equip_page` tinyint(4) NOT NULL DEFAULT 0,
  `potential_page` tinyint(4) NOT NULL DEFAULT 0,
  `link_skill_page` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`character_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_preset_record_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_preset_record_copy1`;
CREATE TABLE `character_preset_record_copy1`  (
  `character_id` int(11) NOT NULL,
  `equip_page` tinyint(4) NOT NULL DEFAULT 0,
  `potential_page` tinyint(4) NOT NULL DEFAULT 0,
  `link_skill_page` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`character_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_quest_complete
-- ----------------------------
DROP TABLE IF EXISTS `character_quest_complete`;
CREATE TABLE `character_quest_complete`  (
  `character_id` int(11) NOT NULL,
  `quest_id` int(11) NOT NULL,
  `completion_date` datetime NOT NULL,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_quest_complete_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_quest_complete_copy1`;
CREATE TABLE `character_quest_complete_copy1`  (
  `character_id` int(11) NOT NULL,
  `quest_id` int(11) NOT NULL,
  `completion_date` datetime NOT NULL,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_quest_record
-- ----------------------------
DROP TABLE IF EXISTS `character_quest_record`;
CREATE TABLE `character_quest_record`  (
  `character_id` int(11) NOT NULL,
  `quest_id` int(11) NOT NULL,
  `data` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_quest_record_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_quest_record_copy1`;
CREATE TABLE `character_quest_record_copy1`  (
  `character_id` int(11) NOT NULL,
  `quest_id` int(11) NOT NULL,
  `data` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_quest_record_expand
-- ----------------------------
DROP TABLE IF EXISTS `character_quest_record_expand`;
CREATE TABLE `character_quest_record_expand`  (
  `character_id` int(11) NOT NULL,
  `quest_id` int(11) NOT NULL,
  `str_raw` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  UNIQUE INDEX `unique_character_quest`(`character_id` ASC, `quest_id` ASC) USING BTREE,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_quest_record_expand_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_quest_record_expand_copy1`;
CREATE TABLE `character_quest_record_expand_copy1`  (
  `character_id` int(11) NOT NULL,
  `quest_id` int(11) NOT NULL,
  `str_raw` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  UNIQUE INDEX `unique_character_quest`(`character_id` ASC, `quest_id` ASC) USING BTREE,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_quick_slot
-- ----------------------------
DROP TABLE IF EXISTS `character_quick_slot`;
CREATE TABLE `character_quick_slot`  (
  `character_id` int(11) NOT NULL,
  `idx` int(11) NOT NULL,
  `value` int(11) NOT NULL DEFAULT 0,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for character_quick_slot_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_quick_slot_copy1`;
CREATE TABLE `character_quick_slot_copy1`  (
  `character_id` int(11) NOT NULL,
  `idx` int(11) NOT NULL,
  `value` int(11) NOT NULL DEFAULT 0,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for character_ring_couple
-- ----------------------------
DROP TABLE IF EXISTS `character_ring_couple`;
CREATE TABLE `character_ring_couple`  (
  `character_id` int(11) NOT NULL DEFAULT 0,
  `pair_character_id` int(11) NOT NULL DEFAULT 0,
  `pair_name` varchar(13) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `sn` bigint(20) NOT NULL DEFAULT 0,
  `pair_sn` bigint(20) NOT NULL DEFAULT 0,
  `msg` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `item_id` int(11) NOT NULL DEFAULT 0,
  INDEX `character_id`(`character_id` ASC) USING BTREE,
  INDEX `sn`(`sn` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_ring_couple_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_ring_couple_copy1`;
CREATE TABLE `character_ring_couple_copy1`  (
  `character_id` int(11) NOT NULL DEFAULT 0,
  `pair_character_id` int(11) NOT NULL DEFAULT 0,
  `pair_name` varchar(13) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `sn` bigint(20) NOT NULL DEFAULT 0,
  `pair_sn` bigint(20) NOT NULL DEFAULT 0,
  `msg` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `item_id` int(11) NOT NULL DEFAULT 0,
  INDEX `character_id`(`character_id` ASC) USING BTREE,
  INDEX `sn`(`sn` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_ring_friend
-- ----------------------------
DROP TABLE IF EXISTS `character_ring_friend`;
CREATE TABLE `character_ring_friend`  (
  `character_id` int(11) NOT NULL DEFAULT 0,
  `pair_character_id` int(11) NOT NULL DEFAULT 0,
  `pair_name` varchar(13) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `sn` bigint(20) NOT NULL DEFAULT 0,
  `pair_sn` bigint(20) NOT NULL DEFAULT 0,
  `item_id` int(11) NOT NULL DEFAULT 0,
  INDEX `character_id`(`character_id` ASC) USING BTREE,
  INDEX `sn`(`sn` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_ring_friend_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_ring_friend_copy1`;
CREATE TABLE `character_ring_friend_copy1`  (
  `character_id` int(11) NOT NULL DEFAULT 0,
  `pair_character_id` int(11) NOT NULL DEFAULT 0,
  `pair_name` varchar(13) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `sn` bigint(20) NOT NULL DEFAULT 0,
  `pair_sn` bigint(20) NOT NULL DEFAULT 0,
  `item_id` int(11) NOT NULL DEFAULT 0,
  INDEX `character_id`(`character_id` ASC) USING BTREE,
  INDEX `sn`(`sn` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_ring_marriage
-- ----------------------------
DROP TABLE IF EXISTS `character_ring_marriage`;
CREATE TABLE `character_ring_marriage`  (
  `character_id` int(11) NOT NULL DEFAULT 0,
  `marriage_id` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`character_id`) USING BTREE,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_ring_marriage_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_ring_marriage_copy1`;
CREATE TABLE `character_ring_marriage_copy1`  (
  `character_id` int(11) NOT NULL DEFAULT 0,
  `marriage_id` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`character_id`) USING BTREE,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_sail_boat
-- ----------------------------
DROP TABLE IF EXISTS `character_sail_boat`;
CREATE TABLE `character_sail_boat`  (
  `character_id` int(11) NOT NULL,
  `type` tinyint(4) NOT NULL DEFAULT 0,
  `level` int(11) NOT NULL DEFAULT 1,
  `energy` int(11) NOT NULL DEFAULT 100,
  `exp` int(11) NOT NULL DEFAULT 0,
  `reset_date` datetime NOT NULL,
  PRIMARY KEY (`character_id`) USING BTREE,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_sail_boat_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_sail_boat_copy1`;
CREATE TABLE `character_sail_boat_copy1`  (
  `character_id` int(11) NOT NULL,
  `type` tinyint(4) NOT NULL DEFAULT 0,
  `level` int(11) NOT NULL DEFAULT 1,
  `energy` int(11) NOT NULL DEFAULT 100,
  `exp` int(11) NOT NULL DEFAULT 0,
  `reset_date` datetime NOT NULL,
  PRIMARY KEY (`character_id`) USING BTREE,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_sail_cargo
-- ----------------------------
DROP TABLE IF EXISTS `character_sail_cargo`;
CREATE TABLE `character_sail_cargo`  (
  `character_id` int(11) NOT NULL,
  `cargo_id` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `reset_date` datetime NOT NULL,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_sail_cargo_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_sail_cargo_copy1`;
CREATE TABLE `character_sail_cargo_copy1`  (
  `character_id` int(11) NOT NULL,
  `cargo_id` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `reset_date` datetime NOT NULL,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_skill_alarm
-- ----------------------------
DROP TABLE IF EXISTS `character_skill_alarm`;
CREATE TABLE `character_skill_alarm`  (
  `character_id` int(11) NULL DEFAULT NULL,
  `skill_id` int(11) NULL DEFAULT NULL,
  `alarm` tinyint(4) NULL DEFAULT NULL,
  `sequence` int(11) NULL DEFAULT -1,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_skill_alarm_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_skill_alarm_copy1`;
CREATE TABLE `character_skill_alarm_copy1`  (
  `character_id` int(11) NULL DEFAULT NULL,
  `skill_id` int(11) NULL DEFAULT NULL,
  `alarm` tinyint(4) NULL DEFAULT NULL,
  `sequence` int(11) NULL DEFAULT -1,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_skill_cooldown
-- ----------------------------
DROP TABLE IF EXISTS `character_skill_cooldown`;
CREATE TABLE `character_skill_cooldown`  (
  `character_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `remaining_time` int(11) NOT NULL,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_skill_cooldown_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_skill_cooldown_copy1`;
CREATE TABLE `character_skill_cooldown_copy1`  (
  `character_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `remaining_time` int(11) NOT NULL,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_skill_hyper_state
-- ----------------------------
DROP TABLE IF EXISTS `character_skill_hyper_state`;
CREATE TABLE `character_skill_hyper_state`  (
  `character_id` int(11) NOT NULL,
  `page` tinyint(4) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  INDEX `chatacter_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_skill_hyper_state_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_skill_hyper_state_copy1`;
CREATE TABLE `character_skill_hyper_state_copy1`  (
  `character_id` int(11) NOT NULL,
  `page` tinyint(4) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  INDEX `chatacter_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_skill_hyper_state_page
-- ----------------------------
DROP TABLE IF EXISTS `character_skill_hyper_state_page`;
CREATE TABLE `character_skill_hyper_state_page`  (
  `character_id` int(11) NOT NULL,
  `page` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`character_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_skill_hyper_state_page_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_skill_hyper_state_page_copy1`;
CREATE TABLE `character_skill_hyper_state_page_copy1`  (
  `character_id` int(11) NOT NULL,
  `page` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`character_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_skill_link
-- ----------------------------
DROP TABLE IF EXISTS `character_skill_link`;
CREATE TABLE `character_skill_link`  (
  `character_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  PRIMARY KEY (`character_id`) USING BTREE,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_skill_link_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_skill_link_copy1`;
CREATE TABLE `character_skill_link_copy1`  (
  `character_id` int(11) NOT NULL,
  `target_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `reset_date` datetime NOT NULL,
  `count` int(11) NOT NULL,
  PRIMARY KEY (`character_id`) USING BTREE,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_skill_link_preset
-- ----------------------------
DROP TABLE IF EXISTS `character_skill_link_preset`;
CREATE TABLE `character_skill_link_preset`  (
  `character_id` int(11) NULL DEFAULT NULL,
  `page` tinyint(4) NULL DEFAULT NULL,
  `skill_id` int(11) NULL DEFAULT NULL,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_skill_link_preset_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_skill_link_preset_copy1`;
CREATE TABLE `character_skill_link_preset_copy1`  (
  `character_id` int(11) NULL DEFAULT NULL,
  `page` tinyint(4) NULL DEFAULT NULL,
  `skill_id` int(11) NULL DEFAULT NULL,
  `owner_id` int(11) NULL DEFAULT NULL,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_skill_macro
-- ----------------------------
DROP TABLE IF EXISTS `character_skill_macro`;
CREATE TABLE `character_skill_macro`  (
  `character_id` int(11) NOT NULL DEFAULT 0,
  `idx` tinyint(1) NOT NULL DEFAULT 0,
  `name` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `mute` tinyint(1) NOT NULL DEFAULT 0,
  `skill1` int(11) NOT NULL DEFAULT 0,
  `skill2` int(11) NOT NULL DEFAULT 0,
  `skill3` int(11) NOT NULL DEFAULT 0,
  INDEX `characterid`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for character_skill_macro_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_skill_macro_copy1`;
CREATE TABLE `character_skill_macro_copy1`  (
  `character_id` int(11) NOT NULL DEFAULT 0,
  `idx` tinyint(1) NOT NULL DEFAULT 0,
  `name` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `mute` tinyint(1) NOT NULL DEFAULT 0,
  `skill1` int(11) NOT NULL DEFAULT 0,
  `skill2` int(11) NOT NULL DEFAULT 0,
  `skill3` int(11) NOT NULL DEFAULT 0,
  INDEX `characterid`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for character_skill_record
-- ----------------------------
DROP TABLE IF EXISTS `character_skill_record`;
CREATE TABLE `character_skill_record`  (
  `character_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `option` int(11) NOT NULL,
  `expire_date` datetime NOT NULL,
  `master_level` int(11) NOT NULL,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_skill_record_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_skill_record_copy1`;
CREATE TABLE `character_skill_record_copy1`  (
  `character_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `option` int(11) NOT NULL,
  `expire_date` datetime NOT NULL,
  `master_level` int(11) NOT NULL,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_skill_sequence
-- ----------------------------
DROP TABLE IF EXISTS `character_skill_sequence`;
CREATE TABLE `character_skill_sequence`  (
  `character_id` int(11) NOT NULL COMMENT '角色ID',
  `idx` int(11) NOT NULL COMMENT '序列索引',
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '序列名稱',
  `skills` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '技能ID陣列，以JSON格式儲存',
  PRIMARY KEY (`character_id`, `idx`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_skill_sequence_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_skill_sequence_copy1`;
CREATE TABLE `character_skill_sequence_copy1`  (
  `character_id` int(11) NOT NULL COMMENT '角色ID',
  `idx` int(11) NOT NULL COMMENT '序列索引',
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL COMMENT '序列名稱',
  `skills` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '技能ID陣列，以JSON格式儲存',
  PRIMARY KEY (`character_id`, `idx`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_soul_collection
-- ----------------------------
DROP TABLE IF EXISTS `character_soul_collection`;
CREATE TABLE `character_soul_collection`  (
  `character_id` int(11) NOT NULL,
  `page` int(11) NOT NULL,
  `set_soul` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`character_id`, `page`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_soul_collection_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_soul_collection_copy1`;
CREATE TABLE `character_soul_collection_copy1`  (
  `character_id` int(11) NOT NULL,
  `page` int(11) NOT NULL,
  `set_soul` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`character_id`, `page`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_stat
-- ----------------------------
DROP TABLE IF EXISTS `character_stat`;
CREATE TABLE `character_stat`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `gender` tinyint(4) NOT NULL DEFAULT 0,
  `skin` tinyint(4) NOT NULL DEFAULT 0,
  `face` int(11) NOT NULL DEFAULT 0,
  `hair` int(11) NOT NULL DEFAULT 0,
  `level` int(11) NOT NULL DEFAULT 1,
  `job` smallint(6) NOT NULL DEFAULT 0,
  `pure_str` smallint(6) NOT NULL DEFAULT 4,
  `pure_dex` smallint(6) NOT NULL DEFAULT 4,
  `pure_int` smallint(6) NOT NULL DEFAULT 4,
  `pure_luk` smallint(6) NOT NULL DEFAULT 4,
  `hp` int(11) NOT NULL DEFAULT 50,
  `pure_max_hp` int(11) NOT NULL DEFAULT 50,
  `hp_ap_used` smallint(6) NOT NULL DEFAULT 0,
  `mp` int(11) NOT NULL DEFAULT 50,
  `pure_max_mp` int(11) NOT NULL DEFAULT 50,
  `mp_ap_used` smallint(6) NOT NULL DEFAULT 0,
  `ap` smallint(6) NOT NULL DEFAULT 0,
  `sp` int(11) NOT NULL DEFAULT 0,
  `extend_sp` bigint(20) NOT NULL,
  `exp` bigint(20) NOT NULL DEFAULT 0,
  `pop` int(11) NOT NULL DEFAULT 0,
  `wp` int(1) NOT NULL DEFAULT 0,
  `field_id` int(11) NOT NULL DEFAULT 0,
  `portal` tinyint(4) NOT NULL DEFAULT 0,
  `sub_job` smallint(6) NOT NULL DEFAULT 0,
  `def_face_acc` int(11) NOT NULL DEFAULT 0,
  `fatigue` smallint(6) NOT NULL DEFAULT 0,
  `last_fatigue_update` datetime NOT NULL DEFAULT current_timestamp(),
  `charisma` int(11) NOT NULL DEFAULT 0,
  `insight` int(11) NOT NULL DEFAULT 0,
  `will` int(11) NOT NULL DEFAULT 0,
  `craft` int(11) NOT NULL DEFAULT 0,
  `charm` int(11) NOT NULL DEFAULT 0,
  `sense` int(11) NOT NULL DEFAULT 0,
  `pvp_exp` int(11) NOT NULL DEFAULT 0,
  `pvp_grade` smallint(6) NOT NULL DEFAULT 10,
  `pvp_point` int(11) NOT NULL DEFAULT 0,
  `pvp_mode_level` tinyint(4) NOT NULL DEFAULT 5,
  `pvp_mode_type` tinyint(4) NOT NULL DEFAULT 6,
  `event_point` int(11) NOT NULL DEFAULT 0,
  `last_logout` datetime NULL DEFAULT current_timestamp(),
  `create_date` datetime NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_stat_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_stat_copy1`;
CREATE TABLE `character_stat_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `gender` tinyint(4) NOT NULL DEFAULT 0,
  `skin` tinyint(4) NOT NULL DEFAULT 0,
  `face` int(11) NOT NULL DEFAULT 0,
  `hair` int(11) NOT NULL DEFAULT 0,
  `level` int(11) NOT NULL DEFAULT 1,
  `job` smallint(6) NOT NULL DEFAULT 0,
  `pure_str` smallint(6) NOT NULL DEFAULT 4,
  `pure_dex` smallint(6) NOT NULL DEFAULT 4,
  `pure_int` smallint(6) NOT NULL DEFAULT 4,
  `pure_luk` smallint(6) NOT NULL DEFAULT 4,
  `hp` int(11) NOT NULL DEFAULT 50,
  `pure_max_hp` int(11) NOT NULL DEFAULT 50,
  `hp_ap_used` smallint(6) NOT NULL DEFAULT 0,
  `mp` int(11) NOT NULL DEFAULT 50,
  `pure_max_mp` int(11) NOT NULL DEFAULT 50,
  `mp_ap_used` smallint(6) NOT NULL DEFAULT 0,
  `ap` smallint(6) NOT NULL DEFAULT 0,
  `sp` int(11) NOT NULL DEFAULT 0,
  `extend_sp` bigint(20) NOT NULL,
  `exp` bigint(20) NOT NULL DEFAULT 0,
  `pop` int(11) NOT NULL DEFAULT 0,
  `wp` int(11) NOT NULL DEFAULT 0,
  `field_id` int(11) NOT NULL DEFAULT 0,
  `portal` tinyint(4) NOT NULL DEFAULT 0,
  `sub_job` smallint(6) NOT NULL DEFAULT 0,
  `def_face_acc` int(11) NOT NULL DEFAULT 0,
  `fatigue` smallint(6) NOT NULL DEFAULT 0,
  `last_fatigue_update` datetime NOT NULL DEFAULT current_timestamp(),
  `charisma` int(11) NOT NULL DEFAULT 0,
  `insight` int(11) NOT NULL DEFAULT 0,
  `will` int(11) NOT NULL DEFAULT 0,
  `craft` int(11) NOT NULL DEFAULT 0,
  `charm` int(11) NOT NULL DEFAULT 0,
  `sense` int(11) NOT NULL DEFAULT 0,
  `pvp_exp` int(11) NOT NULL DEFAULT 0,
  `pvp_grade` smallint(6) NOT NULL DEFAULT 10,
  `pvp_point` int(11) NOT NULL DEFAULT 0,
  `pvp_mode_level` tinyint(4) NOT NULL DEFAULT 5,
  `pvp_mode_type` tinyint(4) NOT NULL DEFAULT 6,
  `event_point` int(11) NOT NULL DEFAULT 0,
  `last_logout` datetime NULL DEFAULT current_timestamp(),
  `create_date` datetime NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5014 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_stolen_skill
-- ----------------------------
DROP TABLE IF EXISTS `character_stolen_skill`;
CREATE TABLE `character_stolen_skill`  (
  `character_id` int(11) NOT NULL,
  `slot` tinyint(4) NULL DEFAULT NULL,
  `idx` tinyint(4) NULL DEFAULT NULL,
  `skill_id` int(11) NULL DEFAULT NULL,
  `level` int(11) NULL DEFAULT NULL,
  `master_level` int(11) NULL DEFAULT NULL,
  INDEX `character_stolen_skill_character_id_IDX`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_stolen_skill_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_stolen_skill_copy1`;
CREATE TABLE `character_stolen_skill_copy1`  (
  `character_id` int(11) NOT NULL,
  `slot` tinyint(4) NULL DEFAULT NULL,
  `idx` tinyint(4) NULL DEFAULT NULL,
  `skill_id` int(11) NULL DEFAULT NULL,
  `level` int(11) NULL DEFAULT NULL,
  `master_level` int(11) NULL DEFAULT NULL,
  INDEX `character_stolen_skill_character_id_IDX`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_vcore
-- ----------------------------
DROP TABLE IF EXISTS `character_vcore`;
CREATE TABLE `character_vcore`  (
  `id` bigint(20) NOT NULL,
  `character_id` int(11) NOT NULL DEFAULT 0,
  `core_id` int(11) NOT NULL DEFAULT 0,
  `level` int(11) NOT NULL DEFAULT 0,
  `exp` int(11) NOT NULL DEFAULT 0,
  `state` int(11) NOT NULL DEFAULT 0,
  `first_skill` int(11) NOT NULL DEFAULT 0,
  `middle_skill` int(11) NOT NULL DEFAULT 0,
  `last_skill` int(11) NOT NULL DEFAULT 0,
  `slot` int(11) NOT NULL DEFAULT 0,
  `expire_date` datetime NOT NULL DEFAULT '2079-01-01 00:00:00',
  `lock` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_vcore_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_vcore_copy1`;
CREATE TABLE `character_vcore_copy1`  (
  `id` bigint(20) NOT NULL,
  `character_id` int(11) NOT NULL DEFAULT 0,
  `core_id` int(11) NOT NULL DEFAULT 0,
  `level` int(11) NOT NULL DEFAULT 0,
  `exp` int(11) NOT NULL DEFAULT 0,
  `state` int(11) NOT NULL DEFAULT 0,
  `first_skill` int(11) NOT NULL DEFAULT 0,
  `middle_skill` int(11) NOT NULL DEFAULT 0,
  `last_skill` int(11) NOT NULL DEFAULT 0,
  `slot` int(11) NOT NULL DEFAULT 0,
  `expire_date` datetime NOT NULL DEFAULT '2079-01-01 00:00:00',
  `lock` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_vmatrix_slot
-- ----------------------------
DROP TABLE IF EXISTS `character_vmatrix_slot`;
CREATE TABLE `character_vmatrix_slot`  (
  `character_id` int(11) NOT NULL,
  `slot` int(11) NOT NULL,
  `state` int(11) NOT NULL DEFAULT -1,
  `extend_level` int(11) NOT NULL DEFAULT 0,
  `expansion` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`character_id`, `slot`) USING BTREE,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_vmatrix_slot_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_vmatrix_slot_copy1`;
CREATE TABLE `character_vmatrix_slot_copy1`  (
  `character_id` int(11) NOT NULL,
  `slot` int(11) NOT NULL,
  `state` int(11) NOT NULL DEFAULT -1,
  `extend_level` int(11) NOT NULL DEFAULT 0,
  `expansion` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`character_id`, `slot`) USING BTREE,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_wild_hunter_info
-- ----------------------------
DROP TABLE IF EXISTS `character_wild_hunter_info`;
CREATE TABLE `character_wild_hunter_info`  (
  `character_id` int(11) NOT NULL,
  `select` tinyint(4) NOT NULL,
  `mob_ids` varchar(41) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  PRIMARY KEY (`character_id`) USING BTREE,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_wild_hunter_info_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_wild_hunter_info_copy1`;
CREATE TABLE `character_wild_hunter_info_copy1`  (
  `character_id` int(11) NOT NULL,
  `select` tinyint(4) NOT NULL,
  `mob_ids` varchar(41) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  PRIMARY KEY (`character_id`) USING BTREE,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_world_share_record
-- ----------------------------
DROP TABLE IF EXISTS `character_world_share_record`;
CREATE TABLE `character_world_share_record`  (
  `account_id` int(11) NOT NULL,
  `world_id` int(11) NOT NULL,
  `type` tinyint(4) NOT NULL DEFAULT 0,
  `record_id` int(11) NOT NULL,
  `str_raw` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  UNIQUE INDEX `unique_awtr`(`account_id` ASC, `world_id` ASC, `type` ASC, `record_id` ASC) USING BTREE,
  INDEX `account_id`(`account_id` ASC, `world_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_world_share_record_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_world_share_record_copy1`;
CREATE TABLE `character_world_share_record_copy1`  (
  `account_id` int(11) NOT NULL,
  `world_id` int(11) NOT NULL,
  `type` tinyint(4) NOT NULL DEFAULT 0,
  `record_id` int(11) NOT NULL,
  `str_raw` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  UNIQUE INDEX `unique_awtr`(`account_id` ASC, `world_id` ASC, `type` ASC, `record_id` ASC) USING BTREE,
  INDEX `account_id`(`account_id` ASC, `world_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_zero_info
-- ----------------------------
DROP TABLE IF EXISTS `character_zero_info`;
CREATE TABLE `character_zero_info`  (
  `character_id` int(11) NOT NULL,
  `beta` tinyint(4) NOT NULL DEFAULT 0,
  `hp` int(11) NOT NULL DEFAULT 0,
  `mp` int(11) NOT NULL DEFAULT 0,
  `skin` tinyint(4) NOT NULL DEFAULT 0,
  `hair` int(11) NOT NULL DEFAULT 0,
  `face` int(11) NOT NULL DEFAULT 0,
  `max_hp` int(11) NOT NULL DEFAULT 0,
  `max_mp` int(11) NOT NULL DEFAULT 0,
  `link_cash_part` bigint(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`character_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_zero_info_copy1
-- ----------------------------
DROP TABLE IF EXISTS `character_zero_info_copy1`;
CREATE TABLE `character_zero_info_copy1`  (
  `character_id` int(11) NOT NULL,
  `beta` tinyint(4) NOT NULL DEFAULT 0,
  `hp` int(11) NOT NULL DEFAULT 0,
  `mp` int(11) NOT NULL DEFAULT 0,
  `skin` tinyint(4) NOT NULL DEFAULT 0,
  `hair` int(11) NOT NULL DEFAULT 0,
  `face` int(11) NOT NULL DEFAULT 0,
  `max_hp` int(11) NOT NULL DEFAULT 0,
  `max_mp` int(11) NOT NULL DEFAULT 0,
  `link_cash_part` bigint(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`character_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for characters_pqlog
-- ----------------------------
DROP TABLE IF EXISTS `characters_pqlog`;
CREATE TABLE `characters_pqlog`  (
  `characters_id` int(10) NOT NULL,
  `key` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL DEFAULT '',
  `value` int(10) NOT NULL DEFAULT 0,
  `reset_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`characters_id`, `key`) USING BTREE,
  INDEX `characterid`(`characters_id` ASC) USING BTREE,
  CONSTRAINT `characters_pqlog_ibfk_1` FOREIGN KEY (`characters_id`) REFERENCES `characters` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = gb2312 COLLATE = gb2312_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for characters_pqlog_copy1
-- ----------------------------
DROP TABLE IF EXISTS `characters_pqlog_copy1`;
CREATE TABLE `characters_pqlog_copy1`  (
  `characters_id` int(10) NOT NULL,
  `key` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL DEFAULT '',
  `value` int(10) NOT NULL DEFAULT 0,
  `reset_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`characters_id`, `key`) USING BTREE,
  INDEX `characterid`(`characters_id` ASC) USING BTREE,
  CONSTRAINT `characters_pqlog_copy1_ibfk_1` FOREIGN KEY (`characters_id`) REFERENCES `characters` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = gb2312 COLLATE = gb2312_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for chat_history
-- ----------------------------
DROP TABLE IF EXISTS `chat_history`;
CREATE TABLE `chat_history`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `qq` bigint(20) NOT NULL,
  `name` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `groupId` bigint(20) NULL DEFAULT NULL,
  `time` datetime NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 90610 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for chat_history_copy1
-- ----------------------------
DROP TABLE IF EXISTS `chat_history_copy1`;
CREATE TABLE `chat_history_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `qq` bigint(20) NOT NULL,
  `name` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `groupId` bigint(20) NULL DEFAULT NULL,
  `time` datetime NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 90610 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for dojang_ranking
-- ----------------------------
DROP TABLE IF EXISTS `dojang_ranking`;
CREATE TABLE `dojang_ranking`  (
  `character_id` int(11) NOT NULL,
  `name` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL,
  `job` smallint(6) NOT NULL DEFAULT 0,
  `floor` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `utime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `rday` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for dojang_ranking_copy1
-- ----------------------------
DROP TABLE IF EXISTS `dojang_ranking_copy1`;
CREATE TABLE `dojang_ranking_copy1`  (
  `character_id` int(11) NOT NULL,
  `name` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL,
  `job` smallint(6) NOT NULL DEFAULT 0,
  `floor` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `utime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `rday` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ecoin
-- ----------------------------
DROP TABLE IF EXISTS `ecoin`;
CREATE TABLE `ecoin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `pay` int(11) NOT NULL DEFAULT 0,
  `pay_used` int(11) NOT NULL DEFAULT 0,
  `pay_reward` int(11) NOT NULL DEFAULT 0,
  `pay_all` int(11) NOT NULL DEFAULT 0,
  `accname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `TWD` int(15) UNSIGNED ZEROFILL NOT NULL DEFAULT 000000000000000,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `accname`(`account_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ecoin_copy1
-- ----------------------------
DROP TABLE IF EXISTS `ecoin_copy1`;
CREATE TABLE `ecoin_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `pay` int(11) NOT NULL DEFAULT 0,
  `pay_used` int(11) NOT NULL DEFAULT 0,
  `pay_reward` int(11) NOT NULL DEFAULT 0,
  `pay_all` int(11) NOT NULL DEFAULT 0,
  `accname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `TWD` int(15) UNSIGNED ZEROFILL NOT NULL DEFAULT 000000000000000,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `accname`(`account_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for event_account_log
-- ----------------------------
DROP TABLE IF EXISTS `event_account_log`;
CREATE TABLE `event_account_log`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL DEFAULT 0,
  `world` int(11) NOT NULL DEFAULT 0,
  `log_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `value` int(11) NOT NULL DEFAULT 0,
  `time` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `1`(`account_id`, `log_name`) USING HASH
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for event_account_log_copy1
-- ----------------------------
DROP TABLE IF EXISTS `event_account_log_copy1`;
CREATE TABLE `event_account_log_copy1`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL DEFAULT 0,
  `world` int(11) NOT NULL DEFAULT 0,
  `log_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `value` int(11) NOT NULL DEFAULT 0,
  `time` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `1`(`account_id`, `log_name`) USING HASH
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for fish_equip
-- ----------------------------
DROP TABLE IF EXISTS `fish_equip`;
CREATE TABLE `fish_equip`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item` int(11) NULL DEFAULT NULL,
  `use` int(11) NOT NULL DEFAULT 0,
  `num` int(11) NULL DEFAULT NULL,
  `limit` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for flotcdk
-- ----------------------------
DROP TABLE IF EXISTS `flotcdk`;
CREATE TABLE `flotcdk`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `CDKname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `type` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for flotcdk_copy1
-- ----------------------------
DROP TABLE IF EXISTS `flotcdk_copy1`;
CREATE TABLE `flotcdk_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `CDKname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `type` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for friend
-- ----------------------------
DROP TABLE IF EXISTS `friend`;
CREATE TABLE `friend`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `world_id` int(11) NOT NULL DEFAULT 0,
  `account_id` int(11) NOT NULL DEFAULT 0,
  `character_id` int(11) NOT NULL DEFAULT 0,
  `friend_account_id` int(11) NOT NULL DEFAULT 0,
  `friend_character_id` int(11) NOT NULL DEFAULT 0,
  `flag` tinyint(4) NOT NULL DEFAULT 0,
  `name` varchar(13) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `group` varchar(17) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `nick` varchar(13) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `memo` varchar(256) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`world_id` ASC, `account_id` ASC, `character_id` ASC, `friend_account_id` ASC, `friend_character_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for friend_account
-- ----------------------------
DROP TABLE IF EXISTS `friend_account`;
CREATE TABLE `friend_account`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `world_id` int(11) NOT NULL DEFAULT 0,
  `account_id` int(11) NOT NULL DEFAULT 0,
  `character_id` int(11) NOT NULL DEFAULT 0,
  `friend_account_id` int(11) NOT NULL DEFAULT 0,
  `friend_character_id` int(11) NOT NULL DEFAULT 0,
  `flag` tinyint(4) NOT NULL DEFAULT 0,
  `name` varchar(13) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `group` varchar(17) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `nick` varchar(13) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `memo` varchar(256) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`world_id` ASC, `account_id` ASC, `character_id` ASC, `friend_account_id` ASC, `friend_character_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for friend_account_copy1
-- ----------------------------
DROP TABLE IF EXISTS `friend_account_copy1`;
CREATE TABLE `friend_account_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `world_id` int(11) NOT NULL DEFAULT 0,
  `account_id` int(11) NOT NULL DEFAULT 0,
  `character_id` int(11) NOT NULL DEFAULT 0,
  `friend_account_id` int(11) NOT NULL DEFAULT 0,
  `friend_character_id` int(11) NOT NULL DEFAULT 0,
  `flag` tinyint(4) NOT NULL DEFAULT 0,
  `name` varchar(13) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `group` varchar(17) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `nick` varchar(13) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `memo` varchar(256) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`world_id` ASC, `account_id` ASC, `character_id` ASC, `friend_account_id` ASC, `friend_character_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for friend_black_list
-- ----------------------------
DROP TABLE IF EXISTS `friend_black_list`;
CREATE TABLE `friend_black_list`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `character_id` int(11) NOT NULL DEFAULT 0,
  `nick` varchar(13) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `block_name` varchar(13) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `block_character_id` int(11) NOT NULL DEFAULT 0,
  `block_account_id` int(11) NOT NULL DEFAULT 0,
  `memo` varchar(68) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `character_id`(`character_id` ASC, `nick` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for friend_black_list_copy1
-- ----------------------------
DROP TABLE IF EXISTS `friend_black_list_copy1`;
CREATE TABLE `friend_black_list_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `character_id` int(11) NOT NULL DEFAULT 0,
  `nick` varchar(13) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `block_name` varchar(13) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `block_character_id` int(11) NOT NULL DEFAULT 0,
  `block_account_id` int(11) NOT NULL DEFAULT 0,
  `memo` varchar(68) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `character_id`(`character_id` ASC, `nick` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for friend_copy1
-- ----------------------------
DROP TABLE IF EXISTS `friend_copy1`;
CREATE TABLE `friend_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `world_id` int(11) NOT NULL DEFAULT 0,
  `account_id` int(11) NOT NULL DEFAULT 0,
  `character_id` int(11) NOT NULL DEFAULT 0,
  `friend_account_id` int(11) NOT NULL DEFAULT 0,
  `friend_character_id` int(11) NOT NULL DEFAULT 0,
  `flag` tinyint(4) NOT NULL DEFAULT 0,
  `name` varchar(13) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `group` varchar(17) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `nick` varchar(13) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `memo` varchar(256) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`world_id` ASC, `account_id` ASC, `character_id` ASC, `friend_account_id` ASC, `friend_character_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for game_reward
-- ----------------------------
DROP TABLE IF EXISTS `game_reward`;
CREATE TABLE `game_reward`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NULL DEFAULT NULL,
  `item_id` int(11) NULL DEFAULT NULL,
  `quantity` int(11) NULL DEFAULT NULL,
  `balance` int(11) NULL DEFAULT NULL,
  `mesos` bigint(20) NULL DEFAULT NULL,
  `exp` bigint(20) NULL DEFAULT NULL,
  `start_date` datetime NULL DEFAULT NULL,
  `end_date` datetime NULL DEFAULT NULL,
  `message` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `end_time`(`end_date` ASC) USING BTREE,
  INDEX `id`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for game_reward_copy1
-- ----------------------------
DROP TABLE IF EXISTS `game_reward_copy1`;
CREATE TABLE `game_reward_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NULL DEFAULT NULL,
  `item_id` int(11) NULL DEFAULT NULL,
  `quantity` int(11) NULL DEFAULT NULL,
  `balance` int(11) NULL DEFAULT NULL,
  `mesos` bigint(20) NULL DEFAULT NULL,
  `exp` bigint(20) NULL DEFAULT NULL,
  `start_date` datetime NULL DEFAULT NULL,
  `end_date` datetime NULL DEFAULT NULL,
  `message` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `end_time`(`end_date` ASC) USING BTREE,
  INDEX `id`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for game_reward_log
-- ----------------------------
DROP TABLE IF EXISTS `game_reward_log`;
CREATE TABLE `game_reward_log`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `reward_id` int(11) NOT NULL,
  `state` int(11) NOT NULL DEFAULT 0,
  `update_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `character_id`(`account_id` ASC) USING BTREE,
  INDEX `reward_id`(`reward_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for game_reward_log_copy1
-- ----------------------------
DROP TABLE IF EXISTS `game_reward_log_copy1`;
CREATE TABLE `game_reward_log_copy1`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `reward_id` int(11) NOT NULL,
  `state` int(11) NOT NULL DEFAULT 0,
  `update_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `character_id`(`account_id` ASC) USING BTREE,
  INDEX `reward_id`(`reward_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 65 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for general_log
-- ----------------------------
DROP TABLE IF EXISTS `general_log`;
CREATE TABLE `general_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) NULL DEFAULT NULL,
  `cname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `remarks` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `script` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `log` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `date` datetime NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ghost_hunting_map
-- ----------------------------
DROP TABLE IF EXISTS `ghost_hunting_map`;
CREATE TABLE `ghost_hunting_map`  (
  `map_id` int(11) NOT NULL,
  `channel_id` int(11) NULL DEFAULT NULL,
  `create_time` datetime NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`map_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ghost_hunting_map_copy1
-- ----------------------------
DROP TABLE IF EXISTS `ghost_hunting_map_copy1`;
CREATE TABLE `ghost_hunting_map_copy1`  (
  `map_id` int(11) NOT NULL,
  `channel_id` int(11) NULL DEFAULT NULL,
  `create_time` datetime NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`map_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gray_one_cdk
-- ----------------------------
DROP TABLE IF EXISTS `gray_one_cdk`;
CREATE TABLE `gray_one_cdk`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cdk` tinytext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `Code` tinytext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `cid` int(11) NULL DEFAULT NULL,
  `cname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `testing` int(11) NOT NULL DEFAULT 0,
  `Title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `enddate` timestamp NULL DEFAULT NULL,
  `Only` int(11) NOT NULL,
  `sum` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gray_one_cdk_copy1
-- ----------------------------
DROP TABLE IF EXISTS `gray_one_cdk_copy1`;
CREATE TABLE `gray_one_cdk_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cdk` tinytext CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `Code` tinytext CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `cid` int(11) NULL DEFAULT NULL,
  `cname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `testing` int(11) NOT NULL DEFAULT 0,
  `Title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `enddate` timestamp NULL DEFAULT NULL,
  `Only` int(11) NOT NULL,
  `sum` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_alliance_grade
-- ----------------------------
DROP TABLE IF EXISTS `guild_alliance_grade`;
CREATE TABLE `guild_alliance_grade`  (
  `alliance_id` int(11) NOT NULL,
  `grade` tinyint(4) NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  INDEX `alliance_id`(`alliance_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_alliance_grade_copy1
-- ----------------------------
DROP TABLE IF EXISTS `guild_alliance_grade_copy1`;
CREATE TABLE `guild_alliance_grade_copy1`  (
  `alliance_id` int(11) NOT NULL,
  `grade` tinyint(4) NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  INDEX `alliance_id`(`alliance_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_alliance_info
-- ----------------------------
DROP TABLE IF EXISTS `guild_alliance_info`;
CREATE TABLE `guild_alliance_info`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `capacity` int(11) NOT NULL,
  `notice` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_alliance_info_copy1
-- ----------------------------
DROP TABLE IF EXISTS `guild_alliance_info_copy1`;
CREATE TABLE `guild_alliance_info_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `capacity` int(11) NOT NULL,
  `notice` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_applicant
-- ----------------------------
DROP TABLE IF EXISTS `guild_applicant`;
CREATE TABLE `guild_applicant`  (
  `character_id` int(11) NOT NULL,
  `guild_id` int(11) NOT NULL,
  `intro` varchar(160) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  INDEX `character_id`(`character_id` ASC, `guild_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_applicant_copy1
-- ----------------------------
DROP TABLE IF EXISTS `guild_applicant_copy1`;
CREATE TABLE `guild_applicant_copy1`  (
  `character_id` int(11) NOT NULL,
  `guild_id` int(11) NOT NULL,
  `intro` varchar(160) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  INDEX `character_id`(`character_id` ASC, `guild_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_bulletin
-- ----------------------------
DROP TABLE IF EXISTS `guild_bulletin`;
CREATE TABLE `guild_bulletin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `guild_id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `character_id` int(11) NOT NULL,
  `content` varchar(210) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `guild_id`(`guild_id` ASC, `type` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_bulletin_copy1
-- ----------------------------
DROP TABLE IF EXISTS `guild_bulletin_copy1`;
CREATE TABLE `guild_bulletin_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `guild_id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `character_id` int(11) NOT NULL,
  `content` varchar(210) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `guild_id`(`guild_id` ASC, `type` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_bulletin_like
-- ----------------------------
DROP TABLE IF EXISTS `guild_bulletin_like`;
CREATE TABLE `guild_bulletin_like`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bulletin_id` int(11) NOT NULL,
  `character_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `bulletin_id`(`bulletin_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_bulletin_like_copy1
-- ----------------------------
DROP TABLE IF EXISTS `guild_bulletin_like_copy1`;
CREATE TABLE `guild_bulletin_like_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bulletin_id` int(11) NOT NULL,
  `character_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `bulletin_id`(`bulletin_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_bulletin_reply
-- ----------------------------
DROP TABLE IF EXISTS `guild_bulletin_reply`;
CREATE TABLE `guild_bulletin_reply`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bulletin_id` int(11) NOT NULL,
  `character_id` int(11) NOT NULL,
  `content` varchar(210) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `post_date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `bulletin_id`(`bulletin_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_bulletin_reply_copy1
-- ----------------------------
DROP TABLE IF EXISTS `guild_bulletin_reply_copy1`;
CREATE TABLE `guild_bulletin_reply_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bulletin_id` int(11) NOT NULL,
  `character_id` int(11) NOT NULL,
  `content` varchar(210) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `post_date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `bulletin_id`(`bulletin_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_damage_rank
-- ----------------------------
DROP TABLE IF EXISTS `guild_damage_rank`;
CREATE TABLE `guild_damage_rank`  (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(55) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `level` int(9) NULL DEFAULT NULL,
  `passDate` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_damage_rank_copy1
-- ----------------------------
DROP TABLE IF EXISTS `guild_damage_rank_copy1`;
CREATE TABLE `guild_damage_rank_copy1`  (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(55) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `level` int(9) NULL DEFAULT NULL,
  `passDate` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_event_point
-- ----------------------------
DROP TABLE IF EXISTS `guild_event_point`;
CREATE TABLE `guild_event_point`  (
  `character_id` int(11) NOT NULL,
  `type` tinyint(4) NOT NULL,
  `point` int(11) NOT NULL DEFAULT 0,
  `last_point` int(11) NOT NULL DEFAULT 0,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  UNIQUE INDEX `character_id`(`character_id` ASC, `type` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_event_point_copy1
-- ----------------------------
DROP TABLE IF EXISTS `guild_event_point_copy1`;
CREATE TABLE `guild_event_point_copy1`  (
  `character_id` int(11) NOT NULL,
  `type` tinyint(4) NOT NULL,
  `point` int(11) NOT NULL DEFAULT 0,
  `last_point` int(11) NOT NULL DEFAULT 0,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  UNIQUE INDEX `character_id`(`character_id` ASC, `type` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_event_rank
-- ----------------------------
DROP TABLE IF EXISTS `guild_event_rank`;
CREATE TABLE `guild_event_rank`  (
  `guild_id` int(11) NOT NULL,
  `type` tinyint(4) NOT NULL,
  `point` int(11) NOT NULL DEFAULT 0,
  `last_point` int(11) NOT NULL DEFAULT 0,
  `rank` int(11) NOT NULL DEFAULT 0,
  `last_rank` int(11) NOT NULL DEFAULT 0,
  `sp` int(11) NOT NULL DEFAULT 0,
  `last_sp` int(11) NOT NULL DEFAULT 0,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  UNIQUE INDEX `guild_id`(`guild_id` ASC, `type` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_event_rank_copy1
-- ----------------------------
DROP TABLE IF EXISTS `guild_event_rank_copy1`;
CREATE TABLE `guild_event_rank_copy1`  (
  `guild_id` int(11) NOT NULL,
  `type` tinyint(4) NOT NULL,
  `point` int(11) NOT NULL DEFAULT 0,
  `last_point` int(11) NOT NULL DEFAULT 0,
  `rank` int(11) NOT NULL DEFAULT 0,
  `last_rank` int(11) NOT NULL DEFAULT 0,
  `sp` int(11) NOT NULL DEFAULT 0,
  `last_sp` int(11) NOT NULL DEFAULT 0,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  UNIQUE INDEX `guild_id`(`guild_id` ASC, `type` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_grade
-- ----------------------------
DROP TABLE IF EXISTS `guild_grade`;
CREATE TABLE `guild_grade`  (
  `guild_id` int(11) NOT NULL,
  `grade` tinyint(4) NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `flag` int(11) NOT NULL,
  INDEX `guild_id`(`guild_id` ASC) USING BTREE,
  INDEX `guild_id_2`(`guild_id` ASC, `grade` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_grade_copy1
-- ----------------------------
DROP TABLE IF EXISTS `guild_grade_copy1`;
CREATE TABLE `guild_grade_copy1`  (
  `guild_id` int(11) NOT NULL,
  `grade` tinyint(4) NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `flag` int(11) NOT NULL,
  INDEX `guild_id`(`guild_id` ASC) USING BTREE,
  INDEX `guild_id_2`(`guild_id` ASC, `grade` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_info
-- ----------------------------
DROP TABLE IF EXISTS `guild_info`;
CREATE TABLE `guild_info`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `world_id` int(11) NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `capacity` int(11) NOT NULL,
  `emblem_back` mediumint(9) NOT NULL,
  `emblem_back_color` tinyint(4) NOT NULL,
  `emblem_design` mediumint(9) NOT NULL,
  `emblem_design_color` tinyint(4) NOT NULL,
  `emblem_raw` varchar(1024) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `intro` varchar(160) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `total_prestige` int(11) NOT NULL,
  `prestige` int(11) NOT NULL,
  `alliance_id` int(11) NOT NULL,
  `guild_point` int(11) NOT NULL,
  `allow_join` tinyint(4) NOT NULL DEFAULT 1,
  `trend_event` int(11) NOT NULL,
  `trend_login` int(11) NOT NULL,
  `trend_age` int(11) NOT NULL,
  `create_date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `name`(`name` ASC) USING BTREE,
  INDEX `alliance_id`(`alliance_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_info_copy1
-- ----------------------------
DROP TABLE IF EXISTS `guild_info_copy1`;
CREATE TABLE `guild_info_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `world_id` int(11) NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `capacity` int(11) NOT NULL,
  `emblem_back` mediumint(9) NOT NULL,
  `emblem_back_color` tinyint(4) NOT NULL,
  `emblem_design` mediumint(9) NOT NULL,
  `emblem_design_color` tinyint(4) NOT NULL,
  `emblem_raw` varchar(1024) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `intro` varchar(160) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `total_prestige` int(11) NOT NULL,
  `prestige` int(11) NOT NULL,
  `alliance_id` int(11) NOT NULL,
  `guild_point` int(11) NOT NULL,
  `allow_join` tinyint(4) NOT NULL DEFAULT 1,
  `trend_event` int(11) NOT NULL,
  `trend_login` int(11) NOT NULL,
  `trend_age` int(11) NOT NULL,
  `create_date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `name`(`name` ASC) USING BTREE,
  INDEX `alliance_id`(`alliance_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_member
-- ----------------------------
DROP TABLE IF EXISTS `guild_member`;
CREATE TABLE `guild_member`  (
  `character_id` int(11) NOT NULL,
  `guild_id` int(11) NOT NULL,
  `grade` tinyint(4) NOT NULL DEFAULT 5,
  `alliance_grade` tinyint(4) NOT NULL DEFAULT 5,
  `contribution` int(11) NOT NULL,
  `inc_guild_point` int(11) NOT NULL,
  `contribution_date` datetime NOT NULL DEFAULT current_timestamp(),
  `check_in_time` int(11) NOT NULL,
  `join_date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`character_id`) USING BTREE,
  INDEX `guild_id`(`guild_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_member_copy1
-- ----------------------------
DROP TABLE IF EXISTS `guild_member_copy1`;
CREATE TABLE `guild_member_copy1`  (
  `character_id` int(11) NOT NULL,
  `guild_id` int(11) NOT NULL,
  `grade` tinyint(4) NOT NULL DEFAULT 5,
  `alliance_grade` tinyint(4) NOT NULL DEFAULT 5,
  `contribution` int(11) NOT NULL,
  `inc_guild_point` int(11) NOT NULL,
  `contribution_date` datetime NOT NULL DEFAULT current_timestamp(),
  `check_in_time` int(11) NOT NULL,
  `join_date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`character_id`) USING BTREE,
  INDEX `guild_id`(`guild_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_personal_point
-- ----------------------------
DROP TABLE IF EXISTS `guild_personal_point`;
CREATE TABLE `guild_personal_point`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `guild_id` int(11) NOT NULL,
  `character_id` int(11) NOT NULL,
  `point` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `guild_id`(`guild_id` ASC, `character_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_personal_point_copy1
-- ----------------------------
DROP TABLE IF EXISTS `guild_personal_point_copy1`;
CREATE TABLE `guild_personal_point_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `guild_id` int(11) NOT NULL,
  `character_id` int(11) NOT NULL,
  `point` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `guild_id`(`guild_id` ASC, `character_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_quest_progress
-- ----------------------------
DROP TABLE IF EXISTS `guild_quest_progress`;
CREATE TABLE `guild_quest_progress`  (
  `character_id` int(11) NOT NULL,
  `quest_index` int(11) NOT NULL,
  `quest_type` varchar(32) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `quest_data` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `is_finished` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`character_id`, `quest_index`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_quest_progress_copy1
-- ----------------------------
DROP TABLE IF EXISTS `guild_quest_progress_copy1`;
CREATE TABLE `guild_quest_progress_copy1`  (
  `character_id` int(11) NOT NULL,
  `quest_index` int(11) NOT NULL,
  `quest_type` varchar(32) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `quest_data` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `is_finished` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`character_id`, `quest_index`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_skill
-- ----------------------------
DROP TABLE IF EXISTS `guild_skill`;
CREATE TABLE `guild_skill`  (
  `guild_id` int(11) NOT NULL DEFAULT 0,
  `skill_id` int(11) NOT NULL DEFAULT 0,
  `level` mediumint(9) NOT NULL DEFAULT 1,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `purchaser` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `activator` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  INDEX `guild_id`(`guild_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_skill_copy1
-- ----------------------------
DROP TABLE IF EXISTS `guild_skill_copy1`;
CREATE TABLE `guild_skill_copy1`  (
  `guild_id` int(11) NOT NULL DEFAULT 0,
  `skill_id` int(11) NOT NULL DEFAULT 0,
  `level` mediumint(9) NOT NULL DEFAULT 1,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `purchaser` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `activator` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  INDEX `guild_id`(`guild_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for hair_face_log
-- ----------------------------
DROP TABLE IF EXISTS `hair_face_log`;
CREATE TABLE `hair_face_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NULL DEFAULT NULL,
  `character_id` int(11) NULL DEFAULT NULL,
  `character_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `hair` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `face` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `skin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `datetime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for hair_face_log_copy1
-- ----------------------------
DROP TABLE IF EXISTS `hair_face_log_copy1`;
CREATE TABLE `hair_face_log_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NULL DEFAULT NULL,
  `character_id` int(11) NULL DEFAULT NULL,
  `character_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `hair` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `face` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `skin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `datetime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for home_size
-- ----------------------------
DROP TABLE IF EXISTS `home_size`;
CREATE TABLE `home_size`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accid` int(11) NULL DEFAULT NULL,
  `size` int(11) NULL DEFAULT NULL,
  `gialv` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for home_size_copy1
-- ----------------------------
DROP TABLE IF EXISTS `home_size_copy1`;
CREATE TABLE `home_size_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accid` int(11) NULL DEFAULT NULL,
  `size` int(11) NULL DEFAULT NULL,
  `gialv` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for hypay
-- ----------------------------
DROP TABLE IF EXISTS `hypay`;
CREATE TABLE `hypay`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accname` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `pay` decimal(10, 2) NULL DEFAULT 0.00,
  `payUsed` decimal(10, 2) NOT NULL DEFAULT 0.00,
  `payReward` decimal(10, 2) NOT NULL DEFAULT 0.00,
  `leiji` int(10) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `accname`(`accname` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for hypay_copy1
-- ----------------------------
DROP TABLE IF EXISTS `hypay_copy1`;
CREATE TABLE `hypay_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL DEFAULT '',
  `pay` int(11) NOT NULL DEFAULT 0,
  `payUsed` int(11) NOT NULL DEFAULT 0,
  `payReward` int(11) NOT NULL DEFAULT 0,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `rmb` int(11) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `leiji` int(11) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `accname`(`accname` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 185 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for hypay_log
-- ----------------------------
DROP TABLE IF EXISTS `hypay_log`;
CREATE TABLE `hypay_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NULL DEFAULT NULL,
  `cash` int(255) NULL DEFAULT NULL,
  `addtime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for hypay_log_copy1
-- ----------------------------
DROP TABLE IF EXISTS `hypay_log_copy1`;
CREATE TABLE `hypay_log_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NULL DEFAULT NULL,
  `cash` int(255) NULL DEFAULT NULL,
  `addtime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for item_bundle
-- ----------------------------
DROP TABLE IF EXISTS `item_bundle`;
CREATE TABLE `item_bundle`  (
  `id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `sn` bigint(20) NOT NULL DEFAULT 0,
  `item_id` int(11) NOT NULL DEFAULT 0,
  `expire_date` datetime NOT NULL DEFAULT '2079-01-01 00:00:00',
  `bag_index` int(11) NOT NULL DEFAULT -1,
  `title` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `attribute` int(11) NOT NULL DEFAULT 0,
  `locate` tinyint(4) NOT NULL DEFAULT 0,
  `quantity` smallint(6) NOT NULL DEFAULT 0,
  `familiar` int(11) NOT NULL DEFAULT 0,
  `level` smallint(6) NOT NULL DEFAULT 0,
  `skill` smallint(6) NOT NULL DEFAULT 0,
  `potential1` int(6) NOT NULL DEFAULT 0,
  `potential2` int(6) NOT NULL DEFAULT 0,
  `potential3` int(6) NOT NULL DEFAULT 0,
  `grade` tinyint(4) NOT NULL DEFAULT 0,
  `exchange_timeout` datetime NOT NULL DEFAULT '1900-01-01 00:00:00',
  `exchange` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id`(`id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for item_bundle_copy1
-- ----------------------------
DROP TABLE IF EXISTS `item_bundle_copy1`;
CREATE TABLE `item_bundle_copy1`  (
  `id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `sn` bigint(20) NOT NULL DEFAULT 0,
  `item_id` int(11) NOT NULL DEFAULT 0,
  `expire_date` datetime NOT NULL DEFAULT '2079-01-01 00:00:00',
  `bag_index` int(11) NOT NULL DEFAULT -1,
  `title` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `attribute` int(11) NOT NULL DEFAULT 0,
  `locate` tinyint(4) NOT NULL DEFAULT 0,
  `quantity` smallint(6) NOT NULL DEFAULT 0,
  `familiar` int(11) NOT NULL DEFAULT 0,
  `level` smallint(6) NOT NULL DEFAULT 0,
  `skill` smallint(6) NOT NULL DEFAULT 0,
  `potential1` int(11) NOT NULL DEFAULT 0,
  `potential2` int(11) NOT NULL DEFAULT 0,
  `potential3` int(11) NOT NULL DEFAULT 0,
  `grade` tinyint(4) NOT NULL DEFAULT 0,
  `exchange_timeout` datetime NOT NULL DEFAULT '1900-01-01 00:00:00',
  `exchange` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id`(`id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for item_cash_info
-- ----------------------------
DROP TABLE IF EXISTS `item_cash_info`;
CREATE TABLE `item_cash_info`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `character_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `commodity_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `giver` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `date_expire` datetime NOT NULL,
  `payback_rate` int(11) NOT NULL,
  `discount_rate` double NOT NULL,
  `order_no` int(11) NOT NULL,
  `product_no` int(11) NOT NULL,
  `refundable` tinyint(4) NOT NULL,
  `source_fag` tinyint(4) NOT NULL,
  `store_bank` tinyint(4) NOT NULL,
  `purchase_date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for item_cash_info_copy1
-- ----------------------------
DROP TABLE IF EXISTS `item_cash_info_copy1`;
CREATE TABLE `item_cash_info_copy1`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `character_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `commodity_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `giver` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `date_expire` datetime NOT NULL,
  `payback_rate` int(11) NOT NULL,
  `discount_rate` double NOT NULL,
  `order_no` int(11) NOT NULL,
  `product_no` int(11) NOT NULL,
  `refundable` tinyint(4) NOT NULL,
  `source_fag` tinyint(4) NOT NULL,
  `store_bank` tinyint(4) NOT NULL,
  `purchase_date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for item_cash_info_copy1_copy1
-- ----------------------------
DROP TABLE IF EXISTS `item_cash_info_copy1_copy1`;
CREATE TABLE `item_cash_info_copy1_copy1`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `character_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `commodity_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `giver` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `date_expire` datetime NOT NULL,
  `payback_rate` int(11) NOT NULL,
  `discount_rate` double NOT NULL,
  `order_no` int(11) NOT NULL,
  `product_no` int(11) NOT NULL,
  `refundable` tinyint(4) NOT NULL,
  `source_fag` tinyint(4) NOT NULL,
  `store_bank` tinyint(4) NOT NULL,
  `purchase_date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for item_cash_info_copy2
-- ----------------------------
DROP TABLE IF EXISTS `item_cash_info_copy2`;
CREATE TABLE `item_cash_info_copy2`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `character_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `commodity_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `giver` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `date_expire` datetime NOT NULL,
  `payback_rate` int(11) NOT NULL,
  `discount_rate` double NOT NULL,
  `order_no` int(11) NOT NULL,
  `product_no` int(11) NOT NULL,
  `refundable` tinyint(4) NOT NULL,
  `source_fag` tinyint(4) NOT NULL,
  `store_bank` tinyint(4) NOT NULL,
  `purchase_date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11470 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for item_equip
-- ----------------------------
DROP TABLE IF EXISTS `item_equip`;
CREATE TABLE `item_equip`  (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sn` bigint(20) NOT NULL DEFAULT 0,
  `item_id` int(11) NOT NULL DEFAULT 0,
  `expire_date` datetime NOT NULL DEFAULT '2079-01-01 00:00:00',
  `title` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id`(`id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for item_equip_android
-- ----------------------------
DROP TABLE IF EXISTS `item_equip_android`;
CREATE TABLE `item_equip_android`  (
  `id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `skin` smallint(6) NOT NULL DEFAULT 0,
  `hair` int(11) NOT NULL DEFAULT 0,
  `face` int(11) NOT NULL DEFAULT 0,
  `name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `attribute` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id`(`id` ASC) USING BTREE,
  CONSTRAINT `item_equip_android_ibfk_1` FOREIGN KEY (`id`) REFERENCES `item_equip` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for item_equip_android_copy1
-- ----------------------------
DROP TABLE IF EXISTS `item_equip_android_copy1`;
CREATE TABLE `item_equip_android_copy1`  (
  `id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `skin` smallint(6) NOT NULL DEFAULT 0,
  `hair` int(11) NOT NULL DEFAULT 0,
  `face` int(11) NOT NULL DEFAULT 0,
  `name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `attribute` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id`(`id` ASC) USING BTREE,
  CONSTRAINT `item_equip_android_copy1_ibfk_1` FOREIGN KEY (`id`) REFERENCES `item_equip` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for item_equip_base
-- ----------------------------
DROP TABLE IF EXISTS `item_equip_base`;
CREATE TABLE `item_equip_base`  (
  `id` bigint(20) UNSIGNED NOT NULL,
  `ruc` tinyint(4) NOT NULL DEFAULT 0,
  `cuc` tinyint(4) NOT NULL DEFAULT 0,
  `base_str` smallint(6) NOT NULL DEFAULT 0,
  `base_dex` smallint(6) NOT NULL DEFAULT 0,
  `base_int` smallint(6) NOT NULL DEFAULT 0,
  `base_luk` smallint(6) NOT NULL DEFAULT 0,
  `max_hp` smallint(6) NOT NULL DEFAULT 0,
  `max_mp` smallint(6) NOT NULL DEFAULT 0,
  `pad` smallint(6) NOT NULL DEFAULT 0,
  `mad` smallint(6) NOT NULL DEFAULT 0,
  `pdd` smallint(6) NOT NULL DEFAULT 0,
  `craft` smallint(6) NOT NULL DEFAULT 0,
  `speed` smallint(6) NOT NULL DEFAULT 0,
  `jump` smallint(6) NOT NULL DEFAULT 0,
  `attribute` int(11) NOT NULL DEFAULT 0,
  `level_up_type` tinyint(4) NOT NULL DEFAULT 0,
  `inc_skill` int(11) NOT NULL DEFAULT 0,
  `level` tinyint(4) NOT NULL DEFAULT 0,
  `exp` bigint(20) NOT NULL DEFAULT 0,
  `durability` int(11) NOT NULL DEFAULT 0,
  `iuc` int(11) NOT NULL DEFAULT 0,
  `puc` int(11) NOT NULL DEFAULT 0,
  `pvp_damage` smallint(6) NOT NULL DEFAULT 0,
  `reduce_req` tinyint(4) NOT NULL DEFAULT 0,
  `special_attribute` smallint(6) NOT NULL DEFAULT 0,
  `durability_max` int(11) NOT NULL DEFAULT 0,
  `inc_req` tinyint(4) NOT NULL DEFAULT 0,
  `growth_enchant` tinyint(4) NOT NULL DEFAULT 0,
  `enchant` tinyint(4) NOT NULL DEFAULT 0,
  `boss_damage_r` smallint(6) NOT NULL DEFAULT 0,
  `ignore_pdr` smallint(6) NOT NULL DEFAULT 0,
  `damage_r` smallint(6) NOT NULL DEFAULT 0,
  `stat_rate` smallint(6) NOT NULL DEFAULT 0,
  `cuttable` tinyint(4) NOT NULL DEFAULT -1,
  `ex_grade_option` bigint(20) NOT NULL DEFAULT 0,
  `item_state` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id`(`id` ASC) USING BTREE,
  CONSTRAINT `item_equip_base_ibfk_1` FOREIGN KEY (`id`) REFERENCES `item_equip` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for item_equip_base_copy1
-- ----------------------------
DROP TABLE IF EXISTS `item_equip_base_copy1`;
CREATE TABLE `item_equip_base_copy1`  (
  `id` bigint(20) UNSIGNED NOT NULL,
  `ruc` tinyint(4) NOT NULL DEFAULT 0,
  `cuc` tinyint(4) NOT NULL DEFAULT 0,
  `base_str` smallint(6) NOT NULL DEFAULT 0,
  `base_dex` smallint(6) NOT NULL DEFAULT 0,
  `base_int` smallint(6) NOT NULL DEFAULT 0,
  `base_luk` smallint(6) NOT NULL DEFAULT 0,
  `max_hp` smallint(6) NOT NULL DEFAULT 0,
  `max_mp` smallint(6) NOT NULL DEFAULT 0,
  `pad` smallint(6) NOT NULL DEFAULT 0,
  `mad` smallint(6) NOT NULL DEFAULT 0,
  `pdd` smallint(6) NOT NULL DEFAULT 0,
  `craft` smallint(6) NOT NULL DEFAULT 0,
  `speed` smallint(6) NOT NULL DEFAULT 0,
  `jump` smallint(6) NOT NULL DEFAULT 0,
  `attribute` int(11) NOT NULL DEFAULT 0,
  `level_up_type` tinyint(4) NOT NULL DEFAULT 0,
  `inc_skill` int(11) NOT NULL DEFAULT 0,
  `level` tinyint(4) NOT NULL DEFAULT 0,
  `exp` bigint(20) NOT NULL DEFAULT 0,
  `durability` int(11) NOT NULL DEFAULT 0,
  `iuc` int(11) NOT NULL DEFAULT 0,
  `puc` int(11) NOT NULL DEFAULT 0,
  `pvp_damage` smallint(6) NOT NULL DEFAULT 0,
  `reduce_req` tinyint(4) NOT NULL DEFAULT 0,
  `special_attribute` smallint(6) NOT NULL DEFAULT 0,
  `durability_max` int(11) NOT NULL DEFAULT 0,
  `inc_req` tinyint(4) NOT NULL DEFAULT 0,
  `growth_enchant` tinyint(4) NOT NULL DEFAULT 0,
  `enchant` tinyint(4) NOT NULL DEFAULT 0,
  `boss_damage_r` smallint(6) NOT NULL DEFAULT 0,
  `ignore_pdr` smallint(6) NOT NULL DEFAULT 0,
  `damage_r` smallint(6) NOT NULL DEFAULT 0,
  `stat_rate` smallint(6) NOT NULL DEFAULT 0,
  `cuttable` tinyint(4) NOT NULL DEFAULT -1,
  `ex_grade_option` bigint(20) NOT NULL DEFAULT 0,
  `item_state` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id`(`id` ASC) USING BTREE,
  CONSTRAINT `item_equip_base_copy1_ibfk_1` FOREIGN KEY (`id`) REFERENCES `item_equip` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for item_equip_cash_option
-- ----------------------------
DROP TABLE IF EXISTS `item_equip_cash_option`;
CREATE TABLE `item_equip_cash_option`  (
  `id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `sn` bigint(20) NOT NULL DEFAULT 0,
  `expire_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `grade` int(11) NOT NULL DEFAULT 0,
  `option1` int(11) NOT NULL DEFAULT 0,
  `option2` int(11) NOT NULL DEFAULT 0,
  `option3` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id`(`id` ASC) USING BTREE,
  CONSTRAINT `item_equip_cash_option_ibfk_1` FOREIGN KEY (`id`) REFERENCES `item_equip` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for item_equip_cash_option_copy1
-- ----------------------------
DROP TABLE IF EXISTS `item_equip_cash_option_copy1`;
CREATE TABLE `item_equip_cash_option_copy1`  (
  `id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `sn` bigint(20) NOT NULL DEFAULT 0,
  `expire_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `grade` int(11) NOT NULL DEFAULT 0,
  `option1` int(11) NOT NULL DEFAULT 0,
  `option2` int(11) NOT NULL DEFAULT 0,
  `option3` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id`(`id` ASC) USING BTREE,
  CONSTRAINT `item_equip_cash_option_copy1_ibfk_1` FOREIGN KEY (`id`) REFERENCES `item_equip` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for item_equip_copy1
-- ----------------------------
DROP TABLE IF EXISTS `item_equip_copy1`;
CREATE TABLE `item_equip_copy1`  (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sn` bigint(20) NOT NULL DEFAULT 0,
  `item_id` int(11) NOT NULL DEFAULT 0,
  `expire_date` datetime NOT NULL DEFAULT '2079-01-01 00:00:00',
  `title` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id`(`id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for item_equip_excel
-- ----------------------------
DROP TABLE IF EXISTS `item_equip_excel`;
CREATE TABLE `item_equip_excel`  (
  `id` bigint(20) NOT NULL,
  `euc` tinyint(4) NOT NULL DEFAULT 0,
  `reuc` tinyint(4) NOT NULL DEFAULT 0,
  `base_str` smallint(6) NOT NULL DEFAULT 0,
  `base_dex` smallint(6) NOT NULL DEFAULT 0,
  `base_int` smallint(6) NOT NULL DEFAULT 0,
  `base_luk` smallint(6) NOT NULL DEFAULT 0,
  `max_hp` smallint(6) NOT NULL DEFAULT 0,
  `max_mp` smallint(6) NOT NULL DEFAULT 0,
  `pad` smallint(6) NOT NULL DEFAULT 0,
  `mad` smallint(6) NOT NULL DEFAULT 0,
  `pdd` smallint(6) NOT NULL DEFAULT 0,
  `craft` smallint(6) NOT NULL DEFAULT 0,
  `speed` smallint(6) NOT NULL DEFAULT 0,
  `jump` smallint(6) NOT NULL DEFAULT 0,
  `pvp_damage` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for item_equip_excel_copy1
-- ----------------------------
DROP TABLE IF EXISTS `item_equip_excel_copy1`;
CREATE TABLE `item_equip_excel_copy1`  (
  `id` bigint(20) NOT NULL,
  `euc` tinyint(4) NOT NULL DEFAULT 0,
  `reuc` tinyint(4) NOT NULL DEFAULT 0,
  `base_str` smallint(6) NOT NULL DEFAULT 0,
  `base_dex` smallint(6) NOT NULL DEFAULT 0,
  `base_int` smallint(6) NOT NULL DEFAULT 0,
  `base_luk` smallint(6) NOT NULL DEFAULT 0,
  `max_hp` smallint(6) NOT NULL DEFAULT 0,
  `max_mp` smallint(6) NOT NULL DEFAULT 0,
  `pad` smallint(6) NOT NULL DEFAULT 0,
  `mad` smallint(6) NOT NULL DEFAULT 0,
  `pdd` smallint(6) NOT NULL DEFAULT 0,
  `craft` smallint(6) NOT NULL DEFAULT 0,
  `speed` smallint(6) NOT NULL DEFAULT 0,
  `jump` smallint(6) NOT NULL DEFAULT 0,
  `pvp_damage` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for item_equip_jewel
-- ----------------------------
DROP TABLE IF EXISTS `item_equip_jewel`;
CREATE TABLE `item_equip_jewel`  (
  `id` bigint(20) NOT NULL,
  `level` int(11) NOT NULL DEFAULT 1,
  `stat` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `stat_ex` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `option` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for item_equip_jewel_copy1
-- ----------------------------
DROP TABLE IF EXISTS `item_equip_jewel_copy1`;
CREATE TABLE `item_equip_jewel_copy1`  (
  `id` bigint(20) NOT NULL,
  `level` int(11) NOT NULL DEFAULT 1,
  `stat` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `stat_ex` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `option` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for item_equip_option
-- ----------------------------
DROP TABLE IF EXISTS `item_equip_option`;
CREATE TABLE `item_equip_option`  (
  `id` bigint(20) UNSIGNED NOT NULL,
  `grade` tinyint(4) NOT NULL DEFAULT 0,
  `chuc` tinyint(4) NOT NULL DEFAULT 0,
  `option1` int(6) NOT NULL DEFAULT 0,
  `option1_lv` tinyint(4) NOT NULL DEFAULT 0,
  `option2` int(6) NOT NULL DEFAULT 0,
  `option2_lv` tinyint(4) NOT NULL DEFAULT 0,
  `option3` int(6) NOT NULL DEFAULT 0,
  `option3_lv` tinyint(4) NOT NULL DEFAULT 0,
  `option4` int(6) NOT NULL DEFAULT 0,
  `option4_lv` tinyint(4) NOT NULL DEFAULT 0,
  `option5` int(6) NOT NULL DEFAULT 0,
  `option5_lv` tinyint(4) NOT NULL DEFAULT 0,
  `option6` int(6) NOT NULL DEFAULT 0,
  `option6_lv` tinyint(4) NOT NULL DEFAULT 0,
  `skin` int(11) NOT NULL DEFAULT 0,
  `socket_grade` smallint(6) NOT NULL DEFAULT 0,
  `socket1` smallint(6) NOT NULL DEFAULT 0,
  `socket2` smallint(6) NOT NULL DEFAULT 0,
  `socket3` smallint(6) NOT NULL DEFAULT 0,
  `color` int(11) NOT NULL DEFAULT 0,
  `soul_option_id` smallint(6) NOT NULL DEFAULT 0,
  `soul_socket` smallint(6) NOT NULL DEFAULT 0,
  `soul_option` smallint(6) NOT NULL DEFAULT 0,
  `arc` smallint(6) NOT NULL DEFAULT 0,
  `arc_exp` int(11) NOT NULL DEFAULT 0,
  `arc_level` smallint(6) NOT NULL DEFAULT 0,
  `aut` smallint(6) NOT NULL DEFAULT 0,
  `aut_exp` int(11) NOT NULL DEFAULT 0,
  `aut_level` smallint(6) NOT NULL DEFAULT 0,
  `break_limit` bigint(20) NOT NULL DEFAULT 0,
  `break_limit_plus` bigint(20) NOT NULL DEFAULT 0,
  `skills` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '{}',
  `exchange_timeout` datetime NOT NULL DEFAULT '1900-01-01 00:00:00',
  `exchange` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id`(`id` ASC) USING BTREE,
  CONSTRAINT `item_equip_option_ibfk_1` FOREIGN KEY (`id`) REFERENCES `item_equip` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for item_equip_option_copy1
-- ----------------------------
DROP TABLE IF EXISTS `item_equip_option_copy1`;
CREATE TABLE `item_equip_option_copy1`  (
  `id` bigint(20) UNSIGNED NOT NULL,
  `grade` tinyint(4) NOT NULL DEFAULT 0,
  `chuc` tinyint(4) NOT NULL DEFAULT 0,
  `option1` int(11) NOT NULL DEFAULT 0,
  `option1_lv` tinyint(4) NOT NULL DEFAULT 0,
  `option2` int(11) NOT NULL DEFAULT 0,
  `option2_lv` tinyint(4) NOT NULL DEFAULT 0,
  `option3` int(11) NOT NULL DEFAULT 0,
  `option3_lv` tinyint(4) NOT NULL DEFAULT 0,
  `option4` int(11) NOT NULL DEFAULT 0,
  `option4_lv` tinyint(4) NOT NULL DEFAULT 0,
  `option5` int(11) NOT NULL DEFAULT 0,
  `option5_lv` tinyint(4) NOT NULL DEFAULT 0,
  `option6` int(11) NOT NULL DEFAULT 0,
  `option6_lv` tinyint(4) NOT NULL DEFAULT 0,
  `skin` int(11) NOT NULL DEFAULT 0,
  `socket_grade` smallint(6) NOT NULL DEFAULT 0,
  `socket1` smallint(6) NOT NULL DEFAULT 0,
  `socket2` smallint(6) NOT NULL DEFAULT 0,
  `socket3` smallint(6) NOT NULL DEFAULT 0,
  `color` int(11) NOT NULL DEFAULT 0,
  `soul_option_id` smallint(6) NOT NULL DEFAULT 0,
  `soul_socket` smallint(6) NOT NULL DEFAULT 0,
  `soul_option` smallint(6) NOT NULL DEFAULT 0,
  `arc` smallint(6) NOT NULL DEFAULT 0,
  `arc_exp` int(11) NOT NULL DEFAULT 0,
  `arc_level` smallint(6) NOT NULL DEFAULT 0,
  `aut` smallint(6) NOT NULL DEFAULT 0,
  `aut_exp` int(11) NOT NULL DEFAULT 0,
  `aut_level` smallint(6) NOT NULL DEFAULT 0,
  `break_limit` bigint(20) NOT NULL DEFAULT 0,
  `break_limit_plus` bigint(20) NOT NULL DEFAULT 0,
  `skills` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `exchange_timeout` datetime NOT NULL DEFAULT '1900-01-01 00:00:00',
  `exchange` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id`(`id` ASC) USING BTREE,
  CONSTRAINT `item_equip_option_copy1_ibfk_1` FOREIGN KEY (`id`) REFERENCES `item_equip` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for item_pet
-- ----------------------------
DROP TABLE IF EXISTS `item_pet`;
CREATE TABLE `item_pet`  (
  `id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `sn` bigint(20) NOT NULL DEFAULT 0,
  `item_id` int(11) NOT NULL DEFAULT 0,
  `expire_date` datetime NOT NULL DEFAULT '2079-01-01 00:00:00',
  `name` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `level` tinyint(4) NOT NULL DEFAULT 0,
  `tameness` int(11) NOT NULL DEFAULT 0,
  `repleteness` tinyint(4) NOT NULL DEFAULT 0,
  `dead_date` datetime NOT NULL DEFAULT '2079-01-01 00:00:00',
  `pet_attribute` smallint(6) NOT NULL DEFAULT 0,
  `pet_skill` smallint(6) NOT NULL DEFAULT 0,
  `remain_life` int(11) NOT NULL DEFAULT 0,
  `active_state` tinyint(4) NOT NULL DEFAULT 0,
  `attribute` smallint(6) NOT NULL DEFAULT 0,
  `pet_hue` int(11) NOT NULL DEFAULT -1,
  `auto_buff_skill1` int(11) NOT NULL DEFAULT 0,
  `auto_buff_skill2` int(11) NOT NULL DEFAULT 0,
  `giant_rate` smallint(6) NOT NULL DEFAULT 100,
  `training` int(11) NOT NULL DEFAULT 0,
  `skin` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id`(`id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for item_pet_copy1
-- ----------------------------
DROP TABLE IF EXISTS `item_pet_copy1`;
CREATE TABLE `item_pet_copy1`  (
  `id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `sn` bigint(20) NOT NULL DEFAULT 0,
  `item_id` int(11) NOT NULL DEFAULT 0,
  `expire_date` datetime NOT NULL DEFAULT '2079-01-01 00:00:00',
  `name` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `level` tinyint(4) NOT NULL DEFAULT 0,
  `tameness` int(11) NOT NULL DEFAULT 0,
  `repleteness` tinyint(4) NOT NULL DEFAULT 0,
  `dead_date` datetime NOT NULL DEFAULT '2079-01-01 00:00:00',
  `pet_attribute` smallint(6) NOT NULL DEFAULT 0,
  `pet_skill` smallint(6) NOT NULL DEFAULT 0,
  `remain_life` int(11) NOT NULL DEFAULT 0,
  `active_state` tinyint(4) NOT NULL DEFAULT 0,
  `attribute` smallint(6) NOT NULL DEFAULT 0,
  `pet_hue` int(11) NOT NULL DEFAULT -1,
  `auto_buff_skill1` int(11) NOT NULL DEFAULT 0,
  `auto_buff_skill2` int(11) NOT NULL DEFAULT 0,
  `giant_rate` smallint(6) NOT NULL DEFAULT 100,
  `training` int(11) NOT NULL DEFAULT 0,
  `skin` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id`(`id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for item_pet_exception
-- ----------------------------
DROP TABLE IF EXISTS `item_pet_exception`;
CREATE TABLE `item_pet_exception`  (
  `id` bigint(20) NULL DEFAULT NULL,
  `item_id` int(11) NULL DEFAULT NULL,
  INDEX `id`(`id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for item_pet_exception_copy1
-- ----------------------------
DROP TABLE IF EXISTS `item_pet_exception_copy1`;
CREATE TABLE `item_pet_exception_copy1`  (
  `id` bigint(20) NULL DEFAULT NULL,
  `item_id` int(11) NULL DEFAULT NULL,
  INDEX `id`(`id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for item_slot
-- ----------------------------
DROP TABLE IF EXISTS `item_slot`;
CREATE TABLE `item_slot`  (
  `id` bigint(20) NOT NULL,
  `owner_id` int(11) NULL DEFAULT NULL,
  `world_id` int(11) NULL DEFAULT NULL,
  `own_type` tinyint(4) NULL DEFAULT NULL,
  `item_type` tinyint(4) NULL DEFAULT NULL,
  `slot` smallint(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `owner_id`(`owner_id` ASC, `world_id` ASC, `own_type` ASC, `item_type` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for item_slot_copy1
-- ----------------------------
DROP TABLE IF EXISTS `item_slot_copy1`;
CREATE TABLE `item_slot_copy1`  (
  `id` bigint(20) NOT NULL,
  `owner_id` int(11) NULL DEFAULT NULL,
  `world_id` int(11) NULL DEFAULT NULL,
  `own_type` tinyint(4) NULL DEFAULT NULL,
  `item_type` tinyint(4) NULL DEFAULT NULL,
  `slot` smallint(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `owner_id`(`owner_id` ASC, `world_id` ASC, `own_type` ASC, `item_type` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for item_slot_copy1_copy1
-- ----------------------------
DROP TABLE IF EXISTS `item_slot_copy1_copy1`;
CREATE TABLE `item_slot_copy1_copy1`  (
  `id` bigint(20) NOT NULL,
  `owner_id` int(11) NULL DEFAULT NULL,
  `world_id` int(11) NULL DEFAULT NULL,
  `own_type` tinyint(4) NULL DEFAULT NULL,
  `item_type` tinyint(4) NULL DEFAULT NULL,
  `slot` smallint(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `owner_id`(`owner_id` ASC, `world_id` ASC, `own_type` ASC, `item_type` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for item_slot_copy2
-- ----------------------------
DROP TABLE IF EXISTS `item_slot_copy2`;
CREATE TABLE `item_slot_copy2`  (
  `id` bigint(20) NOT NULL,
  `owner_id` int(11) NULL DEFAULT NULL,
  `world_id` int(11) NULL DEFAULT NULL,
  `own_type` tinyint(4) NULL DEFAULT NULL,
  `item_type` tinyint(4) NULL DEFAULT NULL,
  `slot` smallint(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `owner_id`(`owner_id` ASC, `world_id` ASC, `own_type` ASC, `item_type` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for item_warehouse
-- ----------------------------
DROP TABLE IF EXISTS `item_warehouse`;
CREATE TABLE `item_warehouse`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `character_id` int(15) NOT NULL,
  `quantity` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `update_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `is_deleted` tinyint(3) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `item_warehouse_character_id_idx`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for item_warehouse_copy1
-- ----------------------------
DROP TABLE IF EXISTS `item_warehouse_copy1`;
CREATE TABLE `item_warehouse_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `character_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `update_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `is_deleted` tinyint(4) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `item_warehouse_character_id_idx`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 69 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for jili_task_character
-- ----------------------------
DROP TABLE IF EXISTS `jili_task_character`;
CREATE TABLE `jili_task_character`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `characterId` int(11) NULL DEFAULT NULL COMMENT '??????ID',
  `characterName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '?????????',
  `taskCount` int(50) UNSIGNED ZEROFILL NULL DEFAULT NULL COMMENT '??????ии????бу?????бу???',
  `rewardYn` int(2) UNSIGNED ZEROFILL NULL DEFAULT NULL COMMENT '??????иж????????ии??????буб└?????б└0 = ??????иж????? 1 = ?бд?иж?????',
  `taskId` int(10) UNSIGNED ZEROFILL NULL DEFAULT NULL COMMENT '??????ID',
  `taskName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL COMMENT 'task_name',
  `taskPoint` int(11) NULL DEFAULT NULL,
  `taskContent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `taskMax` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci COMMENT = '??????????буб└??????' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for jili_task_character_copy1
-- ----------------------------
DROP TABLE IF EXISTS `jili_task_character_copy1`;
CREATE TABLE `jili_task_character_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `characterId` int(11) NULL DEFAULT NULL COMMENT '??????ID',
  `characterName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '?????????',
  `taskCount` int(50) UNSIGNED ZEROFILL NULL DEFAULT NULL COMMENT '??????ии????бу?????бу???',
  `rewardYn` int(2) UNSIGNED ZEROFILL NULL DEFAULT NULL COMMENT '??????иж????????ии??????буб└?????б└0 = ??????иж????? 1 = ?бд?иж?????',
  `taskId` int(10) UNSIGNED ZEROFILL NULL DEFAULT NULL COMMENT '??????ID',
  `taskName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL COMMENT 'task_name',
  `taskPoint` int(11) NULL DEFAULT NULL,
  `taskContent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `taskMax` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci COMMENT = '??????????буб└??????' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for jili_teacher
-- ----------------------------
DROP TABLE IF EXISTS `jili_teacher`;
CREATE TABLE `jili_teacher`  (
  `id` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `teacherName` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `studentName` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `graduated` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT '0',
  `studentId` int(11) NULL DEFAULT NULL,
  `teacherAccId` int(11) NULL DEFAULT NULL,
  `studentAccId` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 44 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for jili_teacher_copy1
-- ----------------------------
DROP TABLE IF EXISTS `jili_teacher_copy1`;
CREATE TABLE `jili_teacher_copy1`  (
  `id` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `teacherName` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `studentName` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `graduated` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT '0',
  `studentId` int(11) NULL DEFAULT NULL,
  `teacherAccId` int(11) NULL DEFAULT NULL,
  `studentAccId` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 44 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for js_dj
-- ----------------------------
DROP TABLE IF EXISTS `js_dj`;
CREATE TABLE `js_dj`  (
  `iid` int(11) NOT NULL AUTO_INCREMENT,
  `characters_id` int(11) NOT NULL,
  `type` bigint(11) NOT NULL,
  `sn` bigint(20) NOT NULL DEFAULT -1,
  `itemid` int(11) NULL DEFAULT NULL,
  `number` int(11) NOT NULL,
  `paytime` datetime NOT NULL,
  `meso` bigint(20) NULL DEFAULT 0,
  `buy_id` int(11) NULL DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `world` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`iid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for js_dj_copy1
-- ----------------------------
DROP TABLE IF EXISTS `js_dj_copy1`;
CREATE TABLE `js_dj_copy1`  (
  `iid` int(11) NOT NULL AUTO_INCREMENT,
  `characters_id` int(11) NOT NULL,
  `type` bigint(11) NOT NULL,
  `sn` bigint(20) NOT NULL DEFAULT -1,
  `itemid` int(11) NULL DEFAULT NULL,
  `number` int(11) NOT NULL,
  `paytime` datetime NOT NULL,
  `meso` bigint(20) NULL DEFAULT 0,
  `buy_id` int(11) NULL DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `world` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`iid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for js_dj_history
-- ----------------------------
DROP TABLE IF EXISTS `js_dj_history`;
CREATE TABLE `js_dj_history`  (
  `iid` int(11) NOT NULL,
  `characters_id` int(11) NOT NULL,
  `type` bigint(11) NOT NULL DEFAULT -1,
  `sn` bigint(20) NOT NULL DEFAULT -1,
  `itemid` int(11) NULL DEFAULT NULL,
  `number` int(11) NOT NULL,
  `paytime` datetime NOT NULL,
  `remark` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `meso` bigint(20) NULL DEFAULT 0,
  `status` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `buy_id` int(11) NOT NULL,
  `world` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`iid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for js_dj_history_copy1
-- ----------------------------
DROP TABLE IF EXISTS `js_dj_history_copy1`;
CREATE TABLE `js_dj_history_copy1`  (
  `iid` int(11) NOT NULL,
  `characters_id` int(11) NOT NULL,
  `type` bigint(11) NOT NULL DEFAULT -1,
  `sn` bigint(20) NOT NULL DEFAULT -1,
  `itemid` int(11) NULL DEFAULT NULL,
  `number` int(11) NOT NULL,
  `paytime` datetime NOT NULL,
  `remark` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `meso` bigint(20) NULL DEFAULT 0,
  `status` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `buy_id` int(11) NOT NULL,
  `world` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`iid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for js_fk
-- ----------------------------
DROP TABLE IF EXISTS `js_fk`;
CREATE TABLE `js_fk`  (
  `iid` int(11) NOT NULL AUTO_INCREMENT,
  `characters_id` int(11) NOT NULL,
  `type` bigint(11) NOT NULL,
  `sn` bigint(20) NOT NULL DEFAULT -1,
  `itemid` int(11) NULL DEFAULT NULL,
  `number` int(11) NOT NULL,
  `paytime` datetime NOT NULL,
  `meso` bigint(20) NULL DEFAULT 0,
  `buy_id` int(11) NULL DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `world` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`iid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for js_fk_copy1
-- ----------------------------
DROP TABLE IF EXISTS `js_fk_copy1`;
CREATE TABLE `js_fk_copy1`  (
  `iid` int(11) NOT NULL AUTO_INCREMENT,
  `characters_id` int(11) NOT NULL,
  `type` bigint(11) NOT NULL,
  `sn` bigint(20) NOT NULL DEFAULT -1,
  `itemid` int(11) NULL DEFAULT NULL,
  `number` int(11) NOT NULL,
  `paytime` datetime NOT NULL,
  `meso` bigint(20) NULL DEFAULT 0,
  `buy_id` int(11) NULL DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `world` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`iid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for js_fk_history
-- ----------------------------
DROP TABLE IF EXISTS `js_fk_history`;
CREATE TABLE `js_fk_history`  (
  `iid` int(11) NOT NULL,
  `characters_id` int(11) NOT NULL,
  `type` bigint(11) NOT NULL DEFAULT -1,
  `sn` bigint(20) NOT NULL DEFAULT -1,
  `itemid` int(11) NULL DEFAULT NULL,
  `number` int(11) NOT NULL,
  `paytime` datetime NOT NULL,
  `remark` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `meso` bigint(20) NULL DEFAULT 0,
  `status` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `buy_id` int(11) NOT NULL,
  `world` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`iid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for js_fk_history_copy1
-- ----------------------------
DROP TABLE IF EXISTS `js_fk_history_copy1`;
CREATE TABLE `js_fk_history_copy1`  (
  `iid` int(11) NOT NULL,
  `characters_id` int(11) NOT NULL,
  `type` bigint(11) NOT NULL DEFAULT -1,
  `sn` bigint(20) NOT NULL DEFAULT -1,
  `itemid` int(11) NULL DEFAULT NULL,
  `number` int(11) NOT NULL,
  `paytime` datetime NOT NULL,
  `remark` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `meso` bigint(20) NULL DEFAULT 0,
  `status` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `buy_id` int(11) NOT NULL,
  `world` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`iid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for k_forest
-- ----------------------------
DROP TABLE IF EXISTS `k_forest`;
CREATE TABLE `k_forest`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NULL DEFAULT NULL,
  `difficulty` int(11) NULL DEFAULT NULL,
  `time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for k_forest_copy1
-- ----------------------------
DROP TABLE IF EXISTS `k_forest_copy1`;
CREATE TABLE `k_forest_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NULL DEFAULT NULL,
  `difficulty` int(11) NULL DEFAULT NULL,
  `time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for k_forest_log
-- ----------------------------
DROP TABLE IF EXISTS `k_forest_log`;
CREATE TABLE `k_forest_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NULL DEFAULT NULL,
  `difficulty` int(11) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `time` int(11) NULL DEFAULT NULL,
  `datetime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for k_forest_log_copy1
-- ----------------------------
DROP TABLE IF EXISTS `k_forest_log_copy1`;
CREATE TABLE `k_forest_log_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NULL DEFAULT NULL,
  `difficulty` int(11) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `time` int(11) NULL DEFAULT NULL,
  `datetime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for k_forest_reward
-- ----------------------------
DROP TABLE IF EXISTS `k_forest_reward`;
CREATE TABLE `k_forest_reward`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NULL DEFAULT NULL,
  `difficulty` int(11) NULL DEFAULT NULL,
  `datetime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for k_forest_reward_copy1
-- ----------------------------
DROP TABLE IF EXISTS `k_forest_reward_copy1`;
CREATE TABLE `k_forest_reward_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NULL DEFAULT NULL,
  `difficulty` int(11) NULL DEFAULT NULL,
  `datetime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for k_hypaylog
-- ----------------------------
DROP TABLE IF EXISTS `k_hypaylog`;
CREATE TABLE `k_hypaylog`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL,
  `number` int(11) NOT NULL,
  `date` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for k_hypaylog_copy1
-- ----------------------------
DROP TABLE IF EXISTS `k_hypaylog_copy1`;
CREATE TABLE `k_hypaylog_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL,
  `number` int(11) NOT NULL,
  `date` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for k_luck
-- ----------------------------
DROP TABLE IF EXISTS `k_luck`;
CREATE TABLE `k_luck`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `character_id` int(11) NULL DEFAULT NULL,
  `log_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `number` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for k_luck_copy1
-- ----------------------------
DROP TABLE IF EXISTS `k_luck_copy1`;
CREATE TABLE `k_luck_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `character_id` int(11) NULL DEFAULT NULL,
  `log_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `number` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for k_luckycard
-- ----------------------------
DROP TABLE IF EXISTS `k_luckycard`;
CREATE TABLE `k_luckycard`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chaID` int(11) NULL DEFAULT NULL,
  `level` int(11) NULL DEFAULT NULL,
  `number` int(11) NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for k_luckycard_copy1
-- ----------------------------
DROP TABLE IF EXISTS `k_luckycard_copy1`;
CREATE TABLE `k_luckycard_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chaID` int(11) NULL DEFAULT NULL,
  `level` int(11) NULL DEFAULT NULL,
  `number` int(11) NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for k_luckygift
-- ----------------------------
DROP TABLE IF EXISTS `k_luckygift`;
CREATE TABLE `k_luckygift`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fromID` int(11) NULL DEFAULT NULL,
  `fromNAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `toID` int(11) NULL DEFAULT NULL,
  `toNAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `number` int(11) NULL DEFAULT NULL,
  `YN` int(11) NULL DEFAULT NULL,
  `time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for k_luckygift_copy1
-- ----------------------------
DROP TABLE IF EXISTS `k_luckygift_copy1`;
CREATE TABLE `k_luckygift_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fromID` int(11) NULL DEFAULT NULL,
  `fromNAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `toID` int(11) NULL DEFAULT NULL,
  `toNAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `number` int(11) NULL DEFAULT NULL,
  `YN` int(11) NULL DEFAULT NULL,
  `time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for k_luckylog
-- ----------------------------
DROP TABLE IF EXISTS `k_luckylog`;
CREATE TABLE `k_luckylog`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chaID` int(11) NULL DEFAULT NULL,
  `Jifen` int(11) NULL DEFAULT NULL,
  `Lucky` int(11) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for k_luckylog_copy1
-- ----------------------------
DROP TABLE IF EXISTS `k_luckylog_copy1`;
CREATE TABLE `k_luckylog_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chaID` int(11) NULL DEFAULT NULL,
  `Jifen` int(11) NULL DEFAULT NULL,
  `Lucky` int(11) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for k_tuiwen
-- ----------------------------
DROP TABLE IF EXISTS `k_tuiwen`;
CREATE TABLE `k_tuiwen`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NULL DEFAULT NULL,
  `item` int(11) NULL DEFAULT NULL,
  `number` int(11) NULL DEFAULT NULL,
  `date` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for k_tuiwen_copy1
-- ----------------------------
DROP TABLE IF EXISTS `k_tuiwen_copy1`;
CREATE TABLE `k_tuiwen_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NULL DEFAULT NULL,
  `item` int(11) NULL DEFAULT NULL,
  `number` int(11) NULL DEFAULT NULL,
  `date` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for k_tuiwen1
-- ----------------------------
DROP TABLE IF EXISTS `k_tuiwen1`;
CREATE TABLE `k_tuiwen1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NULL DEFAULT NULL,
  `item` int(11) NULL DEFAULT NULL,
  `number` int(11) NULL DEFAULT NULL,
  `date` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for k_tuiwen1_copy1
-- ----------------------------
DROP TABLE IF EXISTS `k_tuiwen1_copy1`;
CREATE TABLE `k_tuiwen1_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NULL DEFAULT NULL,
  `item` int(11) NULL DEFAULT NULL,
  `number` int(11) NULL DEFAULT NULL,
  `date` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for k_wxlh
-- ----------------------------
DROP TABLE IF EXISTS `k_wxlh`;
CREATE TABLE `k_wxlh`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL,
  `level` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `passDate` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for k_wxlh_copy1
-- ----------------------------
DROP TABLE IF EXISTS `k_wxlh_copy1`;
CREATE TABLE `k_wxlh_copy1`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL,
  `level` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `passDate` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for kk_monthpoint
-- ----------------------------
DROP TABLE IF EXISTS `kk_monthpoint`;
CREATE TABLE `kk_monthpoint`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accid` int(11) NOT NULL,
  `point` int(11) NOT NULL,
  `world` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for kk_monthpoint_copy1
-- ----------------------------
DROP TABLE IF EXISTS `kk_monthpoint_copy1`;
CREATE TABLE `kk_monthpoint_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accid` int(11) NOT NULL,
  `point` int(11) NOT NULL,
  `world` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for kk_password
-- ----------------------------
DROP TABLE IF EXISTS `kk_password`;
CREATE TABLE `kk_password`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `TZid` int(11) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `talk` int(11) NULL DEFAULT NULL,
  `datetime` datetime NULL DEFAULT NULL,
  `YN` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for kk_password_copy1
-- ----------------------------
DROP TABLE IF EXISTS `kk_password_copy1`;
CREATE TABLE `kk_password_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `TZid` int(11) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `talk` int(11) NULL DEFAULT NULL,
  `datetime` datetime NULL DEFAULT NULL,
  `YN` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for kk_pintu
-- ----------------------------
DROP TABLE IF EXISTS `kk_pintu`;
CREATE TABLE `kk_pintu`  (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `account` int(100) NULL DEFAULT NULL,
  `item` int(100) NULL DEFAULT NULL,
  `number` int(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for kk_pintu_copy1
-- ----------------------------
DROP TABLE IF EXISTS `kk_pintu_copy1`;
CREATE TABLE `kk_pintu_copy1`  (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `account` int(100) NULL DEFAULT NULL,
  `item` int(100) NULL DEFAULT NULL,
  `number` int(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for kk_talk
-- ----------------------------
DROP TABLE IF EXISTS `kk_talk`;
CREATE TABLE `kk_talk`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `TZid` int(11) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `talk` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `datetime` datetime NULL DEFAULT NULL,
  `YN` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for kk_talk_copy1
-- ----------------------------
DROP TABLE IF EXISTS `kk_talk_copy1`;
CREATE TABLE `kk_talk_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `TZid` int(11) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `talk` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `datetime` datetime NULL DEFAULT NULL,
  `YN` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for kkvip
-- ----------------------------
DROP TABLE IF EXISTS `kkvip`;
CREATE TABLE `kkvip`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `accid` int(255) NULL DEFAULT NULL,
  `accountid` int(255) NULL DEFAULT NULL,
  `VIP` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for kkvip_copy1
-- ----------------------------
DROP TABLE IF EXISTS `kkvip_copy1`;
CREATE TABLE `kkvip_copy1`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `accid` int(255) NULL DEFAULT NULL,
  `accountid` int(255) NULL DEFAULT NULL,
  `VIP` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for lxkz_sjyz
-- ----------------------------
DROP TABLE IF EXISTS `lxkz_sjyz`;
CREATE TABLE `lxkz_sjyz`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accname` varchar(200) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL,
  `shouji` bigint(20) NOT NULL DEFAULT 0,
  `yzm` int(11) NOT NULL DEFAULT 0,
  `istype` int(11) NOT NULL DEFAULT 0,
  `time` bigint(20) NULL DEFAULT 0 COMMENT 'java:使用new Date().getTime() PHP：使用time()*1000',
  `ip` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `class` int(11) NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for maple_union_artifact
-- ----------------------------
DROP TABLE IF EXISTS `maple_union_artifact`;
CREATE TABLE `maple_union_artifact`  (
  `account_id` int(11) NOT NULL,
  `world_id` int(11) NOT NULL,
  `slot` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `first_stat` int(11) NOT NULL,
  `middle_stat` int(11) NOT NULL,
  `last_stat` int(11) NOT NULL,
  `expire_date` datetime NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for maple_union_artifact_copy1
-- ----------------------------
DROP TABLE IF EXISTS `maple_union_artifact_copy1`;
CREATE TABLE `maple_union_artifact_copy1`  (
  `account_id` int(11) NOT NULL,
  `world_id` int(11) NOT NULL,
  `slot` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `first_stat` int(11) NOT NULL,
  `middle_stat` int(11) NOT NULL,
  `last_stat` int(11) NOT NULL,
  `expire_date` datetime NOT NULL,
  PRIMARY KEY (`account_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for maple_union_artifact_copy1_copy1
-- ----------------------------
DROP TABLE IF EXISTS `maple_union_artifact_copy1_copy1`;
CREATE TABLE `maple_union_artifact_copy1_copy1`  (
  `account_id` int(11) NOT NULL,
  `world_id` int(11) NOT NULL,
  `slot` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `first_stat` int(11) NOT NULL,
  `middle_stat` int(11) NOT NULL,
  `last_stat` int(11) NOT NULL,
  `expire_date` datetime NOT NULL,
  PRIMARY KEY (`account_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for maple_union_artifact_copy2
-- ----------------------------
DROP TABLE IF EXISTS `maple_union_artifact_copy2`;
CREATE TABLE `maple_union_artifact_copy2`  (
  `account_id` int(11) NOT NULL,
  `world_id` int(11) NOT NULL,
  `slot` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `first_stat` int(11) NOT NULL,
  `middle_stat` int(11) NOT NULL,
  `last_stat` int(11) NOT NULL,
  `expire_date` datetime NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for maple_union_record
-- ----------------------------
DROP TABLE IF EXISTS `maple_union_record`;
CREATE TABLE `maple_union_record`  (
  `account_id` int(11) NOT NULL,
  `world_id` int(11) NOT NULL,
  `page` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `character_id` int(11) NOT NULL,
  `rotate` int(11) NOT NULL,
  `board_idx` int(11) NOT NULL,
  `local` int(11) NOT NULL,
  INDEX `account_id`(`account_id` ASC, `world_id` ASC, `page` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for maple_union_record_copy1
-- ----------------------------
DROP TABLE IF EXISTS `maple_union_record_copy1`;
CREATE TABLE `maple_union_record_copy1`  (
  `account_id` int(11) NOT NULL,
  `world_id` int(11) NOT NULL,
  `page` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `character_id` int(11) NOT NULL,
  `rotate` int(11) NOT NULL,
  `board_idx` int(11) NOT NULL,
  `local` int(11) NOT NULL,
  INDEX `account_id`(`account_id` ASC, `world_id` ASC, `page` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for marin_action
-- ----------------------------
DROP TABLE IF EXISTS `marin_action`;
CREATE TABLE `marin_action`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `aid` int(11) NULL DEFAULT NULL,
  `cid` int(11) NULL DEFAULT NULL,
  `cname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `stat` int(11) NULL DEFAULT NULL,
  `equip` int(11) NULL DEFAULT NULL,
  `money` int(11) NULL DEFAULT NULL,
  `type` int(11) NULL DEFAULT NULL,
  `itemid` int(11) NULL DEFAULT NULL,
  `num` int(11) NULL DEFAULT NULL,
  `onlyid` bigint(20) NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `ruc` tinyint(4) NOT NULL DEFAULT 0,
  `cuc` tinyint(4) NOT NULL DEFAULT 0,
  `baseStr` smallint(6) NOT NULL DEFAULT 0,
  `baseDex` smallint(6) NOT NULL DEFAULT 0,
  `baseInt` smallint(6) NOT NULL DEFAULT 0,
  `baseLuk` smallint(6) NOT NULL DEFAULT 0,
  `maxHp` smallint(6) NOT NULL DEFAULT 0,
  `maxMp` smallint(6) NOT NULL DEFAULT 0,
  `pad` smallint(6) NOT NULL DEFAULT 0,
  `mad` smallint(6) NOT NULL DEFAULT 0,
  `pdd` smallint(6) NOT NULL DEFAULT 0,
  `craft` smallint(6) NOT NULL DEFAULT 0,
  `speed` smallint(6) NOT NULL DEFAULT 0,
  `jump` smallint(6) NOT NULL DEFAULT 0,
  `attribute` int(11) NOT NULL DEFAULT 0,
  `levelUpType` tinyint(4) NOT NULL DEFAULT 0,
  `incSkill` int(11) NOT NULL DEFAULT 0,
  `level` tinyint(4) NOT NULL DEFAULT 0,
  `exp` bigint(20) NOT NULL DEFAULT 0,
  `durability` int(11) NOT NULL DEFAULT 0,
  `iuc` int(11) NOT NULL DEFAULT 0,
  `puc` int(11) NOT NULL DEFAULT 0,
  `pvpDamage` smallint(6) NOT NULL DEFAULT 0,
  `reduceReq` tinyint(4) NOT NULL DEFAULT 0,
  `specialAttribute` smallint(6) NOT NULL DEFAULT 0,
  `durabilityMax` int(11) NOT NULL DEFAULT 0,
  `incReq` tinyint(4) NOT NULL DEFAULT 0,
  `growthEnchant` tinyint(4) NOT NULL DEFAULT 0,
  `enchant` tinyint(4) NOT NULL DEFAULT 0,
  `bossDamageR` smallint(6) NOT NULL DEFAULT 0,
  `ignorePdr` smallint(6) NOT NULL DEFAULT 0,
  `damageR` smallint(6) NOT NULL DEFAULT 0,
  `statRate` smallint(6) NOT NULL DEFAULT 0,
  `cuttable` tinyint(4) NOT NULL DEFAULT -1,
  `exGradeOption` bigint(20) NOT NULL DEFAULT 0,
  `itemState` int(11) NOT NULL DEFAULT 0,
  `euc` tinyint(4) NOT NULL DEFAULT 0,
  `reuc` tinyint(4) NOT NULL DEFAULT 0,
  `excelStr` smallint(6) NOT NULL DEFAULT 0,
  `excelDex` smallint(6) NOT NULL DEFAULT 0,
  `excelInt` smallint(6) NOT NULL DEFAULT 0,
  `excelLuk` smallint(6) NOT NULL DEFAULT 0,
  `excelMaxHp` smallint(6) NOT NULL DEFAULT 0,
  `excelMaxMp` smallint(6) NOT NULL DEFAULT 0,
  `excelPad` smallint(6) NOT NULL DEFAULT 0,
  `excelMad` smallint(6) NOT NULL DEFAULT 0,
  `excelPdd` smallint(6) NOT NULL DEFAULT 0,
  `excelCraft` smallint(6) NOT NULL DEFAULT 0,
  `excelSpeed` smallint(6) NOT NULL DEFAULT 0,
  `excelJump` smallint(6) NOT NULL DEFAULT 0,
  `grade` smallint(6) NOT NULL DEFAULT 0,
  `chuc` smallint(6) NOT NULL DEFAULT 0,
  `option1` smallint(6) NOT NULL DEFAULT 0,
  `option1Lv` smallint(6) NOT NULL DEFAULT 0,
  `option2` smallint(6) NOT NULL DEFAULT 0,
  `option2Lv` smallint(6) NOT NULL DEFAULT 0,
  `option3` smallint(6) NOT NULL DEFAULT 0,
  `option3Lv` smallint(6) NOT NULL DEFAULT 0,
  `option4` smallint(6) NOT NULL DEFAULT 0,
  `option4Lv` smallint(6) NOT NULL DEFAULT 0,
  `option5` smallint(6) NOT NULL DEFAULT 0,
  `option5Lv` smallint(6) NOT NULL DEFAULT 0,
  `option6` smallint(6) NOT NULL DEFAULT 0,
  `option6Lv` smallint(6) NOT NULL DEFAULT 0,
  `skin` smallint(6) NOT NULL DEFAULT 0,
  `socketGrade` smallint(6) NOT NULL DEFAULT 0,
  `socket1` smallint(6) NOT NULL DEFAULT 0,
  `socket2` smallint(6) NOT NULL DEFAULT 0,
  `socket3` smallint(6) NOT NULL DEFAULT 0,
  `color` int(11) NOT NULL DEFAULT 0,
  `soulOptionId` smallint(6) NOT NULL DEFAULT 0,
  `soulSocket` smallint(6) NOT NULL DEFAULT 0,
  `soulOption` smallint(6) NOT NULL DEFAULT 0,
  `arc` smallint(6) NOT NULL DEFAULT 0,
  `arcExp` int(11) NOT NULL DEFAULT 0,
  `arcLevel` smallint(6) NOT NULL DEFAULT 0,
  `aut` smallint(6) NOT NULL DEFAULT 0,
  `autExp` int(11) NOT NULL DEFAULT 0,
  `autLevel` smallint(6) NOT NULL DEFAULT 0,
  `startdate` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for marin_customdata
-- ----------------------------
DROP TABLE IF EXISTS `marin_customdata`;
CREATE TABLE `marin_customdata`  (
  `id` bigint(20) NOT NULL,
  `itemid` int(11) NOT NULL,
  `customData` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for marin_dojang_rank
-- ----------------------------
DROP TABLE IF EXISTS `marin_dojang_rank`;
CREATE TABLE `marin_dojang_rank`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aid` int(11) NOT NULL COMMENT '账号ID',
  `cid` int(11) NOT NULL COMMENT '角色ID',
  `cname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL COMMENT '角色名',
  `layer` int(11) NOT NULL COMMENT '完成楼层',
  `second` int(11) NOT NULL COMMENT '花费时间（秒）',
  `date` date NOT NULL COMMENT '记录日期',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_aid_cid_date`(`aid` ASC, `cid` ASC, `date` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci COMMENT = '武陵道场个人月榜' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for marin_dojang_rank_copy1
-- ----------------------------
DROP TABLE IF EXISTS `marin_dojang_rank_copy1`;
CREATE TABLE `marin_dojang_rank_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aid` int(11) NOT NULL COMMENT '账号ID',
  `cid` int(11) NOT NULL COMMENT '角色ID',
  `cname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL COMMENT '角色名',
  `layer` int(11) NOT NULL COMMENT '完成楼层',
  `second` int(11) NOT NULL COMMENT '花费时间（秒）',
  `date` date NOT NULL COMMENT '记录日期',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_aid_cid_date`(`aid` ASC, `cid` ASC, `date` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci COMMENT = '武陵道场个人月榜' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for marin_event
-- ----------------------------
DROP TABLE IF EXISTS `marin_event`;
CREATE TABLE `marin_event`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `onlyid` int(11) NULL DEFAULT NULL,
  `party` int(11) NULL DEFAULT NULL,
  `event` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `eventname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `damage` tinytext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `date` int(11) NULL DEFAULT NULL,
  `enddate` datetime NULL DEFAULT current_timestamp() ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for marin_fortune
-- ----------------------------
DROP TABLE IF EXISTS `marin_fortune`;
CREATE TABLE `marin_fortune`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stat` int(11) NOT NULL DEFAULT -1,
  `will_num` int(11) NULL DEFAULT NULL,
  `will_cid` int(11) NULL DEFAULT NULL,
  `will_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `group_cid` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `group_cname` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `datetime` timestamp NULL DEFAULT current_timestamp() ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for marin_information
-- ----------------------------
DROP TABLE IF EXISTS `marin_information`;
CREATE TABLE `marin_information`  (
  `id` int(11) NOT NULL,
  `name` tinytext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `desc` tinytext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `type` tinytext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `intro` tinytext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `form` tinytext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `version` tinytext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for marin_key
-- ----------------------------
DROP TABLE IF EXISTS `marin_key`;
CREATE TABLE `marin_key`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aid` int(11) NULL DEFAULT NULL,
  `key` int(11) NULL DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for marin_money_log
-- ----------------------------
DROP TABLE IF EXISTS `marin_money_log`;
CREATE TABLE `marin_money_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aid` int(11) NULL DEFAULT NULL,
  `aname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `cid` int(11) NULL DEFAULT NULL,
  `cname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `stat` int(11) NULL DEFAULT 0,
  `money` int(11) NULL DEFAULT NULL,
  `script` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `log` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `date` datetime NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for marin_profiling
-- ----------------------------
DROP TABLE IF EXISTS `marin_profiling`;
CREATE TABLE `marin_profiling`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hair` int(11) NULL DEFAULT NULL,
  `hairname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `face` int(11) NULL DEFAULT NULL,
  `facename` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for marin_quest
-- ----------------------------
DROP TABLE IF EXISTS `marin_quest`;
CREATE TABLE `marin_quest`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quest` int(11) NULL DEFAULT NULL,
  `key` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `count` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for marin_server
-- ----------------------------
DROP TABLE IF EXISTS `marin_server`;
CREATE TABLE `marin_server`  (
  `onlyid` int(11) NOT NULL,
  `ordering` longtext CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`onlyid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for marin_server_forum
-- ----------------------------
DROP TABLE IF EXISTS `marin_server_forum`;
CREATE TABLE `marin_server_forum`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` int(11) NULL DEFAULT NULL,
  `stat` int(11) NULL DEFAULT NULL,
  `num` int(11) NULL DEFAULT NULL,
  `receive` int(11) NULL DEFAULT 0,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for marin_warehouse
-- ----------------------------
DROP TABLE IF EXISTS `marin_warehouse`;
CREATE TABLE `marin_warehouse`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aid` int(11) NULL DEFAULT NULL,
  `aname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `cid` int(11) NULL DEFAULT NULL,
  `cname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `type` int(11) NULL DEFAULT NULL,
  `itemid` int(11) NULL DEFAULT NULL,
  `itemnum` int(11) NULL DEFAULT NULL,
  `itemname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `stat` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for marin_warehouse_copy1
-- ----------------------------
DROP TABLE IF EXISTS `marin_warehouse_copy1`;
CREATE TABLE `marin_warehouse_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `aid` int(11) NULL DEFAULT NULL COMMENT '账号ID',
  `aname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL COMMENT '账号名',
  `cid` int(11) NULL DEFAULT NULL COMMENT '角色ID',
  `cname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL COMMENT '角色名',
  `type` int(11) NOT NULL COMMENT '仓库类型',
  `itemid` int(11) NOT NULL COMMENT '物品ID',
  `itemname` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL COMMENT '物品名',
  `itemnum` int(11) NOT NULL DEFAULT 0 COMMENT '物品数量',
  `stat` tinyint(4) NOT NULL DEFAULT 0 COMMENT '0=角色仓库, 1=账号仓库',
  `from` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL COMMENT '来源/分类',
  `notice` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `weight` int(11) NULL DEFAULT NULL COMMENT '权重/排序',
  `timestamp` bigint(20) NULL DEFAULT NULL COMMENT '时间戳',
  `extra` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL COMMENT '扩展字段',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci COMMENT = '自定义仓库表，兼容多脚本' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for master_disciple
-- ----------------------------
DROP TABLE IF EXISTS `master_disciple`;
CREATE TABLE `master_disciple`  (
  `account_id` int(11) NOT NULL,
  `world_id` int(11) NULL DEFAULT NULL,
  `stat` int(11) NULL DEFAULT NULL,
  `main_player` int(11) NULL DEFAULT NULL,
  `name` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `level` int(11) NULL DEFAULT NULL,
  `job` int(11) NULL DEFAULT NULL,
  `master_id` int(11) NULL DEFAULT NULL,
  `disciple_id` int(11) NULL DEFAULT NULL,
  `combat_power` bigint(20) NULL DEFAULT NULL,
  `last_combat_power` bigint(20) NULL DEFAULT NULL,
  `auto_accept` int(11) NULL DEFAULT NULL,
  `maple_union_level` int(11) NULL DEFAULT NULL,
  `point` int(11) NULL DEFAULT NULL,
  `point_special` int(11) NULL DEFAULT NULL,
  `grade` int(11) NULL DEFAULT NULL,
  `rank` int(11) NULL DEFAULT NULL,
  `nae_gong` int(11) NULL DEFAULT NULL,
  `last_rank` int(11) NULL DEFAULT NULL,
  `training_point` int(11) NULL DEFAULT NULL,
  `last_update` datetime NULL DEFAULT current_timestamp() ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE INDEX `account_id`(`account_id` ASC, `world_id` ASC) USING BTREE,
  INDEX `world_id`(`world_id` ASC, `stat` ASC) USING BTREE,
  INDEX `name`(`name` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for master_disciple_applicant
-- ----------------------------
DROP TABLE IF EXISTS `master_disciple_applicant`;
CREATE TABLE `master_disciple_applicant`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL DEFAULT 0,
  `world_id` int(11) NOT NULL DEFAULT 0,
  `target_id` int(11) NOT NULL DEFAULT 0,
  `type` int(11) NOT NULL DEFAULT 0,
  `msg` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `account_id`(`account_id` ASC, `world_id` ASC) USING BTREE,
  INDEX `world_id`(`world_id` ASC, `target_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for master_disciple_applicant_copy1
-- ----------------------------
DROP TABLE IF EXISTS `master_disciple_applicant_copy1`;
CREATE TABLE `master_disciple_applicant_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL DEFAULT 0,
  `world_id` int(11) NOT NULL DEFAULT 0,
  `target_id` int(11) NOT NULL DEFAULT 0,
  `type` int(11) NOT NULL DEFAULT 0,
  `msg` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `account_id`(`account_id` ASC, `world_id` ASC) USING BTREE,
  INDEX `world_id`(`world_id` ASC, `target_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for master_disciple_copy1
-- ----------------------------
DROP TABLE IF EXISTS `master_disciple_copy1`;
CREATE TABLE `master_disciple_copy1`  (
  `account_id` int(11) NOT NULL,
  `world_id` int(11) NULL DEFAULT NULL,
  `stat` int(11) NULL DEFAULT NULL,
  `main_player` int(11) NULL DEFAULT NULL,
  `name` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `level` int(11) NULL DEFAULT NULL,
  `job` int(11) NULL DEFAULT NULL,
  `master_id` int(11) NULL DEFAULT NULL,
  `disciple_id` int(11) NULL DEFAULT NULL,
  `combat_power` bigint(20) NULL DEFAULT NULL,
  `last_combat_power` bigint(20) NULL DEFAULT NULL,
  `auto_accept` int(11) NULL DEFAULT NULL,
  `maple_union_level` int(11) NULL DEFAULT NULL,
  `point` int(11) NULL DEFAULT NULL,
  `point_special` int(11) NULL DEFAULT NULL,
  `grade` int(11) NULL DEFAULT NULL,
  `rank` int(11) NULL DEFAULT NULL,
  `nae_gong` int(11) NULL DEFAULT NULL,
  `last_rank` int(11) NULL DEFAULT NULL,
  `training_point` int(11) NULL DEFAULT NULL,
  `last_update` datetime NULL DEFAULT current_timestamp() ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE INDEX `account_id`(`account_id` ASC, `world_id` ASC) USING BTREE,
  INDEX `world_id`(`world_id` ASC, `stat` ASC) USING BTREE,
  INDEX `name`(`name` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for memo_in
-- ----------------------------
DROP TABLE IF EXISTS `memo_in`;
CREATE TABLE `memo_in`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `character_id` int(11) NOT NULL,
  `delete` tinyint(4) NOT NULL,
  `state` tinyint(4) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `sender` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `message` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `date` datetime NOT NULL,
  `type` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for memo_in_copy1
-- ----------------------------
DROP TABLE IF EXISTS `memo_in_copy1`;
CREATE TABLE `memo_in_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `character_id` int(11) NOT NULL,
  `delete` tinyint(4) NOT NULL,
  `state` tinyint(4) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `sender` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `message` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `date` datetime NOT NULL,
  `type` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for memo_out
-- ----------------------------
DROP TABLE IF EXISTS `memo_out`;
CREATE TABLE `memo_out`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `delete` tinyint(4) NOT NULL,
  `state` tinyint(4) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `sender` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `recipient_id` int(11) NOT NULL,
  `recipient` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `message` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `sender_id`(`sender_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for memo_out_copy1
-- ----------------------------
DROP TABLE IF EXISTS `memo_out_copy1`;
CREATE TABLE `memo_out_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `delete` tinyint(4) NOT NULL,
  `state` tinyint(4) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `sender` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `recipient_id` int(11) NOT NULL,
  `recipient` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `message` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `sender_id`(`sender_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for meso_account_log
-- ----------------------------
DROP TABLE IF EXISTS `meso_account_log`;
CREATE TABLE `meso_account_log`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL DEFAULT 0,
  `world` int(11) NOT NULL DEFAULT 0,
  `log_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `value` int(11) NOT NULL DEFAULT 0,
  `time` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `1`(`account_id`, `log_name`) USING HASH
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for meso_account_log_copy1
-- ----------------------------
DROP TABLE IF EXISTS `meso_account_log_copy1`;
CREATE TABLE `meso_account_log_copy1`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL DEFAULT 0,
  `world` int(11) NOT NULL DEFAULT 0,
  `log_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `value` int(11) NOT NULL DEFAULT 0,
  `time` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `1`(`account_id`, `log_name`) USING HASH
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for mg_colorful_mail
-- ----------------------------
DROP TABLE IF EXISTS `mg_colorful_mail`;
CREATE TABLE `mg_colorful_mail`  (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(55) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `level` int(9) NULL DEFAULT NULL,
  `passDate` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for mg_colorful_mail_copy1
-- ----------------------------
DROP TABLE IF EXISTS `mg_colorful_mail_copy1`;
CREATE TABLE `mg_colorful_mail_copy1`  (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(55) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `level` int(9) NULL DEFAULT NULL,
  `passDate` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for mg_rainbow_rush
-- ----------------------------
DROP TABLE IF EXISTS `mg_rainbow_rush`;
CREATE TABLE `mg_rainbow_rush`  (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(55) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `level` int(9) NULL DEFAULT NULL,
  `passDate` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for mg_rainbow_rush_copy1
-- ----------------------------
DROP TABLE IF EXISTS `mg_rainbow_rush_copy1`;
CREATE TABLE `mg_rainbow_rush_copy1`  (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(55) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `level` int(9) NULL DEFAULT NULL,
  `passDate` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for mg_seesaw
-- ----------------------------
DROP TABLE IF EXISTS `mg_seesaw`;
CREATE TABLE `mg_seesaw`  (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(55) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `level` int(9) NULL DEFAULT NULL,
  `passDate` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for mg_seesaw_copy1
-- ----------------------------
DROP TABLE IF EXISTS `mg_seesaw_copy1`;
CREATE TABLE `mg_seesaw_copy1`  (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(55) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `level` int(9) NULL DEFAULT NULL,
  `passDate` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for mg_wagultower
-- ----------------------------
DROP TABLE IF EXISTS `mg_wagultower`;
CREATE TABLE `mg_wagultower`  (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(55) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `level` int(9) NULL DEFAULT NULL,
  `passDate` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for mg_wagultower_copy1
-- ----------------------------
DROP TABLE IF EXISTS `mg_wagultower_copy1`;
CREATE TABLE `mg_wagultower_copy1`  (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(55) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `level` int(9) NULL DEFAULT NULL,
  `passDate` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for mineclearance
-- ----------------------------
DROP TABLE IF EXISTS `mineclearance`;
CREATE TABLE `mineclearance`  (
  `uid` int(25) NOT NULL AUTO_INCREMENT,
  `cid` int(25) NULL DEFAULT NULL,
  `cname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `integral` int(25) NULL DEFAULT NULL,
  `jifen` int(25) NULL DEFAULT NULL,
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for mineclearance_copy1
-- ----------------------------
DROP TABLE IF EXISTS `mineclearance_copy1`;
CREATE TABLE `mineclearance_copy1`  (
  `uid` int(25) NOT NULL AUTO_INCREMENT,
  `cid` int(25) NULL DEFAULT NULL,
  `cname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `integral` int(25) NULL DEFAULT NULL,
  `jifen` int(25) NULL DEFAULT NULL,
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for mm_killbosstime
-- ----------------------------
DROP TABLE IF EXISTS `mm_killbosstime`;
CREATE TABLE `mm_killbosstime`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `charid` int(11) NULL DEFAULT NULL,
  `charname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `level` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `job` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `time` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT '',
  `partylog` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `bosslog` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for mm_killbosstime_copy1
-- ----------------------------
DROP TABLE IF EXISTS `mm_killbosstime_copy1`;
CREATE TABLE `mm_killbosstime_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `charid` int(11) NULL DEFAULT NULL,
  `charname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `level` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `job` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `time` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT '',
  `partylog` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `bosslog` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for mobmeso
-- ----------------------------
DROP TABLE IF EXISTS `mobmeso`;
CREATE TABLE `mobmeso`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `mob` int(11) NOT NULL DEFAULT 0,
  `pay_used` int(11) NOT NULL DEFAULT 0,
  `pay_reward` int(11) NOT NULL DEFAULT 0,
  `name` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `TWD` int(15) UNSIGNED ZEROFILL NOT NULL DEFAULT 000000000000000,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `accname`(`account_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9863 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for mobmeso_copy1
-- ----------------------------
DROP TABLE IF EXISTS `mobmeso_copy1`;
CREATE TABLE `mobmeso_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `mob` int(11) NOT NULL DEFAULT 0,
  `pay_used` int(11) NOT NULL DEFAULT 0,
  `pay_reward` int(11) NOT NULL DEFAULT 0,
  `name` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `TWD` int(15) UNSIGNED ZEROFILL NOT NULL DEFAULT 000000000000000,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `accname`(`account_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9863 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for money
-- ----------------------------
DROP TABLE IF EXISTS `money`;
CREATE TABLE `money`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aid` int(11) NULL DEFAULT NULL,
  `aname` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `money` int(11) NULL DEFAULT NULL,
  `total` int(11) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for money_log
-- ----------------------------
DROP TABLE IF EXISTS `money_log`;
CREATE TABLE `money_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `money` int(11) NULL DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for money_log_copy1
-- ----------------------------
DROP TABLE IF EXISTS `money_log_copy1`;
CREATE TABLE `money_log_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `change` bigint(20) NOT NULL COMMENT '变动金额（+增加，-减少）',
  `reason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL COMMENT '变动原因',
  `create_time` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_account`(`account_id` ASC) USING BTREE,
  CONSTRAINT `money_log_copy1_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci COMMENT = '金钱变动日志表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for my_home
-- ----------------------------
DROP TABLE IF EXISTS `my_home`;
CREATE TABLE `my_home`  (
  `account_id` int(11) NOT NULL,
  `world_id` int(11) NOT NULL,
  `home_id` int(11) NOT NULL,
  PRIMARY KEY (`account_id`, `world_id`) USING BTREE,
  INDEX `home_id`(`home_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for my_home_collect
-- ----------------------------
DROP TABLE IF EXISTS `my_home_collect`;
CREATE TABLE `my_home_collect`  (
  `home_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  UNIQUE INDEX `home_id`(`home_id` ASC, `item_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for my_home_collect_copy1
-- ----------------------------
DROP TABLE IF EXISTS `my_home_collect_copy1`;
CREATE TABLE `my_home_collect_copy1`  (
  `home_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  UNIQUE INDEX `home_id`(`home_id` ASC, `item_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for my_home_copy1
-- ----------------------------
DROP TABLE IF EXISTS `my_home_copy1`;
CREATE TABLE `my_home_copy1`  (
  `account_id` int(11) NOT NULL,
  `world_id` int(11) NOT NULL,
  `home_id` int(11) NOT NULL,
  PRIMARY KEY (`account_id`, `world_id`) USING BTREE,
  INDEX `home_id`(`home_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for my_home_drawing
-- ----------------------------
DROP TABLE IF EXISTS `my_home_drawing`;
CREATE TABLE `my_home_drawing`  (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `home_id` int(11) NOT NULL,
  `drawing` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `home_id`(`home_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for my_home_drawing_copy1
-- ----------------------------
DROP TABLE IF EXISTS `my_home_drawing_copy1`;
CREATE TABLE `my_home_drawing_copy1`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `home_id` int(11) NOT NULL,
  `drawing` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `home_id`(`home_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for my_home_furniture
-- ----------------------------
DROP TABLE IF EXISTS `my_home_furniture`;
CREATE TABLE `my_home_furniture`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `home_id` int(11) NOT NULL,
  `state` int(11) NOT NULL DEFAULT 0,
  `field_id` int(11) NOT NULL DEFAULT 0,
  `floor_key` int(11) NOT NULL DEFAULT 0,
  `x` int(11) NOT NULL DEFAULT 0,
  `y` int(11) NOT NULL DEFAULT 0,
  `item_id` int(11) NOT NULL DEFAULT 0,
  `stance` int(11) NOT NULL DEFAULT 0,
  `collect` int(11) NOT NULL DEFAULT 0,
  `animation` int(11) NOT NULL DEFAULT 0,
  `record` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `home_id`(`home_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for my_home_furniture_copy1
-- ----------------------------
DROP TABLE IF EXISTS `my_home_furniture_copy1`;
CREATE TABLE `my_home_furniture_copy1`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `home_id` int(11) NOT NULL,
  `state` int(11) NOT NULL DEFAULT 0,
  `field_id` int(11) NOT NULL DEFAULT 0,
  `floor_key` int(11) NOT NULL DEFAULT 0,
  `x` int(11) NOT NULL DEFAULT 0,
  `y` int(11) NOT NULL DEFAULT 0,
  `item_id` int(11) NOT NULL DEFAULT 0,
  `stance` int(11) NOT NULL DEFAULT 0,
  `collect` int(11) NOT NULL DEFAULT 0,
  `animation` int(11) NOT NULL DEFAULT 0,
  `record` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `home_id`(`home_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 79 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for my_home_info
-- ----------------------------
DROP TABLE IF EXISTS `my_home_info`;
CREATE TABLE `my_home_info`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `intro` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `type` int(11) NOT NULL DEFAULT 1,
  `roof` int(11) NOT NULL DEFAULT 0,
  `roof_deco` int(11) NOT NULL DEFAULT 0,
  `wall_front` int(11) NOT NULL DEFAULT 0,
  `wall_back` int(11) NOT NULL DEFAULT 0,
  `tile` int(11) NOT NULL DEFAULT 0,
  `window` int(11) NOT NULL DEFAULT 0,
  `exterior_deco` int(11) NOT NULL DEFAULT 0,
  `door` int(11) NOT NULL DEFAULT 0,
  `parasol` int(11) NOT NULL DEFAULT 0,
  `chimney` int(11) NOT NULL DEFAULT 0,
  `storage_slot` int(11) NOT NULL DEFAULT 72,
  `visitor` int(11) NOT NULL DEFAULT 0,
  `like` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for my_home_info_copy1
-- ----------------------------
DROP TABLE IF EXISTS `my_home_info_copy1`;
CREATE TABLE `my_home_info_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `intro` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `type` int(11) NOT NULL DEFAULT 1,
  `roof` int(11) NOT NULL DEFAULT 0,
  `roof_deco` int(11) NOT NULL DEFAULT 0,
  `wall_front` int(11) NOT NULL DEFAULT 0,
  `wall_back` int(11) NOT NULL DEFAULT 0,
  `tile` int(11) NOT NULL DEFAULT 0,
  `window` int(11) NOT NULL DEFAULT 0,
  `exterior_deco` int(11) NOT NULL DEFAULT 0,
  `door` int(11) NOT NULL DEFAULT 0,
  `parasol` int(11) NOT NULL DEFAULT 0,
  `chimney` int(11) NOT NULL DEFAULT 0,
  `storage_slot` int(11) NOT NULL DEFAULT 72,
  `visitor` int(11) NOT NULL DEFAULT 0,
  `like` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for my_home_neighbor
-- ----------------------------
DROP TABLE IF EXISTS `my_home_neighbor`;
CREATE TABLE `my_home_neighbor`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `home_id` int(11) NOT NULL DEFAULT 0,
  `neighbor_id` int(11) NOT NULL DEFAULT 0,
  `nick_name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `home_id`(`home_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for my_home_neighbor_copy1
-- ----------------------------
DROP TABLE IF EXISTS `my_home_neighbor_copy1`;
CREATE TABLE `my_home_neighbor_copy1`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `home_id` int(11) NOT NULL DEFAULT 0,
  `neighbor_id` int(11) NOT NULL DEFAULT 0,
  `nick_name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `home_id`(`home_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for national_days
-- ----------------------------
DROP TABLE IF EXISTS `national_days`;
CREATE TABLE `national_days`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accid` int(11) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `tips` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `datetime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for national_days_copy1
-- ----------------------------
DROP TABLE IF EXISTS `national_days_copy1`;
CREATE TABLE `national_days_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accid` int(11) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `tips` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `datetime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for national_days_number
-- ----------------------------
DROP TABLE IF EXISTS `national_days_number`;
CREATE TABLE `national_days_number`  (
  `id` int(11) NOT NULL,
  `number` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for national_days_number_copy1
-- ----------------------------
DROP TABLE IF EXISTS `national_days_number_copy1`;
CREATE TABLE `national_days_number_copy1`  (
  `id` int(11) NOT NULL,
  `number` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for online_reward
-- ----------------------------
DROP TABLE IF EXISTS `online_reward`;
CREATE TABLE `online_reward`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item` int(11) NULL DEFAULT NULL,
  `number` int(11) NULL DEFAULT NULL,
  `cash` int(11) NULL DEFAULT 0,
  `point` int(11) NULL DEFAULT NULL,
  `mesos` int(11) NULL DEFAULT 0,
  `accountId` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for online_reward_copy1
-- ----------------------------
DROP TABLE IF EXISTS `online_reward_copy1`;
CREATE TABLE `online_reward_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item` int(11) NULL DEFAULT NULL,
  `number` int(11) NULL DEFAULT NULL,
  `cash` int(11) NULL DEFAULT 0,
  `point` int(11) NULL DEFAULT NULL,
  `mesos` int(11) NULL DEFAULT 0,
  `accountId` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for orange
-- ----------------------------
DROP TABLE IF EXISTS `orange`;
CREATE TABLE `orange`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accID` int(11) NULL DEFAULT NULL,
  `charaname` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `level` varchar(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `passDate` datetime NULL DEFAULT NULL,
  `map` int(11) NULL DEFAULT NULL,
  `open` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 60529 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for orange_copy1
-- ----------------------------
DROP TABLE IF EXISTS `orange_copy1`;
CREATE TABLE `orange_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accID` int(11) NULL DEFAULT NULL,
  `charaname` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `level` varchar(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `passDate` datetime NULL DEFAULT NULL,
  `map` int(11) NULL DEFAULT NULL,
  `open` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 60529 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for orange_pos
-- ----------------------------
DROP TABLE IF EXISTS `orange_pos`;
CREATE TABLE `orange_pos`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `map_id` int(11) NULL DEFAULT NULL,
  `pos_x` int(11) NULL DEFAULT NULL,
  `pos_y` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 482 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for orange_pos_copy1
-- ----------------------------
DROP TABLE IF EXISTS `orange_pos_copy1`;
CREATE TABLE `orange_pos_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `map_id` int(11) NULL DEFAULT NULL,
  `pos_x` int(11) NULL DEFAULT NULL,
  `pos_y` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 482 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for parcel
-- ----------------------------
DROP TABLE IF EXISTS `parcel`;
CREATE TABLE `parcel`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `character_id` int(11) NOT NULL DEFAULT 0,
  `sender` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `msg` varchar(202) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `money` int(11) NOT NULL DEFAULT 0,
  `delivery_date` datetime NOT NULL,
  `type` tinyint(4) NOT NULL DEFAULT 0,
  `item_type` tinyint(4) NOT NULL DEFAULT 0,
  `entity_id` bigint(20) NOT NULL DEFAULT -1,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for parcel_copy1
-- ----------------------------
DROP TABLE IF EXISTS `parcel_copy1`;
CREATE TABLE `parcel_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `character_id` int(11) NOT NULL DEFAULT 0,
  `sender` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `msg` varchar(202) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `money` int(11) NOT NULL DEFAULT 0,
  `delivery_date` datetime NOT NULL,
  `type` tinyint(4) NOT NULL DEFAULT 0,
  `item_type` tinyint(4) NOT NULL DEFAULT 0,
  `entity_id` bigint(20) NOT NULL DEFAULT -1,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 104 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for pvp_rank
-- ----------------------------
DROP TABLE IF EXISTS `pvp_rank`;
CREATE TABLE `pvp_rank`  (
  `account_id` int(11) NOT NULL COMMENT '帳號 ID',
  `world_id` int(11) NOT NULL COMMENT '世界 ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '角色名稱',
  `point` int(11) NOT NULL DEFAULT 0 COMMENT 'PVP 點數',
  `rank` int(11) NOT NULL DEFAULT 0 COMMENT '排名',
  `total` int(11) NOT NULL DEFAULT 0 COMMENT '總場次',
  `win` int(11) NOT NULL DEFAULT 0 COMMENT '勝利場次',
  PRIMARY KEY (`account_id`, `world_id`) USING BTREE,
  INDEX `idx_world_point`(`world_id` ASC, `point` ASC) USING BTREE,
  INDEX `idx_world_name`(`world_id` ASC, `name` ASC) USING BTREE,
  INDEX `idx_world_rank`(`world_id` ASC, `rank` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for pvp_rank_copy1
-- ----------------------------
DROP TABLE IF EXISTS `pvp_rank_copy1`;
CREATE TABLE `pvp_rank_copy1`  (
  `account_id` int(11) NOT NULL COMMENT '帳號 ID',
  `world_id` int(11) NOT NULL COMMENT '世界 ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '角色名稱',
  `point` int(11) NOT NULL DEFAULT 0 COMMENT 'PVP 點數',
  `rank` int(11) NOT NULL DEFAULT 0 COMMENT '排名',
  `total` int(11) NOT NULL DEFAULT 0 COMMENT '總場次',
  `win` int(11) NOT NULL DEFAULT 0 COMMENT '勝利場次',
  PRIMARY KEY (`account_id`, `world_id`) USING BTREE,
  INDEX `idx_world_point`(`world_id` ASC, `point` ASC) USING BTREE,
  INDEX `idx_world_name`(`world_id` ASC, `name` ASC) USING BTREE,
  INDEX `idx_world_rank`(`world_id` ASC, `rank` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for reg_gateway_reglog
-- ----------------------------
DROP TABLE IF EXISTS `reg_gateway_reglog`;
CREATE TABLE `reg_gateway_reglog`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ts` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_ip`(`ip` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sean_retail
-- ----------------------------
DROP TABLE IF EXISTS `sean_retail`;
CREATE TABLE `sean_retail`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `onlyid` int(11) NOT NULL,
  `itemid` int(11) NULL DEFAULT NULL,
  `itemname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `max` int(11) NOT NULL DEFAULT 0,
  `count` int(11) NOT NULL DEFAULT 1,
  `record` bigint(20) NOT NULL DEFAULT 0,
  `money` int(11) NOT NULL DEFAULT 0,
  `date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sign_nange
-- ----------------------------
DROP TABLE IF EXISTS `sign_nange`;
CREATE TABLE `sign_nange`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL,
  `user_id` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL,
  `continuity` int(11) NOT NULL,
  `sum` int(11) NOT NULL,
  `month` int(11) NOT NULL,
  `last` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sign_nange_copy1
-- ----------------------------
DROP TABLE IF EXISTS `sign_nange_copy1`;
CREATE TABLE `sign_nange_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL,
  `user_id` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL,
  `continuity` int(11) NOT NULL,
  `sum` int(11) NOT NULL,
  `month` int(11) NOT NULL,
  `last` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 134 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for skillmacros
-- ----------------------------
DROP TABLE IF EXISTS `skillmacros`;
CREATE TABLE `skillmacros`  (
  `characters_id` int(11) NOT NULL DEFAULT 0,
  `position` tinyint(1) NOT NULL DEFAULT 0,
  `name` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `silent` tinyint(1) NOT NULL DEFAULT 0,
  `skill1` int(11) NOT NULL DEFAULT 0,
  `skill2` int(11) NOT NULL DEFAULT 0,
  `skill3` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`characters_id`, `position`) USING BTREE,
  INDEX `characterid`(`characters_id` ASC) USING BTREE,
  CONSTRAINT `skillmacros_ibfk_1` FOREIGN KEY (`characters_id`) REFERENCES `characters` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for skillmacros_copy1
-- ----------------------------
DROP TABLE IF EXISTS `skillmacros_copy1`;
CREATE TABLE `skillmacros_copy1`  (
  `characters_id` int(11) NOT NULL DEFAULT 0,
  `position` tinyint(1) NOT NULL DEFAULT 0,
  `name` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `silent` tinyint(1) NOT NULL DEFAULT 0,
  `skill1` int(11) NOT NULL DEFAULT 0,
  `skill2` int(11) NOT NULL DEFAULT 0,
  `skill3` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`characters_id`, `position`) USING BTREE,
  INDEX `characterid`(`characters_id` ASC) USING BTREE,
  CONSTRAINT `skillmacros_copy1_ibfk_1` FOREIGN KEY (`characters_id`) REFERENCES `characters` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for smap
-- ----------------------------
DROP TABLE IF EXISTS `smap`;
CREATE TABLE `smap`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ditu` int(11) NULL DEFAULT NULL,
  `biaoji` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 44 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for smap_copy1
-- ----------------------------
DROP TABLE IF EXISTS `smap_copy1`;
CREATE TABLE `smap_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ditu` int(11) NULL DEFAULT NULL,
  `biaoji` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 44 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sponsor
-- ----------------------------
DROP TABLE IF EXISTS `sponsor`;
CREATE TABLE `sponsor`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NULL DEFAULT NULL,
  `account_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `character_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `TWD` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for store_equip
-- ----------------------------
DROP TABLE IF EXISTS `store_equip`;
CREATE TABLE `store_equip`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `aid` int(11) NULL DEFAULT NULL,
  `cid` int(11) NULL DEFAULT NULL,
  `cname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `equip` int(11) NULL DEFAULT NULL,
  `type` tinyint(4) NULL DEFAULT NULL,
  `itemid` int(11) NULL DEFAULT NULL,
  `num` int(11) NULL DEFAULT NULL,
  `onlyid` bigint(20) NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `ruc` tinyint(4) NOT NULL DEFAULT 0,
  `cuc` tinyint(4) NOT NULL DEFAULT 0,
  `baseStr` smallint(6) NOT NULL DEFAULT 0,
  `baseDex` smallint(6) NOT NULL DEFAULT 0,
  `baseInt` smallint(6) NOT NULL DEFAULT 0,
  `baseLuk` smallint(6) NOT NULL DEFAULT 0,
  `maxHp` smallint(6) NOT NULL DEFAULT 0,
  `maxMp` smallint(6) NOT NULL DEFAULT 0,
  `pad` smallint(6) NOT NULL DEFAULT 0,
  `mad` smallint(6) NOT NULL DEFAULT 0,
  `pdd` smallint(6) NOT NULL DEFAULT 0,
  `craft` smallint(6) NOT NULL DEFAULT 0,
  `speed` smallint(6) NOT NULL DEFAULT 0,
  `jump` smallint(6) NOT NULL DEFAULT 0,
  `attribute` int(11) NOT NULL DEFAULT 0,
  `levelUpType` tinyint(4) NOT NULL DEFAULT 0,
  `incSkill` int(11) NOT NULL DEFAULT 0,
  `level` tinyint(4) NOT NULL DEFAULT 0,
  `exp` bigint(20) NOT NULL DEFAULT 0,
  `durability` int(11) NOT NULL DEFAULT 0,
  `iuc` int(11) NOT NULL DEFAULT 0,
  `puc` int(11) NOT NULL DEFAULT 0,
  `pvpDamage` smallint(6) NOT NULL DEFAULT 0,
  `reduceReq` tinyint(4) NOT NULL DEFAULT 0,
  `specialAttribute` smallint(6) NOT NULL DEFAULT 0,
  `durabilityMax` int(11) NOT NULL DEFAULT 0,
  `incReq` tinyint(4) NOT NULL DEFAULT 0,
  `growthEnchant` tinyint(4) NOT NULL DEFAULT 0,
  `enchant` tinyint(4) NOT NULL DEFAULT 0,
  `bossDamageR` smallint(6) NOT NULL DEFAULT 0,
  `ignorePdr` smallint(6) NOT NULL DEFAULT 0,
  `damageR` smallint(6) NOT NULL DEFAULT 0,
  `statRate` smallint(6) NOT NULL DEFAULT 0,
  `cuttable` tinyint(4) NOT NULL DEFAULT -1,
  `exGradeOption` bigint(20) NOT NULL DEFAULT 0,
  `itemState` int(11) NOT NULL DEFAULT 0,
  `euc` tinyint(4) NOT NULL DEFAULT 0,
  `reuc` tinyint(4) NOT NULL DEFAULT 0,
  `excelStr` smallint(6) NOT NULL DEFAULT 0,
  `excelDex` smallint(6) NOT NULL DEFAULT 0,
  `excelInt` smallint(6) NOT NULL DEFAULT 0,
  `excelLuk` smallint(6) NOT NULL DEFAULT 0,
  `excelMaxHp` smallint(6) NOT NULL DEFAULT 0,
  `excelMaxMp` smallint(6) NOT NULL DEFAULT 0,
  `excelPad` smallint(6) NOT NULL DEFAULT 0,
  `excelMad` smallint(6) NOT NULL DEFAULT 0,
  `excelPdd` smallint(6) NOT NULL DEFAULT 0,
  `excelCraft` smallint(6) NOT NULL DEFAULT 0,
  `excelSpeed` smallint(6) NOT NULL DEFAULT 0,
  `excelJump` smallint(6) NOT NULL DEFAULT 0,
  `grade` tinyint(4) NOT NULL DEFAULT 0,
  `chuc` tinyint(4) NOT NULL DEFAULT 0,
  `option1` int(6) NOT NULL DEFAULT 0,
  `option1Lv` tinyint(4) NOT NULL DEFAULT 0,
  `option2` int(6) NOT NULL DEFAULT 0,
  `option2Lv` tinyint(4) NOT NULL DEFAULT 0,
  `option3` int(6) NOT NULL DEFAULT 0,
  `option3Lv` tinyint(4) NOT NULL DEFAULT 0,
  `option4` int(6) NOT NULL DEFAULT 0,
  `option4Lv` tinyint(4) NOT NULL DEFAULT 0,
  `option5` int(6) NOT NULL DEFAULT 0,
  `option5Lv` tinyint(4) NOT NULL DEFAULT 0,
  `option6` int(6) NOT NULL DEFAULT 0,
  `option6Lv` tinyint(4) NOT NULL DEFAULT 0,
  `skin` int(11) NOT NULL DEFAULT 0,
  `socketGrade` smallint(6) NOT NULL DEFAULT 0,
  `socket1` smallint(6) NOT NULL DEFAULT 0,
  `socket2` smallint(6) NOT NULL DEFAULT 0,
  `socket3` smallint(6) NOT NULL DEFAULT 0,
  `color` int(11) NOT NULL DEFAULT 0,
  `soulOptionId` smallint(6) NOT NULL DEFAULT 0,
  `soulSocket` smallint(6) NOT NULL DEFAULT 0,
  `soulOption` smallint(6) NOT NULL DEFAULT 0,
  `arc` smallint(6) NOT NULL DEFAULT 0,
  `arcExp` int(11) NOT NULL DEFAULT 0,
  `arcLevel` smallint(6) NOT NULL DEFAULT 0,
  `aut` smallint(6) NOT NULL DEFAULT 0,
  `autExp` int(11) NOT NULL DEFAULT 0,
  `autLevel` smallint(6) NOT NULL DEFAULT 0,
  `startdate` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for test
-- ----------------------------
DROP TABLE IF EXISTS `test`;
CREATE TABLE `test`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accid` int(11) NULL DEFAULT NULL,
  `number` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for test_copy1
-- ----------------------------
DROP TABLE IF EXISTS `test_copy1`;
CREATE TABLE `test_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accid` int(11) NULL DEFAULT NULL,
  `number` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for testlog
-- ----------------------------
DROP TABLE IF EXISTS `testlog`;
CREATE TABLE `testlog`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sn` int(11) NULL DEFAULT NULL,
  `star` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for testlog_copy1
-- ----------------------------
DROP TABLE IF EXISTS `testlog_copy1`;
CREATE TABLE `testlog_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sn` int(11) NULL DEFAULT NULL,
  `star` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for trunk
-- ----------------------------
DROP TABLE IF EXISTS `trunk`;
CREATE TABLE `trunk`  (
  `account_id` int(11) NOT NULL DEFAULT 0,
  `world_id` int(11) NOT NULL DEFAULT 0,
  `capacity` smallint(6) NOT NULL DEFAULT 4,
  `money` bigint(20) NOT NULL DEFAULT 0,
  UNIQUE INDEX `account_id`(`account_id` ASC, `world_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for trunk_copy1
-- ----------------------------
DROP TABLE IF EXISTS `trunk_copy1`;
CREATE TABLE `trunk_copy1`  (
  `account_id` int(11) NOT NULL DEFAULT 0,
  `world_id` int(11) NOT NULL DEFAULT 0,
  `capacity` smallint(6) NOT NULL DEFAULT 4,
  `money` bigint(20) NOT NULL DEFAULT 0,
  UNIQUE INDEX `account_id`(`account_id` ASC, `world_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for tuiwen
-- ----------------------------
DROP TABLE IF EXISTS `tuiwen`;
CREATE TABLE `tuiwen`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NULL DEFAULT NULL,
  `item_id` int(11) NULL DEFAULT NULL,
  `number` int(11) NULL DEFAULT NULL,
  `time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 137 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for tuiwen_copy1
-- ----------------------------
DROP TABLE IF EXISTS `tuiwen_copy1`;
CREATE TABLE `tuiwen_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NULL DEFAULT NULL,
  `item_id` int(11) NULL DEFAULT NULL,
  `number` int(11) NULL DEFAULT NULL,
  `time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 137 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for uu_bossdrop
-- ----------------------------
DROP TABLE IF EXISTS `uu_bossdrop`;
CREATE TABLE `uu_bossdrop`  (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `mobid` int(11) NULL DEFAULT NULL,
  `itemid` int(11) NULL DEFAULT NULL,
  `itemName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `chance` int(11) NULL DEFAULT NULL,
  `minnum` int(11) NULL DEFAULT NULL,
  `maxnum` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idx`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for uu_bossdrop_copy1
-- ----------------------------
DROP TABLE IF EXISTS `uu_bossdrop_copy1`;
CREATE TABLE `uu_bossdrop_copy1`  (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `mobid` int(11) NULL DEFAULT NULL,
  `itemid` int(11) NULL DEFAULT NULL,
  `itemName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `chance` int(11) NULL DEFAULT NULL,
  `minnum` int(11) NULL DEFAULT NULL,
  `maxnum` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idx`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for uu_eventrank
-- ----------------------------
DROP TABLE IF EXISTS `uu_eventrank`;
CREATE TABLE `uu_eventrank`  (
  `edate` int(11) NOT NULL COMMENT '當天日期',
  `ename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL COMMENT '活動名稱',
  `rank` int(11) NULL DEFAULT NULL COMMENT '當前名次',
  PRIMARY KEY (`edate`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for uu_eventrank_copy1
-- ----------------------------
DROP TABLE IF EXISTS `uu_eventrank_copy1`;
CREATE TABLE `uu_eventrank_copy1`  (
  `edate` int(11) NOT NULL COMMENT '當天日期',
  `ename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL COMMENT '活動名稱',
  `rank` int(11) NULL DEFAULT NULL COMMENT '當前名次',
  PRIMARY KEY (`edate`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for uu_gachapon_date
-- ----------------------------
DROP TABLE IF EXISTS `uu_gachapon_date`;
CREATE TABLE `uu_gachapon_date`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `itemid` int(11) NOT NULL DEFAULT 0 COMMENT '道具ID',
  `period` tinyint(4) NOT NULL DEFAULT 0 COMMENT '当前期',
  `day` tinyint(4) NOT NULL DEFAULT 0 COMMENT '换期间隔',
  `date` bigint(20) NULL DEFAULT NULL,
  `state` tinyint(4) NOT NULL DEFAULT 1 COMMENT '上架状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for uu_gachapon_date_copy1
-- ----------------------------
DROP TABLE IF EXISTS `uu_gachapon_date_copy1`;
CREATE TABLE `uu_gachapon_date_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `itemid` int(11) NOT NULL DEFAULT 0 COMMENT '道具ID',
  `period` tinyint(4) NOT NULL DEFAULT 0 COMMENT '当前期',
  `day` tinyint(4) NOT NULL DEFAULT 0 COMMENT '换期间隔',
  `date` bigint(20) NULL DEFAULT NULL,
  `state` tinyint(4) NOT NULL DEFAULT 1 COMMENT '上架状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for uu_gachapon_item
-- ----------------------------
DROP TABLE IF EXISTS `uu_gachapon_item`;
CREATE TABLE `uu_gachapon_item`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `itemid` int(11) NOT NULL DEFAULT 0 COMMENT '道具ID',
  `name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT '默认' COMMENT '道具名字',
  `broadcast` tinyint(4) NOT NULL DEFAULT 0 COMMENT '广播',
  `state` tinyint(4) NOT NULL DEFAULT 0 COMMENT '上架状态',
  `period` tinyint(4) NOT NULL DEFAULT 0 COMMENT '所在期',
  `toitemid` int(11) NOT NULL DEFAULT 0 COMMENT '所属区',
  `rate` int(11) NOT NULL DEFAULT 0 COMMENT '概率',
  `gender` tinyint(4) NOT NULL DEFAULT 0 COMMENT '性别',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for uu_gachapon_item_copy1
-- ----------------------------
DROP TABLE IF EXISTS `uu_gachapon_item_copy1`;
CREATE TABLE `uu_gachapon_item_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `itemid` int(11) NOT NULL DEFAULT 0 COMMENT '道具ID',
  `name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT '默认' COMMENT '道具名字',
  `broadcast` tinyint(4) NOT NULL DEFAULT 0 COMMENT '广播',
  `state` tinyint(4) NOT NULL DEFAULT 0 COMMENT '上架状态',
  `period` tinyint(4) NOT NULL DEFAULT 0 COMMENT '所在期',
  `toitemid` int(11) NOT NULL DEFAULT 0 COMMENT '所属区',
  `rate` int(11) NOT NULL DEFAULT 0 COMMENT '概率',
  `gender` tinyint(4) NOT NULL DEFAULT 0 COMMENT '性别',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for uu_item_exchange
-- ----------------------------
DROP TABLE IF EXISTS `uu_item_exchange`;
CREATE TABLE `uu_item_exchange`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `in_items` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0',
  `out_items` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0',
  `attributes` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0,0,0,0,0,0',
  `itemtime` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0',
  `remark` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `iscdkey` int(11) NOT NULL DEFAULT 0 COMMENT '1不限制次数，其他只能使用1次',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for uu_item_exchange_copy1
-- ----------------------------
DROP TABLE IF EXISTS `uu_item_exchange_copy1`;
CREATE TABLE `uu_item_exchange_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `in_items` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0',
  `out_items` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0',
  `attributes` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0,0,0,0,0,0',
  `itemtime` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0',
  `remark` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `iscdkey` int(11) NOT NULL DEFAULT 0 COMMENT '1不限制次数，其他只能使用1次',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for uu_lottery
-- ----------------------------
DROP TABLE IF EXISTS `uu_lottery`;
CREATE TABLE `uu_lottery`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `characters_id` int(11) NULL DEFAULT NULL,
  `number` int(11) NULL DEFAULT NULL,
  `redball` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `blueball` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `cprate` int(11) NULL DEFAULT 1,
  `cpstatus` int(11) NULL DEFAULT 0,
  `bonus` int(11) NULL DEFAULT 0,
  `time` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for uu_lottery_copy1
-- ----------------------------
DROP TABLE IF EXISTS `uu_lottery_copy1`;
CREATE TABLE `uu_lottery_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `characters_id` int(11) NULL DEFAULT NULL,
  `number` int(11) NULL DEFAULT NULL,
  `redball` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `blueball` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `cprate` int(11) NULL DEFAULT 1,
  `cpstatus` int(11) NULL DEFAULT 0,
  `bonus` int(11) NULL DEFAULT 0,
  `time` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for uu_lotteryres
-- ----------------------------
DROP TABLE IF EXISTS `uu_lotteryres`;
CREATE TABLE `uu_lotteryres`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `number` bigint(20) NOT NULL,
  `redball` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `blueball` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `number`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for uu_lotteryres_copy1
-- ----------------------------
DROP TABLE IF EXISTS `uu_lotteryres_copy1`;
CREATE TABLE `uu_lotteryres_copy1`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `number` bigint(20) NOT NULL,
  `redball` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `blueball` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `number`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for uu_promote
-- ----------------------------
DROP TABLE IF EXISTS `uu_promote`;
CREATE TABLE `uu_promote`  (
  `account_id` int(11) NOT NULL DEFAULT 0 COMMENT '賬號ID',
  `chr_id` int(11) NULL DEFAULT NULL COMMENT '角色id',
  `chr_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL COMMENT '角色名字',
  `tjr_id` int(11) NULL DEFAULT 0 COMMENT '推薦人賬號ID',
  `createtime` datetime NULL DEFAULT NULL COMMENT '創建時間',
  `modifytime` datetime NULL DEFAULT NULL COMMENT '修改時間',
  `yxbz` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT 'Y' COMMENT '有效標志',
  PRIMARY KEY (`account_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for uu_promote_copy1
-- ----------------------------
DROP TABLE IF EXISTS `uu_promote_copy1`;
CREATE TABLE `uu_promote_copy1`  (
  `account_id` int(11) NOT NULL DEFAULT 0 COMMENT '賬號ID',
  `chr_id` int(11) NULL DEFAULT NULL COMMENT '角色id',
  `chr_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL COMMENT '角色名字',
  `tjr_id` int(11) NULL DEFAULT 0 COMMENT '推薦人賬號ID',
  `createtime` datetime NULL DEFAULT NULL COMMENT '創建時間',
  `modifytime` datetime NULL DEFAULT NULL COMMENT '修改時間',
  `yxbz` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT 'Y' COMMENT '有效標志',
  PRIMARY KEY (`account_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for uu_tablegame
-- ----------------------------
DROP TABLE IF EXISTS `uu_tablegame`;
CREATE TABLE `uu_tablegame`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `period` int(11) NOT NULL DEFAULT 1 COMMENT '第几期',
  `type` int(11) NOT NULL DEFAULT 0 COMMENT '类别',
  `accountids` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL COMMENT '账号记录',
  `chrnames` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL COMMENT '角色名字记录',
  `randomres` int(11) NULL DEFAULT NULL COMMENT '结果数字',
  `winnername` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL COMMENT '赢家姓名',
  `goldwin` int(11) NULL DEFAULT 0 COMMENT '赢取金额',
  `isrecivegold` int(11) NULL DEFAULT 0 COMMENT '是否已领取，0为未领取',
  `finishedtime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `period`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for uu_tablegame_copy1
-- ----------------------------
DROP TABLE IF EXISTS `uu_tablegame_copy1`;
CREATE TABLE `uu_tablegame_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `period` int(11) NOT NULL DEFAULT 1 COMMENT '第几期',
  `type` int(11) NOT NULL DEFAULT 0 COMMENT '类别',
  `accountids` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL COMMENT '账号记录',
  `chrnames` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL COMMENT '角色名字记录',
  `randomres` int(11) NULL DEFAULT NULL COMMENT '结果数字',
  `winnername` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL COMMENT '赢家姓名',
  `goldwin` int(11) NULL DEFAULT 0 COMMENT '赢取金额',
  `isrecivegold` int(11) NULL DEFAULT 0 COMMENT '是否已领取，0为未领取',
  `finishedtime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `period`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for uu_wz_facedata
-- ----------------------------
DROP TABLE IF EXISTS `uu_wz_facedata`;
CREATE TABLE `uu_wz_facedata`  (
  `faceid` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL
) ENGINE = MyISAM CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for uu_wz_facedata_copy1
-- ----------------------------
DROP TABLE IF EXISTS `uu_wz_facedata_copy1`;
CREATE TABLE `uu_wz_facedata_copy1`  (
  `faceid` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL
) ENGINE = MyISAM CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for uu_wz_hairdata
-- ----------------------------
DROP TABLE IF EXISTS `uu_wz_hairdata`;
CREATE TABLE `uu_wz_hairdata`  (
  `hairid` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL
) ENGINE = MyISAM CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for uu_wz_hairdata_copy1
-- ----------------------------
DROP TABLE IF EXISTS `uu_wz_hairdata_copy1`;
CREATE TABLE `uu_wz_hairdata_copy1`  (
  `hairid` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL
) ENGINE = MyISAM CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for uu_wz_itemname
-- ----------------------------
DROP TABLE IF EXISTS `uu_wz_itemname`;
CREATE TABLE `uu_wz_itemname`  (
  `itemid` int(11) NOT NULL,
  `name` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for uu_wz_itemname_copy1
-- ----------------------------
DROP TABLE IF EXISTS `uu_wz_itemname_copy1`;
CREATE TABLE `uu_wz_itemname_copy1`  (
  `itemid` int(11) NOT NULL,
  `name` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for verification_code_pool
-- ----------------------------
DROP TABLE IF EXISTS `verification_code_pool`;
CREATE TABLE `verification_code_pool`  (
  `app_id` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `type` varchar(16) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `code` varchar(6) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `end_time` int(20) NOT NULL,
  PRIMARY KEY (`app_id`, `type`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for verification_code_pool_copy1
-- ----------------------------
DROP TABLE IF EXISTS `verification_code_pool_copy1`;
CREATE TABLE `verification_code_pool_copy1`  (
  `app_id` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `type` varchar(16) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `code` varchar(6) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `end_time` int(11) NOT NULL,
  PRIMARY KEY (`app_id`, `type`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for vip_stock
-- ----------------------------
DROP TABLE IF EXISTS `vip_stock`;
CREATE TABLE `vip_stock`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accountId` int(11) NULL DEFAULT NULL,
  `itemId` int(11) NULL DEFAULT NULL,
  `number` int(11) NULL DEFAULT NULL,
  `time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for vip_stock_copy1
-- ----------------------------
DROP TABLE IF EXISTS `vip_stock_copy1`;
CREATE TABLE `vip_stock_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accountId` int(11) NULL DEFAULT NULL,
  `itemId` int(11) NULL DEFAULT NULL,
  `number` int(11) NULL DEFAULT NULL,
  `time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for war_order
-- ----------------------------
DROP TABLE IF EXISTS `war_order`;
CREATE TABLE `war_order`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NULL DEFAULT NULL,
  `competition_name` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL COMMENT '赛季名',
  `quest_name` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL COMMENT '任务名',
  `exp` int(11) NULL DEFAULT 0 COMMENT '经验值',
  `times` int(11) NULL DEFAULT 1 COMMENT '本条完成次数',
  `create_time` datetime NULL DEFAULT NULL COMMENT '提交时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for war_order_copy1
-- ----------------------------
DROP TABLE IF EXISTS `war_order_copy1`;
CREATE TABLE `war_order_copy1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NULL DEFAULT NULL,
  `competition_name` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL COMMENT '赛季名',
  `quest_name` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL COMMENT '任务名',
  `exp` int(11) NULL DEFAULT 0 COMMENT '经验值',
  `times` int(11) NULL DEFAULT 1 COMMENT '本条完成次数',
  `create_time` datetime NULL DEFAULT NULL COMMENT '提交时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for world_mac
-- ----------------------------
DROP TABLE IF EXISTS `world_mac`;
CREATE TABLE `world_mac`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `onlyid` int(11) NULL DEFAULT NULL,
  `aid` int(11) NULL DEFAULT NULL,
  `cid` int(11) NULL DEFAULT NULL,
  `cname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `mac` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `num` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for yaoqianshu_task
-- ----------------------------
DROP TABLE IF EXISTS `yaoqianshu_task`;
CREATE TABLE `yaoqianshu_task`  (
  `character_id` int(11) NOT NULL,
  `ring` int(11) NULL DEFAULT 0,
  `point` int(11) NULL DEFAULT 0,
  `task_json` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT '',
  `planted` tinyint(11) NULL DEFAULT 0,
  PRIMARY KEY (`character_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for yaoqianshu_task_copy1
-- ----------------------------
DROP TABLE IF EXISTS `yaoqianshu_task_copy1`;
CREATE TABLE `yaoqianshu_task_copy1`  (
  `character_id` int(11) NOT NULL,
  `ring` int(11) NULL DEFAULT 0,
  `point` int(11) NULL DEFAULT 0,
  `task_json` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT '',
  `planted` tinyint(11) NULL DEFAULT 0,
  PRIMARY KEY (`character_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for z_account_log
-- ----------------------------
DROP TABLE IF EXISTS `z_account_log`;
CREATE TABLE `z_account_log`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL DEFAULT 0,
  `world` int(11) NOT NULL DEFAULT 0,
  `log_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `value` int(11) NOT NULL DEFAULT 0,
  `time` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `1`(`account_id`, `log_name`) USING HASH
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for z_account_log_copy1
-- ----------------------------
DROP TABLE IF EXISTS `z_account_log_copy1`;
CREATE TABLE `z_account_log_copy1`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL DEFAULT 0,
  `world` int(11) NOT NULL DEFAULT 0,
  `log_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `value` int(11) NOT NULL DEFAULT 0,
  `time` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `1`(`account_id`, `log_name`) USING HASH
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for z_consign
-- ----------------------------
DROP TABLE IF EXISTS `z_consign`;
CREATE TABLE `z_consign`  (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `accname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `charid` int(15) NULL DEFAULT NULL,
  `charname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `itemid` int(15) NULL DEFAULT NULL,
  `itemname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `itemquantity` int(15) NULL DEFAULT NULL,
  `itemtype` int(15) NULL DEFAULT NULL,
  `attrs` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for z_consign_copy1
-- ----------------------------
DROP TABLE IF EXISTS `z_consign_copy1`;
CREATE TABLE `z_consign_copy1`  (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `accname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `charid` int(15) NULL DEFAULT NULL,
  `charname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `itemid` int(15) NULL DEFAULT NULL,
  `itemname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `itemquantity` int(15) NULL DEFAULT NULL,
  `itemtype` int(15) NULL DEFAULT NULL,
  `attrs` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for z_consign_log
-- ----------------------------
DROP TABLE IF EXISTS `z_consign_log`;
CREATE TABLE `z_consign_log`  (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `msg` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `charName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `AccName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for z_consign_log_copy1
-- ----------------------------
DROP TABLE IF EXISTS `z_consign_log_copy1`;
CREATE TABLE `z_consign_log_copy1`  (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `msg` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `charName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `AccName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for z_gm_log
-- ----------------------------
DROP TABLE IF EXISTS `z_gm_log`;
CREATE TABLE `z_gm_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) NULL DEFAULT NULL,
  `cname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `msg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for z_hypay
-- ----------------------------
DROP TABLE IF EXISTS `z_hypay`;
CREATE TABLE `z_hypay`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `pay` int(11) NOT NULL DEFAULT 0,
  `pay_used` int(11) NOT NULL DEFAULT 0,
  `pay_reward` int(11) NOT NULL DEFAULT 0,
  `pay_all` int(11) NOT NULL DEFAULT 0,
  `accname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `TWD` int(15) UNSIGNED ZEROFILL NOT NULL DEFAULT 000000000000000,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `accname`(`account_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for z_hypay_log
-- ----------------------------
DROP TABLE IF EXISTS `z_hypay_log`;
CREATE TABLE `z_hypay_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NULL DEFAULT NULL,
  `money` int(11) NULL DEFAULT NULL,
  `create_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for z_luck_draw
-- ----------------------------
DROP TABLE IF EXISTS `z_luck_draw`;
CREATE TABLE `z_luck_draw`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime NULL DEFAULT NULL,
  `draw_info` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for z_luck_join
-- ----------------------------
DROP TABLE IF EXISTS `z_luck_join`;
CREATE TABLE `z_luck_join`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `a_id` int(11) NULL DEFAULT NULL,
  `a_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `c_id` int(11) NULL DEFAULT NULL,
  `c_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `create_time` datetime NULL DEFAULT NULL,
  `draw_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for z_luck_reward
-- ----------------------------
DROP TABLE IF EXISTS `z_luck_reward`;
CREATE TABLE `z_luck_reward`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime NULL DEFAULT NULL,
  `draw_info` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `item` int(11) NULL DEFAULT NULL,
  `num` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for z_mob_drop
-- ----------------------------
DROP TABLE IF EXISTS `z_mob_drop`;
CREATE TABLE `z_mob_drop`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mobId` int(11) NULL DEFAULT NULL,
  `chance` int(11) NULL DEFAULT NULL,
  `itemId` int(11) NULL DEFAULT NULL,
  `minNum` int(11) NULL DEFAULT NULL,
  `maxNum` int(11) NULL DEFAULT NULL,
  `questId` int(11) NULL DEFAULT NULL,
  `startDate` datetime NULL DEFAULT NULL,
  `endDate` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci COMMENT = 'z_mob_drop' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for z_player_log
-- ----------------------------
DROP TABLE IF EXISTS `z_player_log`;
CREATE TABLE `z_player_log`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `character_id` int(11) NOT NULL DEFAULT 0,
  `world` int(11) NOT NULL DEFAULT 0,
  `log_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `value` int(11) NOT NULL DEFAULT 0,
  `time` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `1`(`character_id`, `log_name`) USING HASH
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for z_player_log_copy1
-- ----------------------------
DROP TABLE IF EXISTS `z_player_log_copy1`;
CREATE TABLE `z_player_log_copy1`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `character_id` int(11) NOT NULL DEFAULT 0,
  `world` int(11) NOT NULL DEFAULT 0,
  `log_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `value` int(11) NOT NULL DEFAULT 0,
  `time` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `1`(`character_id`, `log_name`) USING HASH
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for z_punch
-- ----------------------------
DROP TABLE IF EXISTS `z_punch`;
CREATE TABLE `z_punch`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `banker` varchar(55) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL COMMENT '庄家',
  `opponent` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL COMMENT '对手',
  `play` int(2) NULL DEFAULT NULL COMMENT '出的是什么 1=剪刀 2=石头 3=布',
  `type` int(2) NULL DEFAULT NULL COMMENT '0=点券 其他为材料代码',
  `number` int(11) NULL DEFAULT NULL COMMENT '奖励数量',
  `winner` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL COMMENT '赢的人',
  `rewardStage` int(2) NULL DEFAULT 0 COMMENT '0=未领奖 1=已领奖',
  `date` datetime NULL DEFAULT NULL COMMENT '时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zdata_damageskin
-- ----------------------------
DROP TABLE IF EXISTS `zdata_damageskin`;
CREATE TABLE `zdata_damageskin`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `itemid` int(10) UNSIGNED NOT NULL COMMENT '伤害皮肤道具ID',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uniq_itemid`(`itemid` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci COMMENT = '伤害皮肤数据表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zdata_drop
-- ----------------------------
DROP TABLE IF EXISTS `zdata_drop`;
CREATE TABLE `zdata_drop`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `dropperid` int(11) NOT NULL,
  `itemid` int(11) NOT NULL DEFAULT 0,
  `chance` int(11) NOT NULL DEFAULT 0,
  `questid` int(11) NOT NULL DEFAULT 0,
  `minimum` mediumint(9) NOT NULL DEFAULT 1,
  `maximum` mediumint(9) NOT NULL DEFAULT 1,
  `period` int(11) NOT NULL DEFAULT 0 COMMENT '道具期限（天）',
  `in_level_range` tinyint(1) NOT NULL DEFAULT 0 COMMENT '角色等级和怪物相差不超过20级',
  `drop_buff_rate` int(11) NOT NULL DEFAULT 100 COMMENT '应用爆率加成百分比(0-100)。0=不应用爆率加成',
  `itemname` varchar(50) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL DEFAULT '',
  `individual` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否独立掉落',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `mobid`(`dropperid` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for zlog_ban
-- ----------------------------
DROP TABLE IF EXISTS `zlog_ban`;
CREATE TABLE `zlog_ban`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_name` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `reason` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zlog_command
-- ----------------------------
DROP TABLE IF EXISTS `zlog_command`;
CREATE TABLE `zlog_command`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `character_id` int(11) NULL DEFAULT 0,
  `command` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT '',
  `date` datetime NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 195 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zlog_item_operate
-- ----------------------------
DROP TABLE IF EXISTS `zlog_item_operate`;
CREATE TABLE `zlog_item_operate`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `entity_id` bigint(20) NULL DEFAULT NULL,
  `target_id` bigint(20) NULL DEFAULT NULL,
  `item_id` int(11) NULL DEFAULT NULL,
  `type` tinyint(4) NULL DEFAULT NULL,
  `state` tinyint(4) NULL DEFAULT NULL,
  `operator_id` int(11) NULL DEFAULT NULL,
  `quantity` int(11) NULL DEFAULT NULL,
  `log` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT '',
  `date` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3164 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zlog_like_point
-- ----------------------------
DROP TABLE IF EXISTS `zlog_like_point`;
CREATE TABLE `zlog_like_point`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `character_id` int(11) NOT NULL,
  `target_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zlog_login
-- ----------------------------
DROP TABLE IF EXISTS `zlog_login`;
CREATE TABLE `zlog_login`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `ip` varchar(17) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `mac` varchar(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `account_id`(`account_id` ASC) USING BTREE,
  INDEX `ip`(`ip` ASC) USING BTREE,
  INDEX `mac`(`mac` ASC) USING BTREE,
  INDEX `account_id_2`(`account_id` ASC) USING BTREE,
  INDEX `ip_2`(`ip` ASC) USING BTREE,
  INDEX `mac_2`(`mac` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 54 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zlog_player_chat
-- ----------------------------
DROP TABLE IF EXISTS `zlog_player_chat`;
CREATE TABLE `zlog_player_chat`  (
  `from` varchar(16) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `to` varchar(16) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `type` tinyint(4) NULL DEFAULT NULL,
  `channel` tinyint(4) NULL DEFAULT NULL,
  `field_id` int(11) NULL DEFAULT NULL,
  `text` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `date` datetime NULL DEFAULT current_timestamp()
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zlog_popularity
-- ----------------------------
DROP TABLE IF EXISTS `zlog_popularity`;
CREATE TABLE `zlog_popularity`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `character_id` int(11) NOT NULL,
  `target_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `character_id`(`character_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zlog_trade
-- ----------------------------
DROP TABLE IF EXISTS `zlog_trade`;
CREATE TABLE `zlog_trade`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `from` int(11) NOT NULL,
  `to` int(11) NOT NULL,
  `entity_id` bigint(20) NOT NULL,
  `item_id` bigint(20) NOT NULL,
  `quantity` bigint(20) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zrank_dojang
-- ----------------------------
DROP TABLE IF EXISTS `zrank_dojang`;
CREATE TABLE `zrank_dojang`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `world` int(11) NOT NULL,
  `characters_id` int(11) NOT NULL,
  `characters_name` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `level` int(11) NOT NULL,
  `job` int(11) NOT NULL,
  `job_group` int(11) NOT NULL DEFAULT 0,
  `stage` int(11) NOT NULL,
  `time` int(11) NOT NULL,
  `limit` int(11) NULL DEFAULT NULL,
  `logtime` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `cid`(`characters_id`) USING BTREE,
  INDEX `time`(`logtime`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zrank_lobby
-- ----------------------------
DROP TABLE IF EXISTS `zrank_lobby`;
CREATE TABLE `zrank_lobby`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `world` int(11) NULL DEFAULT NULL,
  `characters_id` int(11) NULL DEFAULT NULL,
  `characters_name` varchar(13) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `stage` int(11) NULL DEFAULT NULL,
  `time` int(11) NULL DEFAULT NULL,
  `logtime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `characters_id`(`characters_id` ASC) USING BTREE,
  CONSTRAINT `zrank_lobby_ibfk_1` FOREIGN KEY (`characters_id`) REFERENCES `characters` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for zsf_cat_vs_dog
-- ----------------------------
DROP TABLE IF EXISTS `zsf_cat_vs_dog`;
CREATE TABLE `zsf_cat_vs_dog`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player_id` int(11) NOT NULL,
  `player_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL,
  `account_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `result` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `state` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL,
  `dice_number` int(11) NULL DEFAULT NULL,
  `dice_type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `dice_size` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zsf_cat_vs_dog_result
-- ----------------------------
DROP TABLE IF EXISTS `zsf_cat_vs_dog_result`;
CREATE TABLE `zsf_cat_vs_dog_result`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state` int(11) NOT NULL,
  `result` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL,
  `cat1` int(11) NULL DEFAULT NULL,
  `cat2` int(11) NOT NULL,
  `cat3` int(11) NULL DEFAULT NULL,
  `dog1` int(11) NULL DEFAULT NULL,
  `dog2` int(11) NULL DEFAULT NULL,
  `dog3` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `dice_number` int(11) NULL DEFAULT NULL,
  `dice_type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `dice_size` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zsf_collect
-- ----------------------------
DROP TABLE IF EXISTS `zsf_collect`;
CREATE TABLE `zsf_collect`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `charid` int(11) NOT NULL,
  `charname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL,
  `item` int(11) NOT NULL,
  `itemname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL,
  `points` int(11) NOT NULL,
  `lasttime` timestamp NOT NULL DEFAULT current_timestamp(),
  `point` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8224 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zsf_dojang_best
-- ----------------------------
DROP TABLE IF EXISTS `zsf_dojang_best`;
CREATE TABLE `zsf_dojang_best`  (
  `c_id` int(11) NOT NULL,
  `month` int(11) NOT NULL,
  `dFloor` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `dTime` int(11) NULL DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1096 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zsf_fish_offline
-- ----------------------------
DROP TABLE IF EXISTS `zsf_fish_offline`;
CREATE TABLE `zsf_fish_offline`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accountId` int(11) NOT NULL,
  `startTime` datetime NULL DEFAULT current_timestamp(),
  `endTime` datetime NULL DEFAULT NULL,
  `readEndTime` datetime NULL DEFAULT NULL,
  `hours` int(11) NULL DEFAULT NULL,
  `itemId` int(11) NOT NULL,
  `eFish` int(11) NULL DEFAULT NULL,
  `rFish` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `itemId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6683 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zsf_game
-- ----------------------------
DROP TABLE IF EXISTS `zsf_game`;
CREATE TABLE `zsf_game`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `game` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `c_id` int(11) NULL DEFAULT NULL,
  `create_time` datetime NULL DEFAULT current_timestamp(),
  `point` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zsf_huishou
-- ----------------------------
DROP TABLE IF EXISTS `zsf_huishou`;
CREATE TABLE `zsf_huishou`  (
  `id` int(11) NULL DEFAULT NULL,
  `item` int(11) NULL DEFAULT NULL,
  `count` int(11) NULL DEFAULT NULL,
  `sum` int(11) NULL DEFAULT NULL,
  `saled` int(11) NULL DEFAULT NULL,
  `type` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `flg` int(11) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zsf_lottery_records
-- ----------------------------
DROP TABLE IF EXISTS `zsf_lottery_records`;
CREATE TABLE `zsf_lottery_records`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `playerId` int(11) NULL DEFAULT NULL,
  `accountId` int(11) NULL DEFAULT NULL,
  `playerName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `amount` int(11) NULL DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 259162 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zsf_pay_detail
-- ----------------------------
DROP TABLE IF EXISTS `zsf_pay_detail`;
CREATE TABLE `zsf_pay_detail`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `player_id` int(11) NULL DEFAULT NULL,
  `account_id` int(11) NULL DEFAULT NULL,
  `pay_type` int(11) NULL DEFAULT NULL,
  `amount` bigint(20) NULL DEFAULT NULL,
  `reason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `reason_detail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14767 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zsf_rank_reward
-- ----------------------------
DROP TABLE IF EXISTS `zsf_rank_reward`;
CREATE TABLE `zsf_rank_reward`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `playerId` int(11) NULL DEFAULT NULL,
  `rank` int(11) NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '1',
  `check` int(11) NULL DEFAULT NULL,
  `time` datetime NULL DEFAULT current_timestamp(),
  `getTime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4423 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zsf_robot
-- ----------------------------
DROP TABLE IF EXISTS `zsf_robot`;
CREATE TABLE `zsf_robot`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `qq` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL,
  `time` datetime NULL DEFAULT current_timestamp(),
  `status` int(11) NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `rank` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1461 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zsf_robot_bind
-- ----------------------------
DROP TABLE IF EXISTS `zsf_robot_bind`;
CREATE TABLE `zsf_robot_bind`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `account_id` int(11) NULL DEFAULT NULL,
  `player_id` int(11) NULL DEFAULT NULL,
  `player_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `status` int(11) NULL DEFAULT 0,
  `qq` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 123 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zsf_skill_loading
-- ----------------------------
DROP TABLE IF EXISTS `zsf_skill_loading`;
CREATE TABLE `zsf_skill_loading`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `character_id` int(11) NULL DEFAULT NULL,
  `item_id` int(11) NULL DEFAULT NULL,
  `skill` int(11) NULL DEFAULT NULL,
  `level` int(11) NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 151 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zsf_skill_loading_bak
-- ----------------------------
DROP TABLE IF EXISTS `zsf_skill_loading_bak`;
CREATE TABLE `zsf_skill_loading_bak`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `character_id` int(11) NULL DEFAULT NULL,
  `item_id` int(11) NULL DEFAULT NULL,
  `skill` int(11) NULL DEFAULT NULL,
  `level` int(11) NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 70 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zsf_star_upgrade
-- ----------------------------
DROP TABLE IF EXISTS `zsf_star_upgrade`;
CREATE TABLE `zsf_star_upgrade`  (
  `id` bigint(20) NOT NULL,
  `fail_times` int(11) NULL DEFAULT NULL,
  `success_times` int(11) NULL DEFAULT NULL,
  `all_fail_times` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zsf_vip
-- ----------------------------
DROP TABLE IF EXISTS `zsf_vip`;
CREATE TABLE `zsf_vip`  (
  `account_id` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  PRIMARY KEY (`account_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zsf_輪迴體驗卡
-- ----------------------------
DROP TABLE IF EXISTS `zsf_輪迴體驗卡`;
CREATE TABLE `zsf_輪迴體驗卡`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NULL DEFAULT NULL,
  `create_time` datetime NULL DEFAULT current_timestamp(),
  `end_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zsf_膜拜大佬突破
-- ----------------------------
DROP TABLE IF EXISTS `zsf_膜拜大佬突破`;
CREATE TABLE `zsf_膜拜大佬突破`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lb` int(11) NULL DEFAULT NULL,
  `player_id` int(11) NULL DEFAULT NULL,
  `boss_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `time` datetime NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1488 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zsf_暖暖申請表
-- ----------------------------
DROP TABLE IF EXISTS `zsf_暖暖申請表`;
CREATE TABLE `zsf_暖暖申請表`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) NULL DEFAULT NULL,
  `status` int(11) NULL DEFAULT NULL,
  `item_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `create_time` datetime NULL DEFAULT current_timestamp(),
  `update_time` datetime NULL DEFAULT NULL,
  `player_id` int(11) NULL DEFAULT NULL,
  `player_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 339 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zsf_武功洗鍊存檔
-- ----------------------------
DROP TABLE IF EXISTS `zsf_武功洗鍊存檔`;
CREATE TABLE `zsf_武功洗鍊存檔`  (
  `id` bigint(20) NULL DEFAULT NULL,
  `option` int(11) NULL DEFAULT NULL,
  `newOption` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `time` timestamp NULL DEFAULT current_timestamp(),
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zsf_主線任務
-- ----------------------------
DROP TABLE IF EXISTS `zsf_主線任務`;
CREATE TABLE `zsf_主線任務`  (
  `account_id` int(11) NOT NULL AUTO_INCREMENT,
  `player_id` int(11) NOT NULL DEFAULT 0,
  `quest_id` int(11) NOT NULL DEFAULT 0,
  `time` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`account_id`, `quest_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 271 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_arcexprecord
-- ----------------------------
DROP TABLE IF EXISTS `zz_arcexprecord`;
CREATE TABLE `zz_arcexprecord`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sn` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `itemid1` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `itemid2` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `itemid3` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_attributerecord
-- ----------------------------
DROP TABLE IF EXISTS `zz_attributerecord`;
CREATE TABLE `zz_attributerecord`  (
  `sn` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `count` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_backpack
-- ----------------------------
DROP TABLE IF EXISTS `zz_backpack`;
CREATE TABLE `zz_backpack`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `character_id` int(11) NULL DEFAULT NULL,
  `count` int(11) NULL DEFAULT NULL,
  `itemid` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_bind_mesos
-- ----------------------------
DROP TABLE IF EXISTS `zz_bind_mesos`;
CREATE TABLE `zz_bind_mesos`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player_id` int(11) NOT NULL,
  `amount` bigint(20) NOT NULL,
  `paytime` timestamp NOT NULL DEFAULT current_timestamp(),
  `remark` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_boss_event
-- ----------------------------
DROP TABLE IF EXISTS `zz_boss_event`;
CREATE TABLE `zz_boss_event`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `player_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL,
  `accounts_id` int(11) NOT NULL DEFAULT 0,
  `player_id` int(11) NULL DEFAULT NULL,
  `finalTime` double(11, 0) NOT NULL DEFAULT 0,
  `bossName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NOT NULL,
  `time` timestamp NULL DEFAULT current_timestamp(),
  `mode` int(11) NULL DEFAULT NULL,
  `memo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  `percent` int(11) NULL DEFAULT NULL,
  `status` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21283 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_dojang
-- ----------------------------
DROP TABLE IF EXISTS `zz_dojang`;
CREATE TABLE `zz_dojang`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `character_id` int(11) NOT NULL,
  `floor` int(11) NOT NULL DEFAULT 0,
  `time` float NULL DEFAULT 0,
  `starttime` date NOT NULL DEFAULT '0000-00-00',
  `limitbreak` varchar(200) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `sn` varchar(200) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `worldid` int(11) NOT NULL DEFAULT 0,
  `job` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `jobtype` int(2) NULL DEFAULT NULL COMMENT '职业类型',
  `charactername` varchar(64) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_enter_event
-- ----------------------------
DROP TABLE IF EXISTS `zz_enter_event`;
CREATE TABLE `zz_enter_event`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `party_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `party_accountsid` int(11) NULL DEFAULT NULL,
  `date` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_equip_chance
-- ----------------------------
DROP TABLE IF EXISTS `zz_equip_chance`;
CREATE TABLE `zz_equip_chance`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sn` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `count` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_eventlog
-- ----------------------------
DROP TABLE IF EXISTS `zz_eventlog`;
CREATE TABLE `zz_eventlog`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NULL DEFAULT NULL,
  `event_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `value` int(11) NULL DEFAULT NULL,
  `reset_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_guilds
-- ----------------------------
DROP TABLE IF EXISTS `zz_guilds`;
CREATE TABLE `zz_guilds`  (
  `guilds_id` int(11) NOT NULL,
  `level` bigint(20) NULL DEFAULT 0,
  `point` int(11) NULL DEFAULT 0,
  `str` int(11) NULL DEFAULT 0,
  `dex` int(11) NULL DEFAULT 0,
  `int` bigint(20) NULL DEFAULT 0,
  `luk` bigint(20) NULL DEFAULT 0,
  `pad` bigint(20) NULL DEFAULT 0,
  `mad` bigint(20) NULL DEFAULT 0,
  `hp` bigint(20) NULL DEFAULT 0,
  `mp` bigint(20) NULL DEFAULT 0,
  PRIMARY KEY (`guilds_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_guilds_characters
-- ----------------------------
DROP TABLE IF EXISTS `zz_guilds_characters`;
CREATE TABLE `zz_guilds_characters`  (
  `characters_id` int(11) NOT NULL DEFAULT 0,
  `guilds_id` int(11) NOT NULL,
  `total_point` int(11) NULL DEFAULT 0,
  `point` int(11) NULL DEFAULT 0,
  `str` int(11) NULL DEFAULT 0,
  `dex` int(11) NULL DEFAULT 0,
  `int` bigint(20) NULL DEFAULT 0,
  `luk` bigint(20) NULL DEFAULT 0,
  `pad` bigint(20) NULL DEFAULT 0,
  `mad` bigint(20) NULL DEFAULT 0,
  `hp` bigint(20) NULL DEFAULT 0,
  `mp` bigint(20) NULL DEFAULT 0,
  PRIMARY KEY (`characters_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_inventoryitems_equip
-- ----------------------------
DROP TABLE IF EXISTS `zz_inventoryitems_equip`;
CREATE TABLE `zz_inventoryitems_equip`  (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sn` bigint(20) NOT NULL DEFAULT -1,
  `itemid` int(10) NOT NULL DEFAULT 0,
  `expiredate` bigint(20) NOT NULL DEFAULT 3439728000000,
  `title` varchar(13) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `ft_equipped` bigint(20) NOT NULL DEFAULT -2,
  `prevbonusexprate` int(11) NOT NULL DEFAULT -1,
  `nRUC` tinyint(4) NOT NULL DEFAULT 0,
  `nCUC` tinyint(4) NOT NULL DEFAULT 0,
  `str` smallint(6) NOT NULL DEFAULT 0,
  `dex` smallint(6) NOT NULL DEFAULT 0,
  `int` smallint(6) NOT NULL DEFAULT 0,
  `luk` smallint(6) NOT NULL DEFAULT 0,
  `maxhp` smallint(6) NOT NULL DEFAULT 0,
  `maxmp` smallint(6) NOT NULL DEFAULT 0,
  `pad` smallint(6) NOT NULL DEFAULT 0,
  `mad` smallint(6) NOT NULL DEFAULT 0,
  `pdd` smallint(6) NOT NULL DEFAULT 0,
  `craft` smallint(6) NOT NULL DEFAULT 0,
  `speed` smallint(6) NOT NULL DEFAULT 0,
  `jump` smallint(6) NOT NULL DEFAULT 0,
  `attribute` int(11) NOT NULL DEFAULT 0,
  `leveluptype` tinyint(4) NOT NULL DEFAULT 0,
  `incskill` int(11) NOT NULL DEFAULT 0,
  `elevel` tinyint(4) NOT NULL DEFAULT 0,
  `exp` bigint(20) NOT NULL DEFAULT 0,
  `durability` int(11) NOT NULL DEFAULT 0,
  `nIUC` int(11) NOT NULL DEFAULT 0,
  `pvpdamage` smallint(6) NOT NULL DEFAULT 0,
  `reducereq` tinyint(4) NOT NULL DEFAULT 0,
  `specialattribute` smallint(6) NOT NULL DEFAULT 0,
  `durabilitymax` int(11) NOT NULL DEFAULT 0,
  `increq` tinyint(4) NOT NULL DEFAULT 0,
  `growthenchant` tinyint(4) NOT NULL DEFAULT 0,
  `psenchant` tinyint(4) NOT NULL DEFAULT 0,
  `bdr` smallint(6) NOT NULL DEFAULT 0,
  `ipdr` smallint(6) NOT NULL DEFAULT 0,
  `damr` smallint(6) NOT NULL DEFAULT 0,
  `statr` smallint(6) NOT NULL DEFAULT 0,
  `cuttable` tinyint(4) NOT NULL DEFAULT -1,
  `exgradeoption` bigint(20) NOT NULL DEFAULT 0 COMMENT '火花相关',
  `itemstate` int(11) NOT NULL DEFAULT 0,
  `ft_expiredate` bigint(20) NOT NULL DEFAULT -2,
  `csgrade` tinyint(4) NOT NULL DEFAULT 0,
  `anoption1` int(11) NOT NULL DEFAULT 0,
  `anoption2` int(11) NOT NULL DEFAULT 0,
  `anoption3` int(11) NOT NULL DEFAULT 0,
  `grade` tinyint(4) NOT NULL DEFAULT 0,
  `nCHUC` tinyint(4) NOT NULL DEFAULT 0,
  `option1` int(11) NOT NULL DEFAULT 0,
  `option2` int(11) NOT NULL DEFAULT 0,
  `option3` int(11) NOT NULL DEFAULT 0,
  `option4` int(11) NOT NULL DEFAULT 0,
  `option5` int(11) NOT NULL DEFAULT 0,
  `option6` int(11) NOT NULL DEFAULT 0,
  `itemskin` int(11) NOT NULL DEFAULT 0,
  `socket1` int(11) NOT NULL DEFAULT -1,
  `socket2` int(11) NOT NULL DEFAULT -1,
  `socket3` int(11) NOT NULL DEFAULT -1,
  `mixcolor` int(11) NOT NULL DEFAULT 0,
  `souloption` smallint(255) NOT NULL DEFAULT 0,
  `soulsocketid` smallint(6) NOT NULL DEFAULT 0,
  `souloptionid` smallint(6) NOT NULL DEFAULT 0,
  `arc` int(11) NOT NULL DEFAULT 0,
  `arcexp` int(11) NOT NULL DEFAULT 0,
  `arclevel` int(11) NOT NULL DEFAULT 0,
  `aut` int(11) NOT NULL DEFAULT 0,
  `autexp` int(11) NOT NULL DEFAULT 0,
  `autlevel` int(11) NOT NULL DEFAULT 0,
  `limitBreak` bigint(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `sn`(`sn` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for zz_inventoryitems_equip_log
-- ----------------------------
DROP TABLE IF EXISTS `zz_inventoryitems_equip_log`;
CREATE TABLE `zz_inventoryitems_equip_log`  (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sn` bigint(20) NOT NULL DEFAULT -1,
  `itemid` int(10) NOT NULL DEFAULT 0,
  `expiredate` bigint(20) NOT NULL DEFAULT 3439728000000,
  `title` varchar(13) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `ft_equipped` bigint(20) NOT NULL DEFAULT -2,
  `prevbonusexprate` int(11) NOT NULL DEFAULT -1,
  `nRUC` tinyint(4) NOT NULL DEFAULT 0,
  `nCUC` tinyint(4) NOT NULL DEFAULT 0,
  `str` smallint(6) NOT NULL DEFAULT 0,
  `dex` smallint(6) NOT NULL DEFAULT 0,
  `int` smallint(6) NOT NULL DEFAULT 0,
  `luk` smallint(6) NOT NULL DEFAULT 0,
  `maxhp` smallint(6) NOT NULL DEFAULT 0,
  `maxmp` smallint(6) NOT NULL DEFAULT 0,
  `pad` smallint(6) NOT NULL DEFAULT 0,
  `mad` smallint(6) NOT NULL DEFAULT 0,
  `pdd` smallint(6) NOT NULL DEFAULT 0,
  `craft` smallint(6) NOT NULL DEFAULT 0,
  `speed` smallint(6) NOT NULL DEFAULT 0,
  `jump` smallint(6) NOT NULL DEFAULT 0,
  `attribute` int(11) NOT NULL DEFAULT 0,
  `leveluptype` tinyint(4) NOT NULL DEFAULT 0,
  `incskill` int(11) NOT NULL DEFAULT 0,
  `elevel` tinyint(4) NOT NULL DEFAULT 0,
  `exp` bigint(20) NOT NULL DEFAULT 0,
  `durability` int(11) NOT NULL DEFAULT 0,
  `nIUC` int(11) NOT NULL DEFAULT 0,
  `pvpdamage` smallint(6) NOT NULL DEFAULT 0,
  `reducereq` tinyint(4) NOT NULL DEFAULT 0,
  `specialattribute` smallint(6) NOT NULL DEFAULT 0,
  `durabilitymax` int(11) NOT NULL DEFAULT 0,
  `increq` tinyint(4) NOT NULL DEFAULT 0,
  `growthenchant` tinyint(4) NOT NULL DEFAULT 0,
  `psenchant` tinyint(4) NOT NULL DEFAULT 0,
  `bdr` smallint(6) NOT NULL DEFAULT 0,
  `ipdr` smallint(6) NOT NULL DEFAULT 0,
  `damr` smallint(6) NOT NULL DEFAULT 0,
  `statr` smallint(6) NOT NULL DEFAULT 0,
  `cuttable` tinyint(4) NOT NULL DEFAULT -1,
  `exgradeoption` bigint(20) NOT NULL DEFAULT 0 COMMENT '火花相关',
  `itemstate` int(11) NOT NULL DEFAULT 0,
  `ft_expiredate` bigint(20) NOT NULL DEFAULT -2,
  `csgrade` tinyint(4) NOT NULL DEFAULT 0,
  `anoption1` int(11) NOT NULL DEFAULT 0,
  `anoption2` int(11) NOT NULL DEFAULT 0,
  `anoption3` int(11) NOT NULL DEFAULT 0,
  `grade` tinyint(4) NOT NULL DEFAULT 0,
  `nCHUC` tinyint(4) NOT NULL DEFAULT 0,
  `option1` int(11) NOT NULL DEFAULT 0,
  `option2` int(11) NOT NULL DEFAULT 0,
  `option3` int(11) NOT NULL DEFAULT 0,
  `option4` int(11) NOT NULL DEFAULT 0,
  `option5` int(11) NOT NULL DEFAULT 0,
  `option6` int(11) NOT NULL DEFAULT 0,
  `itemskin` int(11) NOT NULL DEFAULT 0,
  `socket1` int(11) NOT NULL DEFAULT -1,
  `socket2` int(11) NOT NULL DEFAULT -1,
  `socket3` int(11) NOT NULL DEFAULT -1,
  `mixcolor` int(11) NOT NULL DEFAULT 0,
  `souloption` smallint(255) NOT NULL DEFAULT 0,
  `soulsocketid` smallint(6) NOT NULL DEFAULT 0,
  `souloptionid` smallint(6) NOT NULL DEFAULT 0,
  `arc` int(11) NOT NULL DEFAULT 0,
  `arcexp` int(11) NOT NULL DEFAULT 0,
  `arclevel` int(11) NOT NULL DEFAULT 0,
  `aut` int(11) NOT NULL DEFAULT 0,
  `autexp` int(11) NOT NULL DEFAULT 0,
  `autlevel` int(11) NOT NULL DEFAULT 0,
  `limitBreak` bigint(20) NOT NULL DEFAULT 0,
  `paytime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `sn`(`sn` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for zz_js_cl
-- ----------------------------
DROP TABLE IF EXISTS `zz_js_cl`;
CREATE TABLE `zz_js_cl`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `characters_id` int(11) NOT NULL,
  `type` int(1) NOT NULL,
  `meso` int(11) NOT NULL,
  `buy_id` int(11) NULL DEFAULT NULL,
  `sn` bigint(20) NOT NULL COMMENT '道具物品记录的ID',
  `itemid` int(11) NOT NULL,
  `number` int(11) NOT NULL DEFAULT 0,
  `paytime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `iid` bigint(20) NOT NULL,
  PRIMARY KEY (`id`, `sn`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = gb2312 COLLATE = gb2312_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_js_cl_history
-- ----------------------------
DROP TABLE IF EXISTS `zz_js_cl_history`;
CREATE TABLE `zz_js_cl_history`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `characters_id` int(11) NOT NULL,
  `type` int(1) NOT NULL,
  `meso` int(11) NOT NULL,
  `buy_id` int(11) NULL DEFAULT NULL,
  `sn` bigint(20) NOT NULL COMMENT '道具物品记录的ID',
  `itemid` int(11) NOT NULL,
  `number` int(11) NOT NULL DEFAULT 0,
  `paytime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `iid` bigint(20) NOT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  `status` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = gb2312 COLLATE = gb2312_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_js_inventoryitems_equip
-- ----------------------------
DROP TABLE IF EXISTS `zz_js_inventoryitems_equip`;
CREATE TABLE `zz_js_inventoryitems_equip`  (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sn` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL DEFAULT '-1',
  `itemid` int(10) NOT NULL DEFAULT 0,
  `expiredate` bigint(20) NOT NULL DEFAULT 3439728000000,
  `title` varchar(13) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL DEFAULT '',
  `ft_equipped` bigint(20) NOT NULL DEFAULT -2,
  `prevbonusexprate` int(11) NOT NULL DEFAULT -1,
  `nRUC` tinyint(4) NOT NULL DEFAULT 0,
  `nCUC` tinyint(4) NOT NULL DEFAULT 0,
  `str` smallint(6) NOT NULL DEFAULT 0,
  `dex` smallint(6) NOT NULL DEFAULT 0,
  `int` smallint(6) NOT NULL DEFAULT 0,
  `luk` smallint(6) NOT NULL DEFAULT 0,
  `maxhp` smallint(6) NOT NULL DEFAULT 0,
  `maxmp` smallint(6) NOT NULL DEFAULT 0,
  `pad` smallint(6) NOT NULL DEFAULT 0,
  `mad` smallint(6) NOT NULL DEFAULT 0,
  `pdd` smallint(6) NOT NULL DEFAULT 0,
  `craft` smallint(6) NOT NULL DEFAULT 0,
  `speed` smallint(6) NOT NULL DEFAULT 0,
  `jump` smallint(6) NOT NULL DEFAULT 0,
  `attribute` int(11) NOT NULL DEFAULT 0,
  `leveluptype` tinyint(4) NOT NULL DEFAULT 0,
  `incskill` int(11) NOT NULL DEFAULT 0,
  `elevel` tinyint(4) NOT NULL DEFAULT 0,
  `exp` bigint(20) NOT NULL DEFAULT 0,
  `durability` int(11) NOT NULL DEFAULT 0,
  `nIUC` int(11) NOT NULL DEFAULT 0,
  `pvpdamage` smallint(6) NOT NULL DEFAULT 0,
  `reducereq` tinyint(4) NOT NULL DEFAULT 0,
  `specialattribute` smallint(6) NOT NULL DEFAULT 0,
  `durabilitymax` int(11) NOT NULL DEFAULT 0,
  `increq` tinyint(4) NOT NULL DEFAULT 0,
  `growthenchant` tinyint(4) NOT NULL DEFAULT 0,
  `psenchant` tinyint(4) NOT NULL DEFAULT 0,
  `bdr` smallint(6) NOT NULL DEFAULT 0,
  `ipdr` smallint(6) NOT NULL DEFAULT 0,
  `damr` smallint(6) NOT NULL DEFAULT 0,
  `statr` smallint(6) NOT NULL DEFAULT 0,
  `cuttable` tinyint(4) NOT NULL DEFAULT -1,
  `exgradeoption` bigint(20) NOT NULL DEFAULT 0 COMMENT '火花相关',
  `itemstate` int(11) NOT NULL DEFAULT 0,
  `ft_expiredate` bigint(20) NOT NULL DEFAULT -2,
  `csgrade` tinyint(4) NOT NULL DEFAULT 0,
  `anoption1` int(11) NOT NULL DEFAULT 0,
  `anoption2` int(11) NOT NULL DEFAULT 0,
  `anoption3` int(11) NOT NULL DEFAULT 0,
  `grade` tinyint(4) NOT NULL DEFAULT 0,
  `nCHUC` tinyint(4) NOT NULL DEFAULT 0,
  `option1` int(11) NOT NULL DEFAULT 0,
  `option2` int(11) NOT NULL DEFAULT 0,
  `option3` int(11) NOT NULL DEFAULT 0,
  `option4` int(11) NOT NULL DEFAULT 0,
  `option5` int(11) NOT NULL DEFAULT 0,
  `option6` int(11) NOT NULL DEFAULT 0,
  `itemskin` int(11) NOT NULL DEFAULT 0,
  `socket1` int(11) NOT NULL DEFAULT -1,
  `socket2` int(11) NOT NULL DEFAULT -1,
  `socket3` int(11) NOT NULL DEFAULT -1,
  `mixcolor` int(11) NOT NULL DEFAULT 0,
  `souloption` smallint(255) NOT NULL DEFAULT 0,
  `soulsocketid` smallint(6) NOT NULL DEFAULT 0,
  `souloptionid` smallint(6) NOT NULL DEFAULT 0,
  `arc` int(11) NOT NULL DEFAULT 0,
  `arcexp` int(11) NOT NULL DEFAULT 0,
  `arclevel` int(11) NOT NULL DEFAULT 0,
  `limitBreak` bigint(20) NOT NULL DEFAULT 0,
  `iid` bigint(20) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `sn`(`sn` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_js_log
-- ----------------------------
DROP TABLE IF EXISTS `zz_js_log`;
CREATE TABLE `zz_js_log`  (
  `iid` bigint(20) NOT NULL AUTO_INCREMENT,
  `characters_id` int(11) NOT NULL,
  `meso` int(11) NOT NULL,
  `buy_id` int(11) NULL DEFAULT NULL,
  `paytime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `status` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `id` bigint(20) UNSIGNED NOT NULL,
  `world` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`iid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_js_yp
-- ----------------------------
DROP TABLE IF EXISTS `zz_js_yp`;
CREATE TABLE `zz_js_yp`  (
  `iid` int(11) NOT NULL AUTO_INCREMENT,
  `characters_id` int(11) NOT NULL,
  `type` bigint(11) NOT NULL,
  `sn` bigint(20) NOT NULL DEFAULT -1,
  `itemid` int(11) NULL DEFAULT NULL,
  `number` int(11) NOT NULL,
  `paytime` datetime NOT NULL,
  `meso` bigint(20) NULL DEFAULT 0,
  `buy_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`iid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_js_yp_history
-- ----------------------------
DROP TABLE IF EXISTS `zz_js_yp_history`;
CREATE TABLE `zz_js_yp_history`  (
  `iid` int(11) NOT NULL,
  `characters_id` int(11) NOT NULL,
  `type` bigint(11) NOT NULL DEFAULT -1,
  `sn` bigint(20) NOT NULL DEFAULT -1,
  `itemid` int(11) NULL DEFAULT NULL,
  `number` int(11) NOT NULL,
  `paytime` datetime NOT NULL,
  `remark` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `meso` bigint(20) NULL DEFAULT 0,
  `status` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `buy_id` int(11) NOT NULL,
  PRIMARY KEY (`iid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_pass
-- ----------------------------
DROP TABLE IF EXISTS `zz_pass`;
CREATE TABLE `zz_pass`  (
  `characters_id` int(11) NULL DEFAULT NULL,
  `describe` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `point` int(11) NULL DEFAULT NULL,
  `season` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `create_time` datetime NULL DEFAULT current_timestamp()
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_pass_lock
-- ----------------------------
DROP TABLE IF EXISTS `zz_pass_lock`;
CREATE TABLE `zz_pass_lock`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `characters_id` int(11) NULL DEFAULT NULL,
  `season` int(11) NULL DEFAULT NULL,
  `account_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `characters_id`(`characters_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 173 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_pass_month
-- ----------------------------
DROP TABLE IF EXISTS `zz_pass_month`;
CREATE TABLE `zz_pass_month`  (
  `characters_id` int(11) NULL DEFAULT NULL,
  `describe` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `point` int(11) NULL DEFAULT NULL,
  `season` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `create_time` datetime NULL DEFAULT current_timestamp()
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_pass_month_lock
-- ----------------------------
DROP TABLE IF EXISTS `zz_pass_month_lock`;
CREATE TABLE `zz_pass_month_lock`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `characters_id` int(11) NULL DEFAULT NULL,
  `season` int(11) NULL DEFAULT NULL,
  `account_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `characters_id`(`characters_id` ASC) USING BTREE,
  CONSTRAINT `zz_pass_month_lock_ibfk_1` FOREIGN KEY (`characters_id`) REFERENCES `characters` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_pass_month_reward
-- ----------------------------
DROP TABLE IF EXISTS `zz_pass_month_reward`;
CREATE TABLE `zz_pass_month_reward`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NULL DEFAULT NULL,
  `characters_id` int(11) NULL DEFAULT NULL,
  `season` int(11) NULL DEFAULT NULL,
  `level` int(11) NULL DEFAULT NULL,
  `value` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `characters_id`(`characters_id` ASC) USING BTREE,
  CONSTRAINT `zz_pass_month_reward_ibfk_1` FOREIGN KEY (`characters_id`) REFERENCES `characters` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_pass_month_vip
-- ----------------------------
DROP TABLE IF EXISTS `zz_pass_month_vip`;
CREATE TABLE `zz_pass_month_vip`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `characters_id` int(11) NULL DEFAULT NULL,
  `season` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `characters_id`(`characters_id` ASC) USING BTREE,
  CONSTRAINT `zz_pass_month_vip_ibfk_1` FOREIGN KEY (`characters_id`) REFERENCES `characters` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_pass_reward
-- ----------------------------
DROP TABLE IF EXISTS `zz_pass_reward`;
CREATE TABLE `zz_pass_reward`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `characters_id` int(11) NULL DEFAULT NULL,
  `season` int(11) NULL DEFAULT NULL,
  `level` int(11) NULL DEFAULT NULL,
  `value` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `characters_id`(`characters_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 219 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_pass_vip
-- ----------------------------
DROP TABLE IF EXISTS `zz_pass_vip`;
CREATE TABLE `zz_pass_vip`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `characters_id` int(11) NULL DEFAULT NULL,
  `season` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `characters_id`(`characters_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_pqlog
-- ----------------------------
DROP TABLE IF EXISTS `zz_pqlog`;
CREATE TABLE `zz_pqlog`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `characters_id` int(11) NULL DEFAULT NULL,
  `event_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `value` int(11) NULL DEFAULT NULL,
  `reset_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_rmb
-- ----------------------------
DROP TABLE IF EXISTS `zz_rmb`;
CREATE TABLE `zz_rmb`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL,
  `rmb` double(11, 2) NOT NULL,
  `paytime` timestamp NOT NULL DEFAULT current_timestamp(),
  `remark` varchar(200) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1135 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_rmb_vip
-- ----------------------------
DROP TABLE IF EXISTS `zz_rmb_vip`;
CREATE TABLE `zz_rmb_vip`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL,
  `rmb` double(11, 2) NOT NULL,
  `paytime` timestamp NOT NULL DEFAULT current_timestamp(),
  `remark` varchar(200) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_store
-- ----------------------------
DROP TABLE IF EXISTS `zz_store`;
CREATE TABLE `zz_store`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `player_id` bigint(20) NOT NULL DEFAULT 0,
  `ItemId` int(20) NOT NULL DEFAULT 0,
  `number` int(20) NOT NULL DEFAULT 0,
  `ItemName` varchar(30) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL,
  `time` timestamp NULL DEFAULT current_timestamp() ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_totalscore
-- ----------------------------
DROP TABLE IF EXISTS `zz_totalscore`;
CREATE TABLE `zz_totalscore`  (
  `characterid` int(11) NOT NULL DEFAULT 0,
  `name` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `jobname` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL,
  `worldid` int(11) NOT NULL DEFAULT 0,
  `帽子` int(11) NOT NULL DEFAULT 0,
  `id帽子` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `前额` int(11) NOT NULL DEFAULT 0,
  `id前额` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `脸饰` int(11) NOT NULL DEFAULT 0,
  `id脸饰` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `耳饰` int(11) NOT NULL DEFAULT 0,
  `id耳饰` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `衣服` int(11) NOT NULL DEFAULT 0,
  `id衣服` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `短裤` int(11) NOT NULL DEFAULT 0,
  `id短裤` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `鞋子` int(11) NOT NULL DEFAULT 0,
  `id鞋子` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `手套` int(11) NOT NULL DEFAULT 0,
  `id手套` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `披风` int(11) NOT NULL DEFAULT 0,
  `id披风` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `腰带` int(11) NOT NULL DEFAULT 0,
  `id腰带` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `肩部` int(11) NOT NULL DEFAULT 0,
  `id肩部` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `符号` int(11) NOT NULL DEFAULT 0,
  `id符号` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `徽章` int(11) NOT NULL DEFAULT 0,
  `id徽章` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `奖牌` int(11) NOT NULL DEFAULT 0,
  `id奖牌` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `吊坠1` int(11) NOT NULL DEFAULT 0,
  `id吊坠1` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `吊坠2` int(11) NOT NULL DEFAULT 0,
  `id吊坠2` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `副手` int(11) NOT NULL DEFAULT 0,
  `id副手` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `武器` int(11) NOT NULL DEFAULT 0,
  `id武器` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `戒指1` int(11) NOT NULL DEFAULT 0,
  `id戒指1` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `戒指2` int(11) NOT NULL DEFAULT 0,
  `id戒指2` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `戒指3` int(11) NOT NULL DEFAULT 0,
  `id戒指3` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `戒指4` int(11) NOT NULL DEFAULT 0,
  `id戒指4` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `戒指5` int(11) NOT NULL DEFAULT 0,
  `id戒指5` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `戒指6` int(11) NOT NULL DEFAULT 0,
  `id戒指6` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `口袋` int(11) NOT NULL DEFAULT 0,
  `id口袋` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `机器` int(11) NOT NULL DEFAULT 0,
  `id机器` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `心脏` int(11) NOT NULL DEFAULT 0,
  `id心脏` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `图腾1` int(11) NOT NULL DEFAULT 0,
  `id图腾1` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `图腾2` int(11) NOT NULL DEFAULT 0,
  `id图腾2` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `图腾3` int(11) NOT NULL DEFAULT 0,
  `id图腾3` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `神秘1` int(11) NOT NULL DEFAULT 0,
  `id神秘1` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `神秘2` int(11) NOT NULL DEFAULT 0,
  `id神秘2` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `神秘3` int(11) NOT NULL DEFAULT 0,
  `id神秘3` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `神秘4` int(11) NOT NULL DEFAULT 0,
  `id神秘4` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `神秘5` int(11) NOT NULL DEFAULT 0,
  `id神秘5` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `神秘6` int(11) NOT NULL DEFAULT 0,
  `id神秘6` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '0' COMMENT '道具物品记录的ID',
  `总评分` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`characterid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_xr_event
-- ----------------------------
DROP TABLE IF EXISTS `zz_xr_event`;
CREATE TABLE `zz_xr_event`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `accounts_id` int(11) NOT NULL DEFAULT 0,
  `world` int(11) NOT NULL DEFAULT 0,
  `event` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `value` int(11) NOT NULL DEFAULT 0,
  `time` timestamp NULL DEFAULT current_timestamp(),
  `player_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 424671 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_xr_event_copy1
-- ----------------------------
DROP TABLE IF EXISTS `zz_xr_event_copy1`;
CREATE TABLE `zz_xr_event_copy1`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `accounts_id` int(11) NOT NULL DEFAULT 0,
  `world` int(11) NOT NULL DEFAULT 0,
  `event` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `value` int(11) NOT NULL DEFAULT 0,
  `time` timestamp NULL DEFAULT current_timestamp(),
  `player_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 424671 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_xr_event_ys
-- ----------------------------
DROP TABLE IF EXISTS `zz_xr_event_ys`;
CREATE TABLE `zz_xr_event_ys`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `accounts_id` int(11) NOT NULL DEFAULT 0,
  `world` int(11) NOT NULL DEFAULT 0,
  `event` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NOT NULL DEFAULT '',
  `value` int(11) NOT NULL DEFAULT 0,
  `time` timestamp NULL DEFAULT current_timestamp(),
  `account` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_uca1400_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `1`(`accounts_id`, `event`) USING HASH
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zz_時裝清洗表
-- ----------------------------
DROP TABLE IF EXISTS `zz_時裝清洗表`;
CREATE TABLE `zz_時裝清洗表`  (
  `itemid` int(11) NOT NULL,
  `itemname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `typed` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`itemid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for 釣魚表_積分表
-- ----------------------------
DROP TABLE IF EXISTS `釣魚表_積分表`;
CREATE TABLE `釣魚表_積分表`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `character_id` int(11) NOT NULL,
  `point` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 94 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for 釣魚表_上交表
-- ----------------------------
DROP TABLE IF EXISTS `釣魚表_上交表`;
CREATE TABLE `釣魚表_上交表`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `characters_id` int(11) NOT NULL,
  `point` int(11) NOT NULL,
  `itemid` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `paytime` timestamp NOT NULL DEFAULT current_timestamp(),
  `vipLevel` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12367 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for 收藏_騎寵圖鑑表
-- ----------------------------
DROP TABLE IF EXISTS `收藏_騎寵圖鑑表`;
CREATE TABLE `收藏_騎寵圖鑑表`  (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `itemid` int(11) NULL DEFAULT NULL,
  `itemname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `level` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5377 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for 收藏_騎寵圖鑑表_收集
-- ----------------------------
DROP TABLE IF EXISTS `收藏_騎寵圖鑑表_收集`;
CREATE TABLE `收藏_騎寵圖鑑表_收集`  (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `itemid` int(11) NULL DEFAULT NULL,
  `accountid` int(11) NULL DEFAULT NULL,
  `paytime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 35213 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for 收藏_椅子圖鑑表
-- ----------------------------
DROP TABLE IF EXISTS `收藏_椅子圖鑑表`;
CREATE TABLE `收藏_椅子圖鑑表`  (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `itemid` int(11) NULL DEFAULT NULL,
  `itemname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `level` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT '',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5377 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for 收藏_椅子圖鑑表_收集
-- ----------------------------
DROP TABLE IF EXISTS `收藏_椅子圖鑑表_收集`;
CREATE TABLE `收藏_椅子圖鑑表_收集`  (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `itemid` int(11) NULL DEFAULT NULL,
  `accountid` int(11) NULL DEFAULT NULL,
  `paytime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for 新葷素
-- ----------------------------
DROP TABLE IF EXISTS `新葷素`;
CREATE TABLE `新葷素`  (
  `id` int(11) NULL DEFAULT NULL,
  `session_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `session_id` int(11) NOT NULL,
  `session_state` int(11) NOT NULL,
  `lucky_id` int(11) NULL DEFAULT NULL,
  `lottery_time` datetime NULL DEFAULT current_timestamp(),
  `player_id` int(11) NULL DEFAULT NULL,
  `player_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `award_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`session_id`, `session_state`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for 新葷素明細
-- ----------------------------
DROP TABLE IF EXISTS `新葷素明細`;
CREATE TABLE `新葷素明細`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player_id` int(11) NULL DEFAULT NULL,
  `account_id` int(11) NULL DEFAULT NULL,
  `session_id` int(11) NULL DEFAULT NULL,
  `session_state` int(11) NULL DEFAULT NULL,
  `player_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci NULL DEFAULT NULL,
  `ticket_id` int(11) NULL DEFAULT NULL,
  `quantity` int(11) NULL DEFAULT NULL,
  `reward_quantity` int(11) NULL DEFAULT NULL,
  `create_time` datetime NULL DEFAULT current_timestamp(),
  `update_time` datetime NULL DEFAULT NULL,
  `receive_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 37 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;

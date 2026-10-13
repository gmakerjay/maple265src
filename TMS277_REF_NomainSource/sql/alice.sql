/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MariaDB
 Source Server Version : 100339 (10.3.39-MariaDB-0ubuntu0.20.04.2)
 Source Host           : localhost:3306
 Source Schema         : metams

 Target Server Type    : MariaDB
 Target Server Version : 100339 (10.3.39-MariaDB-0ubuntu0.20.04.2)
 File Encoding         : 65001

 Date: 29/06/2025 04:12:26
*/

SET NAMES utf8mb4;
SET
FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account`
(
    `id`          int(11) NOT NULL AUTO_INCREMENT,
    `name`        varchar(30)  NOT NULL,
    `password`    varchar(128) NOT NULL,
    `spw`         varchar(128) NOT NULL,
    `salt`        varchar(32)           DEFAULT NULL,
    `gender`      tinyint(4) NOT NULL DEFAULT 10,
    `authority`   tinyint(4) NOT NULL DEFAULT 0,
    `login_stat`  tinyint(4) NOT NULL DEFAULT 0,
    `last_login`  datetime     NOT NULL DEFAULT current_timestamp(),
    `create_date` datetime     NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE KEY `name` (`name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for account_ban
-- ----------------------------
DROP TABLE IF EXISTS `account_ban`;
CREATE TABLE `account_ban`
(
    `account_id` int(11) NOT NULL,
    `ban_type`   tinyint(4) NOT NULL,
    `unban_date` datetime NOT NULL,
    PRIMARY KEY (`account_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for account_block
-- ----------------------------
DROP TABLE IF EXISTS `account_block`;
CREATE TABLE `account_block`
(
    `account_id`   int(11) NOT NULL,
    `block_type`   tinyint(4) DEFAULT NULL,
    `unblock_date` datetime DEFAULT NULL,
    PRIMARY KEY (`account_id`) USING BTREE,
    KEY            `account_id` (`account_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for account_cash
-- ----------------------------
DROP TABLE IF EXISTS `account_cash`;
CREATE TABLE `account_cash`
(
    `account_id` int(11) NOT NULL,
    `world_id`   int(11) NOT NULL DEFAULT 0,
    `cash`       int(11) NOT NULL DEFAULT 0,
    `balance`    int(11) NOT NULL DEFAULT 0,
    `point`      int(11) NOT NULL DEFAULT 0,
    PRIMARY KEY (`account_id`, `world_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for account_char_slot
-- ----------------------------
DROP TABLE IF EXISTS `account_char_slot`;
CREATE TABLE `account_char_slot`
(
    `account_id`     int(11) NOT NULL,
    `world_id`       int(11) NOT NULL,
    `slot_count`     int(11) NOT NULL DEFAULT 4,
    `buy_char_count` int(11) NOT NULL DEFAULT 0,
    PRIMARY KEY (`account_id`, `world_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for auction_collection
-- ----------------------------
DROP TABLE IF EXISTS `auction_collection`;
CREATE TABLE `auction_collection`
(
    `character_id` int(11) DEFAULT NULL,
    `auction_id`   int(11) DEFAULT NULL,
    KEY            `charcter_id` (`character_id`),
    KEY            `charcter_id_2` (`character_id`,`auction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for auction_info
-- ----------------------------
DROP TABLE IF EXISTS `auction_info`;
CREATE TABLE `auction_info`
(
    `id`             int(11) NOT NULL AUTO_INCREMENT,
    `world_id`       int(11) NOT NULL DEFAULT 0,
    `account_id`     int(11) NOT NULL DEFAULT 0,
    `seller_id`      int(11) NOT NULL DEFAULT 0,
    `seller`         varchar(20) NOT NULL DEFAULT '',
    `buyer_id`       int(11) NOT NULL DEFAULT 0,
    `buyer`          varchar(20) NOT NULL DEFAULT '',
    `type`           int(11) NOT NULL DEFAULT 0,
    `state`          int(11) NOT NULL DEFAULT 0,
    `price`          bigint(20) NOT NULL DEFAULT 0,
    `deposit`        bigint(20) NOT NULL DEFAULT 0,
    `expire_date`    datetime    NOT NULL DEFAULT '0000-00-00 00:00:00',
    `start_date`     datetime    NOT NULL DEFAULT '0000-00-00 00:00:00',
    `deal_date`      datetime    NOT NULL DEFAULT '0000-00-00 00:00:00',
    `item_id`        int(11) NOT NULL DEFAULT 0,
    `item_type`      tinyint(4) NOT NULL DEFAULT 0,
    `item_entity_id` bigint(20) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`) USING BTREE,
    KEY              `world` (`world_id`,`type`,`state`) USING BTREE,
    KEY              `world_2` (`world_id`,`state`,`seller_id`) USING BTREE,
    KEY              `world_3` (`world_id`,`type`,`state`,`item_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for auction_log
-- ----------------------------
DROP TABLE IF EXISTS `auction_log`;
CREATE TABLE `auction_log`
(
    `id`           bigint(20) NOT NULL AUTO_INCREMENT,
    `world_id`     int(11) NOT NULL,
    `account_id`   int(11) NOT NULL,
    `character_id` int(11) NOT NULL,
    `auction_id`   int(11) NOT NULL,
    `item_id`      int(11) NOT NULL,
    `state`        int(11) NOT NULL,
    `price`        bigint(20) NOT NULL,
    `date`         datetime NOT NULL,
    `deposit`      bigint(20) NOT NULL,
    `quantity`     int(11) NOT NULL,
    `type`         int(11) NOT NULL,
    PRIMARY KEY (`id`) USING BTREE,
    KEY            `character_id` (`character_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for ban_ip
-- ----------------------------
DROP TABLE IF EXISTS `ban_ip`;
CREATE TABLE `ban_ip`
(
    `id`         int(11) NOT NULL AUTO_INCREMENT,
    `ip`         varchar(17) NOT NULL,
    `unban_date` datetime    NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for ban_mac
-- ----------------------------
DROP TABLE IF EXISTS `ban_mac`;
CREATE TABLE `ban_mac`
(
    `id`         int(11) NOT NULL AUTO_INCREMENT,
    `mac`        varchar(18) NOT NULL,
    `unban_date` datetime    NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for cash_coupon
-- ----------------------------
DROP TABLE IF EXISTS `cash_coupon`;
CREATE TABLE `cash_coupon`
(
    `id`           int(11) NOT NULL AUTO_INCREMENT,
    `account_id`   int(11) DEFAULT NULL,
    `coupon`       varchar(16) DEFAULT NULL,
    `commodity_id` int(11) DEFAULT NULL,
    `used`         int(11) DEFAULT NULL,
    `start_date`   datetime    DEFAULT NULL,
    `end_date`     datetime    DEFAULT NULL,
    `used_date`    datetime    DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `coupon` (`coupon`) USING BTREE,
    KEY            `account_id` (`account_id`,`used`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for cash_gift_message
-- ----------------------------
DROP TABLE IF EXISTS `cash_gift_message`;
CREATE TABLE `cash_gift_message`
(
    `account_id` int(11) NOT NULL,
    `world_id`   int(11) NOT NULL,
    `read`       tinyint(4) NOT NULL,
    `sn`         bigint(20) NOT NULL,
    `item_id`    int(11) NOT NULL,
    `giver`      varchar(20) NOT NULL,
    `message`    varchar(80) NOT NULL,
    `pop`        tinyint(4) NOT NULL,
    KEY          `account_id` (`account_id`,`world_id`),
    KEY          `sn` (`sn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for cash_shopping_cart
-- ----------------------------
DROP TABLE IF EXISTS `cash_shopping_cart`;
CREATE TABLE `cash_shopping_cart`
(
    `character_id` int(11) NOT NULL,
    `commodity_id` int(11) DEFAULT NULL,
    KEY            `character_id` (`character_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for cash_vip
-- ----------------------------
DROP TABLE IF EXISTS `cash_vip`;
CREATE TABLE `cash_vip`
(
    `account_id` int(11) NOT NULL,
    `level`      int(11) DEFAULT NULL,
    `start_date` datetime DEFAULT NULL,
    PRIMARY KEY (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for cash_vip_consum
-- ----------------------------
DROP TABLE IF EXISTS `cash_vip_consum`;
CREATE TABLE `cash_vip_consum`
(
    `id`         bigint(20) NOT NULL AUTO_INCREMENT,
    `account_id` int(11) DEFAULT NULL,
    `point`      int(11) DEFAULT NULL,
    `info`       varchar(255) DEFAULT NULL,
    `date`       datetime     DEFAULT current_timestamp(),
    PRIMARY KEY (`id`),
    KEY          `account_id` (`account_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for cash_vip_point
-- ----------------------------
DROP TABLE IF EXISTS `cash_vip_point`;
CREATE TABLE `cash_vip_point`
(
    `id`          bigint(20) NOT NULL AUTO_INCREMENT,
    `account_id`  int(11) DEFAULT NULL,
    `type`        int(11) DEFAULT NULL,
    `amount`      int(11) DEFAULT NULL,
    `point`       int(11) DEFAULT NULL,
    `consum`      int(11) DEFAULT NULL,
    `info`        varchar(255) DEFAULT '',
    `date`        datetime     DEFAULT current_timestamp(),
    `expire_date` datetime     DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY           `account_id` (`account_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for character
-- ----------------------------
DROP TABLE IF EXISTS `character`;
CREATE TABLE `character`
(
    `id`         int(11) NOT NULL,
    `account_id` int(11) NOT NULL DEFAULT 0,
    `world_id`   int(11) NOT NULL DEFAULT 0,
    `del`        tinyint(1) NOT NULL DEFAULT 0,
    `idx`        tinyint(4) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`) USING BTREE,
    KEY          `account_id` (`account_id`) USING BTREE,
    CONSTRAINT `character_ibfk_1` FOREIGN KEY (`id`) REFERENCES `character_stat` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_auto_buff
-- ----------------------------
DROP TABLE IF EXISTS `character_auto_buff`;
CREATE TABLE `character_auto_buff`
(
    `character_id` int(11) NOT NULL,
    `skill_id`     int(11) NOT NULL DEFAULT 0,
    KEY            `character_id` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_burning
-- ----------------------------
DROP TABLE IF EXISTS `character_burning`;
CREATE TABLE `character_burning`
(
    `character_id` int(11) NOT NULL,
    `start_date`   datetime NOT NULL,
    `end_date`     datetime NOT NULL,
    `min_level`    int(11) NOT NULL,
    `max_level`    int(11) NOT NULL,
    `add_point`    int(11) NOT NULL,
    `type`         tinyint(4) NOT NULL,
    PRIMARY KEY (`character_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for character_chosen_skill
-- ----------------------------
DROP TABLE IF EXISTS `character_chosen_skill`;
CREATE TABLE `character_chosen_skill`
(
    `character_id` int(11) NOT NULL,
    `slot`         tinyint(4) NOT NULL DEFAULT 0,
    `skill_id`     int(11) NOT NULL DEFAULT 0,
    KEY            `character_id` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_damage_skin
-- ----------------------------
DROP TABLE IF EXISTS `character_damage_skin`;
CREATE TABLE `character_damage_skin`
(
    `character_id` int(11) NOT NULL,
    `damage_skin`  int(11) NOT NULL DEFAULT 0,
    `item_id`      int(11) NOT NULL DEFAULT 0,
    `type`         int(11) NOT NULL DEFAULT 0,
    KEY            `character_id` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_delete
-- ----------------------------
DROP TABLE IF EXISTS `character_delete`;
CREATE TABLE `character_delete`
(
    `character_id` int(11) NOT NULL,
    `confirm_date` datetime DEFAULT NULL,
    `del_time`     datetime DEFAULT NULL,
    PRIMARY KEY (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_dress_up
-- ----------------------------
DROP TABLE IF EXISTS `character_dress_up`;
CREATE TABLE `character_dress_up`
(
    `character_id` int(11) NOT NULL,
    `face`         int(11) NOT NULL DEFAULT 0,
    `hair`         int(11) NOT NULL DEFAULT 0,
    `long_coat`    int(11) NOT NULL DEFAULT 0,
    `skin`         tinyint(4) NOT NULL DEFAULT 0,
    `angel`        tinyint(4) NOT NULL DEFAULT 0,
    PRIMARY KEY (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_effect_off
-- ----------------------------
DROP TABLE IF EXISTS `character_effect_off`;
CREATE TABLE `character_effect_off`
(
    `character_id` int(11) NOT NULL,
    `effect_id`    int(11) NOT NULL,
    KEY            `character_effect_off_character_id_IDX` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_emoticon
-- ----------------------------
DROP TABLE IF EXISTS `character_emoticon`;
CREATE TABLE `character_emoticon`
(
    `character_id` int(11) NOT NULL,
    `emoticon_id`  int(11) NOT NULL,
    `collect_slot` smallint(6) NOT NULL,
    KEY            `character_id` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_emoticon_group
-- ----------------------------
DROP TABLE IF EXISTS `character_emoticon_group`;
CREATE TABLE `character_emoticon_group`
(
    `character_id` int(11) NOT NULL,
    `page`         smallint(6) NOT NULL,
    `group`        int(11) NOT NULL DEFAULT 0,
    KEY            `character_id` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_emoticon_macro
-- ----------------------------
DROP TABLE IF EXISTS `character_emoticon_macro`;
CREATE TABLE `character_emoticon_macro`
(
    `character_id` int(11) NOT NULL,
    `emoticon_id`  int(11) NOT NULL,
    `macro`        varchar(20) NOT NULL DEFAULT '',
    KEY            `character_id` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_familiar
-- ----------------------------
DROP TABLE IF EXISTS `character_familiar`;
CREATE TABLE `character_familiar`
(
    `id`           bigint(20) NOT NULL,
    `character_id` int(11) NOT NULL,
    `state`        int(11) NOT NULL DEFAULT 0,
    `familiar_id`  int(11) NOT NULL DEFAULT 0,
    `name`         varchar(13) NOT NULL DEFAULT '',
    `level`        smallint(6) NOT NULL DEFAULT 0,
    `skill_id`     smallint(6) NOT NULL DEFAULT 0,
    `exp`          smallint(6) NOT NULL DEFAULT 0,
    `potential1`   int(11) NOT NULL DEFAULT 0,
    `potential2`   int(11) NOT NULL DEFAULT 0,
    `potential3`   int(11) NOT NULL DEFAULT 0,
    `grade`        tinyint(4) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_familiar_table
-- ----------------------------
DROP TABLE IF EXISTS `character_familiar_table`;
CREATE TABLE `character_familiar_table`
(
    `character_id` int(11) NOT NULL,
    `table_idx`    smallint(6) NOT NULL DEFAULT 0,
    `potential1`   int(11) NOT NULL DEFAULT 0,
    `potential2`   int(11) NOT NULL DEFAULT 0,
    `potential3`   int(11) NOT NULL DEFAULT 0,
    PRIMARY KEY (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_func_key
-- ----------------------------
DROP TABLE IF EXISTS `character_func_key`;
CREATE TABLE `character_func_key`
(
    `character_id` int(11) NOT NULL,
    `page`         tinyint(4) NOT NULL,
    `key`          int(4) NOT NULL,
    `type`         tinyint(3) NOT NULL DEFAULT 0,
    `action`       int(11) NOT NULL DEFAULT 0,
    KEY            `character_id` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_hexa_skill
-- ----------------------------
DROP TABLE IF EXISTS `character_hexa_skill`;
CREATE TABLE `character_hexa_skill`
(
    `character_id` int(11) NOT NULL,
    `core_id`      int(11) NOT NULL,
    `level`        int(11) NOT NULL,
    `type`         int(11) NOT NULL,
    `value`        int(11) NOT NULL,
    KEY            `character_id` (`character_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for character_hexa_stat
-- ----------------------------
DROP TABLE IF EXISTS `character_hexa_stat`;
CREATE TABLE `character_hexa_stat`
(
    `character_id` int(11) NOT NULL,
    `core_id`      int(11) NOT NULL,
    `idx`          int(11) NOT NULL,
    `stat`         int(11) NOT NULL,
    `opt1_type`    int(11) NOT NULL,
    `opt1_level`   int(11) NOT NULL,
    `opt2_type`    int(11) NOT NULL,
    `opt2_level`   int(11) NOT NULL,
    `opt3_type`    int(11) NOT NULL,
    `opt3_level`   int(11) NOT NULL,
    KEY            `character_id` (`character_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for character_hexa_stat_select
-- ----------------------------
DROP TABLE IF EXISTS `character_hexa_stat_select`;
CREATE TABLE `character_hexa_stat_select`
(
    `character_id` int(11) NOT NULL,
    `core_id`      int(11) NOT NULL,
    `value`        int(11) NOT NULL,
    `select`       int(11) NOT NULL,
    KEY            `character_id` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for character_honor
-- ----------------------------
DROP TABLE IF EXISTS `character_honor`;
CREATE TABLE `character_honor`
(
    `character_id` int(11) NOT NULL,
    `honor`        int(11) NOT NULL,
    PRIMARY KEY (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_inv_size
-- ----------------------------
DROP TABLE IF EXISTS `character_inv_size`;
CREATE TABLE `character_inv_size`
(
    `character_id` int(11) NOT NULL,
    `equip`        int(11) NOT NULL DEFAULT 0,
    `consume`      int(11) NOT NULL DEFAULT 0,
    `install`      int(11) NOT NULL DEFAULT 0,
    `etc`          int(11) NOT NULL DEFAULT 0,
    `cash`         int(11) NOT NULL DEFAULT 0,
    `attire`       int(11) NOT NULL,
    PRIMARY KEY (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_like_point
-- ----------------------------
DROP TABLE IF EXISTS `character_like_point`;
CREATE TABLE `character_like_point`
(
    `character_id` int(11) NOT NULL,
    `like_point`   int(11) NOT NULL DEFAULT 0,
    PRIMARY KEY (`character_id`) USING BTREE,
    KEY            `character_id` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_mannequin
-- ----------------------------
DROP TABLE IF EXISTS `character_mannequin`;
CREATE TABLE `character_mannequin`
(
    `character_id` int(11) NOT NULL,
    `type`         tinyint(4) NOT NULL,
    `slot`         tinyint(4) NOT NULL DEFAULT 0,
    `angel`        tinyint(4) NOT NULL DEFAULT 0,
    `beauty_id`    int(11) NOT NULL,
    KEY            `character_id` (`character_id`,`type`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_map_transfer
-- ----------------------------
DROP TABLE IF EXISTS `character_map_transfer`;
CREATE TABLE `character_map_transfer`
(
    `character_id` int(11) NOT NULL,
    `type`         tinyint(4) NOT NULL,
    `field_id`     int(11) NOT NULL DEFAULT 999999999,
    KEY            `character_id` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_marriage_record
-- ----------------------------
DROP TABLE IF EXISTS `character_marriage_record`;
CREATE TABLE `character_marriage_record`
(
    `id`            int(11) NOT NULL AUTO_INCREMENT,
    `groom_id`      int(11) NOT NULL,
    `bride_id`      int(11) NOT NULL,
    `status`        smallint(6) NOT NULL,
    `groom_item_id` int(11) NOT NULL,
    `bride_item_id` int(11) NOT NULL,
    `groom_name`    varchar(13) NOT NULL DEFAULT '',
    `bride_name`    varchar(13) NOT NULL DEFAULT '',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_mob_collection
-- ----------------------------
DROP TABLE IF EXISTS `character_mob_collection`;
CREATE TABLE `character_mob_collection`
(
    `account_id` int(11) NOT NULL,
    `world_id`   int(11) NOT NULL DEFAULT 0,
    `record_id`  int(11) NOT NULL DEFAULT 0,
    `str_raw`    varchar(255) NOT NULL DEFAULT '',
    PRIMARY KEY (`account_id`, `world_id`, `record_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_money
-- ----------------------------
DROP TABLE IF EXISTS `character_money`;
CREATE TABLE `character_money`
(
    `character_id` int(11) NOT NULL,
    `money`        bigint(20) NOT NULL DEFAULT 0,
    PRIMARY KEY (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_potential_skill
-- ----------------------------
DROP TABLE IF EXISTS `character_potential_skill`;
CREATE TABLE `character_potential_skill`
(
    `character_id` int(11) NOT NULL DEFAULT 0,
    `page`         tinyint(4) NOT NULL DEFAULT 0,
    `pos`          tinyint(4) NOT NULL DEFAULT 0,
    `skill_id`     int(11) NOT NULL DEFAULT 0,
    `level`        tinyint(4) NOT NULL DEFAULT 0,
    `grade`        tinyint(4) NOT NULL DEFAULT 0,
    KEY            `character_id` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_potion_pot
-- ----------------------------
DROP TABLE IF EXISTS `character_potion_pot`;
CREATE TABLE `character_potion_pot`
(
    `character_id` int(11) NOT NULL DEFAULT 0,
    `item_id`      int(11) NOT NULL DEFAULT 0,
    `hp`           int(11) NOT NULL DEFAULT 0,
    `mp`           int(11) NOT NULL DEFAULT 0,
    `max_value`    int(11) NOT NULL DEFAULT 1000000,
    `start_time`   datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
    `end_time`     datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
    PRIMARY KEY (`character_id`) USING BTREE,
    KEY            `character_id` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for character_preset_record
-- ----------------------------
DROP TABLE IF EXISTS `character_preset_record`;
CREATE TABLE `character_preset_record`
(
    `character_id`    int(11) NOT NULL,
    `equip_page`      tinyint(4) NOT NULL DEFAULT 0,
    `potential_page`  tinyint(4) NOT NULL DEFAULT 0,
    `link_skill_page` tinyint(4) NOT NULL DEFAULT 0,
    PRIMARY KEY (`character_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for character_quest_complete
-- ----------------------------
DROP TABLE IF EXISTS `character_quest_complete`;
CREATE TABLE `character_quest_complete`
(
    `character_id`    int(11) NOT NULL,
    `quest_id`        int(11) NOT NULL,
    `completion_date` datetime NOT NULL,
    KEY               `character_id` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_quest_record
-- ----------------------------
DROP TABLE IF EXISTS `character_quest_record`;
CREATE TABLE `character_quest_record`
(
    `character_id` int(11) NOT NULL,
    `quest_id`     int(11) NOT NULL,
    `data`         varchar(50) NOT NULL DEFAULT '',
    KEY            `character_id` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_quest_record_expand
-- ----------------------------
DROP TABLE IF EXISTS `character_quest_record_expand`;
CREATE TABLE `character_quest_record_expand`
(
    `character_id` int(11) NOT NULL,
    `quest_id`     int(11) NOT NULL,
    `str_raw`      varchar(255) NOT NULL,
    UNIQUE KEY `unique_character_quest` (`character_id`,`quest_id`),
    KEY            `character_id` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_quick_slot
-- ----------------------------
DROP TABLE IF EXISTS `character_quick_slot`;
CREATE TABLE `character_quick_slot`
(
    `character_id` int(11) NOT NULL,
    `idx`          int(11) NOT NULL,
    `value`        int(11) NOT NULL DEFAULT 0,
    KEY            `character_id` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for character_ring_couple
-- ----------------------------
DROP TABLE IF EXISTS `character_ring_couple`;
CREATE TABLE `character_ring_couple`
(
    `character_id`      int(11) NOT NULL DEFAULT 0,
    `pair_character_id` int(11) NOT NULL DEFAULT 0,
    `pair_name`         varchar(13) NOT NULL DEFAULT '',
    `sn`                bigint(20) NOT NULL DEFAULT 0,
    `pair_sn`           bigint(20) NOT NULL DEFAULT 0,
    `msg`               varchar(30) NOT NULL DEFAULT '',
    `item_id`           int(11) NOT NULL DEFAULT 0,
    KEY                 `character_id` (`character_id`) USING BTREE,
    KEY                 `sn` (`sn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_ring_friend
-- ----------------------------
DROP TABLE IF EXISTS `character_ring_friend`;
CREATE TABLE `character_ring_friend`
(
    `character_id`      int(11) NOT NULL DEFAULT 0,
    `pair_character_id` int(11) NOT NULL DEFAULT 0,
    `pair_name`         varchar(13) NOT NULL DEFAULT '',
    `sn`                bigint(20) NOT NULL DEFAULT 0,
    `pair_sn`           bigint(20) NOT NULL DEFAULT 0,
    `item_id`           int(11) NOT NULL DEFAULT 0,
    KEY                 `character_id` (`character_id`) USING BTREE,
    KEY                 `sn` (`sn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_ring_marriage
-- ----------------------------
DROP TABLE IF EXISTS `character_ring_marriage`;
CREATE TABLE `character_ring_marriage`
(
    `character_id` int(11) NOT NULL DEFAULT 0,
    `marriage_id`  int(11) NOT NULL DEFAULT 0,
    PRIMARY KEY (`character_id`),
    KEY            `character_id` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_sail_boat
-- ----------------------------
DROP TABLE IF EXISTS `character_sail_boat`;
CREATE TABLE `character_sail_boat`
(
    `character_id` int(11) NOT NULL,
    `type`         tinyint(4) NOT NULL DEFAULT 0,
    `level`        int(11) NOT NULL DEFAULT 1,
    `energy`       int(11) NOT NULL DEFAULT 100,
    `exp`          int(11) NOT NULL DEFAULT 0,
    `reset_date`   datetime NOT NULL,
    PRIMARY KEY (`character_id`) USING BTREE,
    KEY            `character_id` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_sail_cargo
-- ----------------------------
DROP TABLE IF EXISTS `character_sail_cargo`;
CREATE TABLE `character_sail_cargo`
(
    `character_id` int(11) NOT NULL,
    `cargo_id`     int(11) NOT NULL,
    `count`        int(11) NOT NULL,
    `reset_date`   datetime NOT NULL,
    KEY            `character_id` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_skill_alarm
-- ----------------------------
DROP TABLE IF EXISTS `character_skill_alarm`;
CREATE TABLE `character_skill_alarm`
(
    `character_id` int(11) DEFAULT NULL,
    `skill_id`     int(11) DEFAULT NULL,
    `alarm`        tinyint(4) DEFAULT NULL,
    `sequence`     int(11) DEFAULT -1,
    KEY            `character_id` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_skill_cooldown
-- ----------------------------
DROP TABLE IF EXISTS `character_skill_cooldown`;
CREATE TABLE `character_skill_cooldown`
(
    `character_id`   int(11) NOT NULL,
    `skill_id`       int(11) NOT NULL,
    `remaining_time` int(11) NOT NULL,
    KEY              `character_id` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_skill_hyper_state
-- ----------------------------
DROP TABLE IF EXISTS `character_skill_hyper_state`;
CREATE TABLE `character_skill_hyper_state`
(
    `character_id` int(11) NOT NULL,
    `page`         tinyint(4) NOT NULL,
    `skill_id`     int(11) NOT NULL,
    `level`        int(11) NOT NULL,
    KEY            `chatacter_id` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_skill_hyper_state_page
-- ----------------------------
DROP TABLE IF EXISTS `character_skill_hyper_state_page`;
CREATE TABLE `character_skill_hyper_state_page`
(
    `character_id` int(11) NOT NULL,
    `page`         tinyint(4) NOT NULL DEFAULT 0,
    PRIMARY KEY (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_skill_link
-- ----------------------------
DROP TABLE IF EXISTS `character_skill_link`;
CREATE TABLE `character_skill_link`
(
    `character_id` int(11) NOT NULL,
    `skill_id`     int(11) NOT NULL,
    `level`        int(11) NOT NULL,
    PRIMARY KEY (`character_id`) USING BTREE,
    KEY            `character_id` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_skill_link_preset
-- ----------------------------
DROP TABLE IF EXISTS `character_skill_link_preset`;
CREATE TABLE `character_skill_link_preset`
(
    `character_id` int(11) DEFAULT NULL,
    `page`         tinyint(4) DEFAULT NULL,
    `skill_id`     int(11) DEFAULT NULL,
    KEY            `character_id` (`character_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_skill_macro
-- ----------------------------
DROP TABLE IF EXISTS `character_skill_macro`;
CREATE TABLE `character_skill_macro`
(
    `character_id` int(11) NOT NULL DEFAULT 0,
    `idx`          tinyint(1) NOT NULL DEFAULT 0,
    `name`         varchar(30) NOT NULL DEFAULT '',
    `mute`         tinyint(1) NOT NULL DEFAULT 0,
    `skill1`       int(11) NOT NULL DEFAULT 0,
    `skill2`       int(11) NOT NULL DEFAULT 0,
    `skill3`       int(11) NOT NULL DEFAULT 0,
    KEY            `characterid` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for character_skill_record
-- ----------------------------
DROP TABLE IF EXISTS `character_skill_record`;
CREATE TABLE `character_skill_record`
(
    `character_id` int(11) NOT NULL,
    `skill_id`     int(11) NOT NULL,
    `option`       int(11) NOT NULL,
    `expire_date`  datetime NOT NULL,
    `master_level` int(11) NOT NULL,
    KEY            `character_id` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_skill_sequence
-- ----------------------------
DROP TABLE IF EXISTS `character_skill_sequence`;
CREATE TABLE `character_skill_sequence`
(
    `character_id` int(11) NOT NULL COMMENT '角色ID',
    `idx`          int(11) NOT NULL COMMENT '序列索引',
    `name`         varchar(255) DEFAULT NULL COMMENT '序列名稱',
    `skills`       longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '技能ID陣列，以JSON格式儲存',
    PRIMARY KEY (`character_id`, `idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for character_soul_collection
-- ----------------------------
DROP TABLE IF EXISTS `character_soul_collection`;
CREATE TABLE `character_soul_collection`
(
    `character_id` int(11) NOT NULL,
    `page`         int(11) NOT NULL,
    `set_soul`     int(11) NOT NULL DEFAULT 0,
    PRIMARY KEY (`character_id`, `page`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_stat
-- ----------------------------
DROP TABLE IF EXISTS `character_stat`;
CREATE TABLE `character_stat`
(
    `id`                  int(11) NOT NULL AUTO_INCREMENT,
    `name`                varchar(15) NOT NULL,
    `gender`              tinyint(4) NOT NULL DEFAULT 0,
    `skin`                tinyint(4) NOT NULL DEFAULT 0,
    `face`                int(11) NOT NULL DEFAULT 0,
    `hair`                int(11) NOT NULL DEFAULT 0,
    `level`               int(11) NOT NULL DEFAULT 1,
    `job`                 smallint(6) NOT NULL DEFAULT 0,
    `pure_str`            smallint(6) NOT NULL DEFAULT 4,
    `pure_dex`            smallint(6) NOT NULL DEFAULT 4,
    `pure_int`            smallint(6) NOT NULL DEFAULT 4,
    `pure_luk`            smallint(6) NOT NULL DEFAULT 4,
    `hp`                  int(11) NOT NULL DEFAULT 50,
    `pure_max_hp`         int(11) NOT NULL DEFAULT 50,
    `hp_ap_used`          smallint(6) NOT NULL DEFAULT 0,
    `mp`                  int(11) NOT NULL DEFAULT 50,
    `pure_max_mp`         int(11) NOT NULL DEFAULT 50,
    `mp_ap_used`          smallint(6) NOT NULL DEFAULT 0,
    `ap`                  smallint(6) NOT NULL DEFAULT 0,
    `sp`                  int(11) NOT NULL DEFAULT 0,
    `extend_sp`           bigint(20) NOT NULL,
    `exp`                 bigint(20) NOT NULL DEFAULT 0,
    `pop`                 int(11) NOT NULL DEFAULT 0,
    `wp`                  int(1) NOT NULL DEFAULT 0,
    `field_id`            int(11) NOT NULL DEFAULT 0,
    `portal`              tinyint(4) NOT NULL DEFAULT 0,
    `sub_job`             smallint(6) NOT NULL DEFAULT 0,
    `def_face_acc`        int(11) NOT NULL DEFAULT 0,
    `fatigue`             smallint(6) NOT NULL DEFAULT 0,
    `last_fatigue_update` datetime    NOT NULL DEFAULT current_timestamp(),
    `charisma`            int(11) NOT NULL DEFAULT 0,
    `insight`             int(11) NOT NULL DEFAULT 0,
    `will`                int(11) NOT NULL DEFAULT 0,
    `craft`               int(11) NOT NULL DEFAULT 0,
    `charm`               int(11) NOT NULL DEFAULT 0,
    `sense`               int(11) NOT NULL DEFAULT 0,
    `pvp_exp`             int(11) NOT NULL DEFAULT 0,
    `pvp_grade`           smallint(6) NOT NULL DEFAULT 10,
    `pvp_point`           int(11) NOT NULL DEFAULT 0,
    `pvp_mode_level`      tinyint(4) NOT NULL DEFAULT 5,
    `pvp_mode_type`       tinyint(4) NOT NULL DEFAULT 6,
    `event_point`         int(11) NOT NULL DEFAULT 0,
    `last_logout`         datetime             DEFAULT current_timestamp(),
    `create_date`         datetime             DEFAULT current_timestamp(),
    PRIMARY KEY (`id`) USING BTREE,
    KEY                   `name` (`name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_stolen_skill
-- ----------------------------
DROP TABLE IF EXISTS `character_stolen_skill`;
CREATE TABLE `character_stolen_skill`
(
    `character_id` int(11) NOT NULL,
    `slot`         tinyint(4) DEFAULT NULL,
    `idx`          tinyint(4) DEFAULT NULL,
    `skill_id`     int(11) DEFAULT NULL,
    `level`        int(11) DEFAULT NULL,
    `master_level` int(11) DEFAULT NULL,
    KEY            `character_stolen_skill_character_id_IDX` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_vcore
-- ----------------------------
DROP TABLE IF EXISTS `character_vcore`;
CREATE TABLE `character_vcore`
(
    `id`           bigint(20) NOT NULL,
    `character_id` int(11) NOT NULL DEFAULT 0,
    `core_id`      int(11) NOT NULL DEFAULT 0,
    `level`        int(11) NOT NULL DEFAULT 0,
    `exp`          int(11) NOT NULL DEFAULT 0,
    `state`        int(11) NOT NULL DEFAULT 0,
    `first_skill`  int(11) NOT NULL DEFAULT 0,
    `middle_skill` int(11) NOT NULL DEFAULT 0,
    `last_skill`   int(11) NOT NULL DEFAULT 0,
    `slot`         int(11) NOT NULL DEFAULT 0,
    `expire_date`  datetime NOT NULL DEFAULT '2079-01-01 00:00:00',
    `lock`         tinyint(4) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`) USING BTREE,
    KEY            `character_id` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_vmatrix_slot
-- ----------------------------
DROP TABLE IF EXISTS `character_vmatrix_slot`;
CREATE TABLE `character_vmatrix_slot`
(
    `character_id` int(11) NOT NULL,
    `slot`         int(11) NOT NULL,
    `state`        int(11) NOT NULL DEFAULT -1,
    `extend_level` int(11) NOT NULL DEFAULT 0,
    `expansion`    tinyint(4) NOT NULL DEFAULT 0,
    PRIMARY KEY (`character_id`, `slot`) USING BTREE,
    KEY            `character_id` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_wild_hunter_info
-- ----------------------------
DROP TABLE IF EXISTS `character_wild_hunter_info`;
CREATE TABLE `character_wild_hunter_info`
(
    `character_id` int(11) NOT NULL,
    `select`       tinyint(4) NOT NULL,
    `mob_ids`      varchar(41) NOT NULL,
    PRIMARY KEY (`character_id`) USING BTREE,
    KEY            `character_id` (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_world_share_record
-- ----------------------------
DROP TABLE IF EXISTS `character_world_share_record`;
CREATE TABLE `character_world_share_record`
(
    `account_id` int(11) NOT NULL,
    `world_id`   int(11) NOT NULL,
    `type`       tinyint(4) NOT NULL DEFAULT 0,
    `record_id`  int(11) NOT NULL,
    `str_raw`    varchar(255) NOT NULL DEFAULT '',
    UNIQUE KEY `unique_awtr` (`account_id`,`world_id`,`type`,`record_id`),
    KEY          `account_id` (`account_id`,`world_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for character_zero_info
-- ----------------------------
DROP TABLE IF EXISTS `character_zero_info`;
CREATE TABLE `character_zero_info`
(
    `character_id`   int(11) NOT NULL,
    `beta`           tinyint(4) NOT NULL DEFAULT 0,
    `hp`             int(11) NOT NULL DEFAULT 0,
    `mp`             int(11) NOT NULL DEFAULT 0,
    `skin`           tinyint(4) NOT NULL DEFAULT 0,
    `hair`           int(11) NOT NULL DEFAULT 0,
    `face`           int(11) NOT NULL DEFAULT 0,
    `max_hp`         int(11) NOT NULL DEFAULT 0,
    `max_mp`         int(11) NOT NULL DEFAULT 0,
    `link_cash_part` bigint(20) NOT NULL DEFAULT 0,
    PRIMARY KEY (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for friend
-- ----------------------------
DROP TABLE IF EXISTS `friend`;
CREATE TABLE `friend`
(
    `id`                  int(11) NOT NULL AUTO_INCREMENT,
    `world_id`            int(11) NOT NULL DEFAULT 0,
    `account_id`          int(11) NOT NULL DEFAULT 0,
    `character_id`        int(11) NOT NULL DEFAULT 0,
    `friend_account_id`   int(11) NOT NULL DEFAULT 0,
    `friend_character_id` int(11) NOT NULL DEFAULT 0,
    `flag`                tinyint(4) NOT NULL DEFAULT 0,
    `name`                varchar(13)  NOT NULL DEFAULT '',
    `group`               varchar(17)  NOT NULL DEFAULT '',
    `nick`                varchar(13)  NOT NULL DEFAULT '',
    `memo`                varchar(256) NOT NULL DEFAULT '',
    PRIMARY KEY (`id`) USING BTREE,
    KEY                   `user_id` (`world_id`,`account_id`,`character_id`,`friend_account_id`,`friend_character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for friend_account
-- ----------------------------
DROP TABLE IF EXISTS `friend_account`;
CREATE TABLE `friend_account`
(
    `id`                  int(11) NOT NULL AUTO_INCREMENT,
    `world_id`            int(11) NOT NULL DEFAULT 0,
    `account_id`          int(11) NOT NULL DEFAULT 0,
    `character_id`        int(11) NOT NULL DEFAULT 0,
    `friend_account_id`   int(11) NOT NULL DEFAULT 0,
    `friend_character_id` int(11) NOT NULL DEFAULT 0,
    `flag`                tinyint(4) NOT NULL DEFAULT 0,
    `name`                varchar(13)  NOT NULL DEFAULT '',
    `group`               varchar(17)  NOT NULL DEFAULT '',
    `nick`                varchar(13)  NOT NULL DEFAULT '',
    `memo`                varchar(256) NOT NULL DEFAULT '',
    PRIMARY KEY (`id`) USING BTREE,
    KEY                   `user_id` (`world_id`,`account_id`,`character_id`,`friend_account_id`,`friend_character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for friend_black_list
-- ----------------------------
DROP TABLE IF EXISTS `friend_black_list`;
CREATE TABLE `friend_black_list`
(
    `id`                 int(11) NOT NULL AUTO_INCREMENT,
    `character_id`       int(11) NOT NULL DEFAULT 0,
    `nick`               varchar(13) NOT NULL DEFAULT '',
    `block_name`         varchar(13) NOT NULL DEFAULT '',
    `block_character_id` int(11) NOT NULL DEFAULT 0,
    `block_account_id`   int(11) NOT NULL DEFAULT 0,
    `memo`               varchar(68) NOT NULL DEFAULT '',
    PRIMARY KEY (`id`) USING BTREE,
    KEY                  `character_id` (`character_id`,`nick`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for game_reward
-- ----------------------------
DROP TABLE IF EXISTS `game_reward`;
CREATE TABLE `game_reward`
(
    `id`         int(11) NOT NULL AUTO_INCREMENT,
    `type`       int(11) DEFAULT NULL,
    `item_id`    int(11) DEFAULT NULL,
    `quantity`   int(11) DEFAULT NULL,
    `balance`    int(11) DEFAULT NULL,
    `mesos`      bigint(20) DEFAULT NULL,
    `exp`        bigint(20) DEFAULT NULL,
    `start_date` datetime     DEFAULT NULL,
    `end_date`   datetime     DEFAULT NULL,
    `message`    varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE,
    KEY          `end_time` (`end_date`) USING BTREE,
    KEY          `id` (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for game_reward_log
-- ----------------------------
DROP TABLE IF EXISTS `game_reward_log`;
CREATE TABLE `game_reward_log`
(
    `id`          bigint(20) NOT NULL AUTO_INCREMENT,
    `account_id`  int(11) NOT NULL,
    `reward_id`   int(11) NOT NULL,
    `state`       int(11) NOT NULL DEFAULT 0,
    `update_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp (),
    PRIMARY KEY (`id`),
    KEY           `character_id` (`account_id`),
    KEY           `reward_id` (`reward_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for guild_alliance_grade
-- ----------------------------
DROP TABLE IF EXISTS `guild_alliance_grade`;
CREATE TABLE `guild_alliance_grade`
(
    `alliance_id` int(11) NOT NULL,
    `grade`       tinyint(4) NOT NULL,
    `name`        varchar(20) NOT NULL,
    KEY           `alliance_id` (`alliance_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for guild_alliance_info
-- ----------------------------
DROP TABLE IF EXISTS `guild_alliance_info`;
CREATE TABLE `guild_alliance_info`
(
    `id`       int(11) NOT NULL AUTO_INCREMENT,
    `name`     varchar(20)  NOT NULL,
    `capacity` int(11) NOT NULL,
    `notice`   varchar(200) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for guild_applicant
-- ----------------------------
DROP TABLE IF EXISTS `guild_applicant`;
CREATE TABLE `guild_applicant`
(
    `character_id` int(11) NOT NULL,
    `guild_id`     int(11) NOT NULL,
    `intro`        varchar(160) NOT NULL,
    KEY            `character_id` (`character_id`,`guild_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for guild_bulletin
-- ----------------------------
DROP TABLE IF EXISTS `guild_bulletin`;
CREATE TABLE `guild_bulletin`
(
    `id`           int(11) NOT NULL AUTO_INCREMENT,
    `guild_id`     int(11) NOT NULL,
    `type`         int(11) NOT NULL,
    `character_id` int(11) NOT NULL,
    `content`      varchar(210) NOT NULL,
    `date`         datetime     NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`),
    KEY            `guild_id` (`guild_id`,`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for guild_bulletin_like
-- ----------------------------
DROP TABLE IF EXISTS `guild_bulletin_like`;
CREATE TABLE `guild_bulletin_like`
(
    `id`           int(11) NOT NULL AUTO_INCREMENT,
    `bulletin_id`  int(11) NOT NULL,
    `character_id` int(11) NOT NULL,
    PRIMARY KEY (`id`),
    KEY            `bulletin_id` (`bulletin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for guild_bulletin_reply
-- ----------------------------
DROP TABLE IF EXISTS `guild_bulletin_reply`;
CREATE TABLE `guild_bulletin_reply`
(
    `id`           int(11) NOT NULL AUTO_INCREMENT,
    `bulletin_id`  int(11) NOT NULL,
    `character_id` int(11) NOT NULL,
    `content`      varchar(210) NOT NULL,
    `post_date`    datetime     NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`),
    KEY            `bulletin_id` (`bulletin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for guild_event_point
-- ----------------------------
DROP TABLE IF EXISTS `guild_event_point`;
CREATE TABLE `guild_event_point`
(
    `character_id` int(11) NOT NULL,
    `type`         tinyint(4) NOT NULL,
    `point`        int(11) NOT NULL DEFAULT 0,
    `last_point`   int(11) NOT NULL DEFAULT 0,
    `date`         datetime NOT NULL DEFAULT current_timestamp(),
    UNIQUE KEY `character_id` (`character_id`,`type`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for guild_event_rank
-- ----------------------------
DROP TABLE IF EXISTS `guild_event_rank`;
CREATE TABLE `guild_event_rank`
(
    `guild_id`   int(11) NOT NULL,
    `type`       tinyint(4) NOT NULL,
    `point`      int(11) NOT NULL DEFAULT 0,
    `last_point` int(11) NOT NULL DEFAULT 0,
    `rank`       int(11) NOT NULL DEFAULT 0,
    `last_rank`  int(11) NOT NULL DEFAULT 0,
    `sp`         int(11) NOT NULL DEFAULT 0,
    `last_sp`    int(11) NOT NULL DEFAULT 0,
    `date`       datetime NOT NULL DEFAULT current_timestamp(),
    UNIQUE KEY `guild_id` (`guild_id`,`type`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for guild_grade
-- ----------------------------
DROP TABLE IF EXISTS `guild_grade`;
CREATE TABLE `guild_grade`
(
    `guild_id` int(11) NOT NULL,
    `grade`    tinyint(4) NOT NULL,
    `name`     varchar(20) NOT NULL,
    `flag`     int(11) NOT NULL,
    KEY        `guild_id` (`guild_id`),
    KEY        `guild_id_2` (`guild_id`,`grade`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for guild_info
-- ----------------------------
DROP TABLE IF EXISTS `guild_info`;
CREATE TABLE `guild_info`
(
    `id`                  int(11) NOT NULL AUTO_INCREMENT,
    `world_id`            int(11) NOT NULL,
    `name`                varchar(20)   NOT NULL,
    `capacity`            int(11) NOT NULL,
    `emblem_back`         mediumint(9) NOT NULL,
    `emblem_back_color`   tinyint(4) NOT NULL,
    `emblem_design`       mediumint(9) NOT NULL,
    `emblem_design_color` tinyint(4) NOT NULL,
    `emblem_raw`          varchar(1024) NOT NULL DEFAULT '',
    `intro`               varchar(160)  NOT NULL,
    `total_prestige`      int(11) NOT NULL,
    `prestige`            int(11) NOT NULL,
    `alliance_id`         int(11) NOT NULL,
    `guild_point`         int(11) NOT NULL,
    `allow_join`          tinyint(4) NOT NULL DEFAULT 1,
    `trend_event`         int(11) NOT NULL,
    `trend_login`         int(11) NOT NULL,
    `trend_age`           int(11) NOT NULL,
    `create_date`         datetime      NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`) USING BTREE,
    KEY                   `name` (`name`) USING BTREE,
    KEY                   `alliance_id` (`alliance_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for guild_member
-- ----------------------------
DROP TABLE IF EXISTS `guild_member`;
CREATE TABLE `guild_member`
(
    `character_id`      int(11) NOT NULL,
    `guild_id`          int(11) NOT NULL,
    `grade`             tinyint(4) NOT NULL DEFAULT 5,
    `alliance_grade`    tinyint(4) NOT NULL DEFAULT 5,
    `contribution`      int(11) NOT NULL,
    `inc_guild_point`   int(11) NOT NULL,
    `contribution_date` datetime NOT NULL DEFAULT current_timestamp(),
    `check_in_time`     int(11) NOT NULL,
    `join_date`         datetime NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`character_id`),
    KEY                 `guild_id` (`guild_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for guild_skill
-- ----------------------------
DROP TABLE IF EXISTS `guild_skill`;
CREATE TABLE `guild_skill`
(
    `guild_id`  int(11) NOT NULL DEFAULT 0,
    `skill_id`  int(11) NOT NULL DEFAULT 0,
    `level`     mediumint(9) NOT NULL DEFAULT 1,
    `date`      datetime    NOT NULL DEFAULT current_timestamp(),
    `purchaser` varchar(20) NOT NULL DEFAULT '',
    `activator` varchar(20) NOT NULL,
    KEY         `guild_id` (`guild_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for item_bundle
-- ----------------------------
DROP TABLE IF EXISTS `item_bundle`;
CREATE TABLE `item_bundle`
(
    `id`               bigint(20) unsigned NOT NULL DEFAULT 0,
    `sn`               bigint(20) NOT NULL DEFAULT 0,
    `item_id`          int(11) NOT NULL DEFAULT 0,
    `expire_date`      datetime    NOT NULL DEFAULT '2079-01-01 00:00:00',
    `bag_index`        int(11) NOT NULL DEFAULT -1,
    `title`            varchar(20) NOT NULL DEFAULT '',
    `attribute`        int(11) NOT NULL DEFAULT 0,
    `locate`           tinyint(4) NOT NULL DEFAULT 0,
    `quantity`         smallint(6) NOT NULL DEFAULT 0,
    `familiar`         int(11) NOT NULL DEFAULT 0,
    `level`            smallint(6) NOT NULL DEFAULT 0,
    `skill`            smallint(6) NOT NULL DEFAULT 0,
    `potential1`       int(6) NOT NULL DEFAULT 0,
    `potential2`       int(6) NOT NULL DEFAULT 0,
    `potential3`       int(6) NOT NULL DEFAULT 0,
    `grade`            tinyint(4) NOT NULL DEFAULT 0,
    `exchange_timeout` datetime    NOT NULL DEFAULT '1900-01-01 00:00:00',
    `exchange`         int(11) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`) USING BTREE,
    KEY                `id` (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for item_cash_info
-- ----------------------------
DROP TABLE IF EXISTS `item_cash_info`;
CREATE TABLE `item_cash_info`
(
    `id`            bigint(20) NOT NULL AUTO_INCREMENT,
    `account_id`    int(11) NOT NULL,
    `character_id`  int(11) NOT NULL,
    `item_id`       int(11) NOT NULL,
    `commodity_id`  int(11) NOT NULL,
    `quantity`      int(11) NOT NULL,
    `giver`         varchar(20) NOT NULL DEFAULT '',
    `date_expire`   datetime    NOT NULL,
    `payback_rate`  int(11) NOT NULL,
    `discount_rate` double      NOT NULL,
    `order_no`      int(11) NOT NULL,
    `product_no`    int(11) NOT NULL,
    `refundable`    tinyint(4) NOT NULL,
    `source_fag`    tinyint(4) NOT NULL,
    `store_bank`    tinyint(4) NOT NULL,
    `purchase_date` datetime    NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for item_equip
-- ----------------------------
DROP TABLE IF EXISTS `item_equip`;
CREATE TABLE `item_equip`
(
    `id`          bigint(20) unsigned NOT NULL,
    `sn`          bigint(20) NOT NULL DEFAULT 0,
    `item_id`     int(11) NOT NULL DEFAULT 0,
    `expire_date` datetime    NOT NULL DEFAULT '2079-01-01 00:00:00',
    `title`       varchar(20) NOT NULL DEFAULT '',
    PRIMARY KEY (`id`) USING BTREE,
    KEY           `id` (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for item_equip_android
-- ----------------------------
DROP TABLE IF EXISTS `item_equip_android`;
CREATE TABLE `item_equip_android`
(
    `id`        bigint(20) unsigned NOT NULL DEFAULT 0,
    `skin`      smallint(6) NOT NULL DEFAULT 0,
    `hair`      int(11) NOT NULL DEFAULT 0,
    `face`      int(11) NOT NULL DEFAULT 0,
    `name`      varchar(20) NOT NULL DEFAULT '',
    `attribute` int(11) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`) USING BTREE,
    KEY         `id` (`id`) USING BTREE,
    CONSTRAINT `item_equip_android_ibfk_1` FOREIGN KEY (`id`) REFERENCES `item_equip` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for item_equip_base
-- ----------------------------
DROP TABLE IF EXISTS `item_equip_base`;
CREATE TABLE `item_equip_base`
(
    `id`                bigint(20) unsigned NOT NULL,
    `ruc`               tinyint(4) NOT NULL DEFAULT 0,
    `cuc`               tinyint(4) NOT NULL DEFAULT 0,
    `base_str`          smallint(6) NOT NULL DEFAULT 0,
    `base_dex`          smallint(6) NOT NULL DEFAULT 0,
    `base_int`          smallint(6) NOT NULL DEFAULT 0,
    `base_luk`          smallint(6) NOT NULL DEFAULT 0,
    `max_hp`            smallint(6) NOT NULL DEFAULT 0,
    `max_mp`            smallint(6) NOT NULL DEFAULT 0,
    `pad`               smallint(6) NOT NULL DEFAULT 0,
    `mad`               smallint(6) NOT NULL DEFAULT 0,
    `pdd`               smallint(6) NOT NULL DEFAULT 0,
    `craft`             smallint(6) NOT NULL DEFAULT 0,
    `speed`             smallint(6) NOT NULL DEFAULT 0,
    `jump`              smallint(6) NOT NULL DEFAULT 0,
    `attribute`         int(11) NOT NULL DEFAULT 0,
    `level_up_type`     tinyint(4) NOT NULL DEFAULT 0,
    `inc_skill`         int(11) NOT NULL DEFAULT 0,
    `level`             tinyint(4) NOT NULL DEFAULT 0,
    `exp`               bigint(20) NOT NULL DEFAULT 0,
    `durability`        int(11) NOT NULL DEFAULT 0,
    `iuc`               int(11) NOT NULL DEFAULT 0,
    `puc`               int(11) NOT NULL DEFAULT 0,
    `pvp_damage`        smallint(6) NOT NULL DEFAULT 0,
    `reduce_req`        tinyint(4) NOT NULL DEFAULT 0,
    `special_attribute` smallint(6) NOT NULL DEFAULT 0,
    `durability_max`    int(11) NOT NULL DEFAULT 0,
    `inc_req`           tinyint(4) NOT NULL DEFAULT 0,
    `growth_enchant`    tinyint(4) NOT NULL DEFAULT 0,
    `enchant`           tinyint(4) NOT NULL DEFAULT 0,
    `boss_damage_r`     smallint(6) NOT NULL DEFAULT 0,
    `ignore_pdr`        smallint(6) NOT NULL DEFAULT 0,
    `damage_r`          smallint(6) NOT NULL DEFAULT 0,
    `stat_rate`         smallint(6) NOT NULL DEFAULT 0,
    `cuttable`          tinyint(4) NOT NULL DEFAULT -1,
    `ex_grade_option`   bigint(20) NOT NULL DEFAULT 0,
    `item_state`        int(11) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`) USING BTREE,
    KEY                 `id` (`id`) USING BTREE,
    CONSTRAINT `item_equip_base_ibfk_1` FOREIGN KEY (`id`) REFERENCES `item_equip` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for item_equip_cash_option
-- ----------------------------
DROP TABLE IF EXISTS `item_equip_cash_option`;
CREATE TABLE `item_equip_cash_option`
(
    `id`          bigint(20) unsigned NOT NULL DEFAULT 0,
    `sn`          bigint(20) NOT NULL DEFAULT 0,
    `expire_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
    `grade`       int(11) NOT NULL DEFAULT 0,
    `option1`     int(11) NOT NULL DEFAULT 0,
    `option2`     int(11) NOT NULL DEFAULT 0,
    `option3`     int(11) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`) USING BTREE,
    KEY           `id` (`id`) USING BTREE,
    CONSTRAINT `item_equip_cash_option_ibfk_1` FOREIGN KEY (`id`) REFERENCES `item_equip` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for item_equip_excel
-- ----------------------------
DROP TABLE IF EXISTS `item_equip_excel`;
CREATE TABLE `item_equip_excel`
(
    `id`         bigint(20) NOT NULL,
    `euc`        tinyint(4) NOT NULL DEFAULT 0,
    `reuc`       tinyint(4) NOT NULL DEFAULT 0,
    `base_str`   smallint(6) NOT NULL DEFAULT 0,
    `base_dex`   smallint(6) NOT NULL DEFAULT 0,
    `base_int`   smallint(6) NOT NULL DEFAULT 0,
    `base_luk`   smallint(6) NOT NULL DEFAULT 0,
    `max_hp`     smallint(6) NOT NULL DEFAULT 0,
    `max_mp`     smallint(6) NOT NULL DEFAULT 0,
    `pad`        smallint(6) NOT NULL DEFAULT 0,
    `mad`        smallint(6) NOT NULL DEFAULT 0,
    `pdd`        smallint(6) NOT NULL DEFAULT 0,
    `craft`      smallint(6) NOT NULL DEFAULT 0,
    `speed`      smallint(6) NOT NULL DEFAULT 0,
    `jump`       smallint(6) NOT NULL DEFAULT 0,
    `pvp_damage` smallint(6) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for item_equip_jewel
-- ----------------------------
DROP TABLE IF EXISTS `item_equip_jewel`;
CREATE TABLE `item_equip_jewel`
(
    `id`      bigint(20) NOT NULL,
    `level`   int(11) NOT NULL DEFAULT 1,
    `stat`    longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `stat_ex` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `option`  int(11) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for item_equip_option
-- ----------------------------
DROP TABLE IF EXISTS `item_equip_option`;
CREATE TABLE `item_equip_option`
(
    `id`               bigint(20) unsigned NOT NULL,
    `grade`            tinyint(4) NOT NULL DEFAULT 0,
    `chuc`             tinyint(4) NOT NULL DEFAULT 0,
    `option1`          int(6) NOT NULL DEFAULT 0,
    `option1_lv`       tinyint(4) NOT NULL DEFAULT 0,
    `option2`          int(6) NOT NULL DEFAULT 0,
    `option2_lv`       tinyint(4) NOT NULL DEFAULT 0,
    `option3`          int(6) NOT NULL DEFAULT 0,
    `option3_lv`       tinyint(4) NOT NULL DEFAULT 0,
    `option4`          int(6) NOT NULL DEFAULT 0,
    `option4_lv`       tinyint(4) NOT NULL DEFAULT 0,
    `option5`          int(6) NOT NULL DEFAULT 0,
    `option5_lv`       tinyint(4) NOT NULL DEFAULT 0,
    `option6`          int(6) NOT NULL DEFAULT 0,
    `option6_lv`       tinyint(4) NOT NULL DEFAULT 0,
    `skin`             int(11) NOT NULL DEFAULT 0,
    `socket_grade`     smallint(6) NOT NULL DEFAULT 0,
    `socket1`          smallint(6) NOT NULL DEFAULT 0,
    `socket2`          smallint(6) NOT NULL DEFAULT 0,
    `socket3`          smallint(6) NOT NULL DEFAULT 0,
    `color`            int(11) NOT NULL DEFAULT 0,
    `soul_option_id`   smallint(6) NOT NULL DEFAULT 0,
    `soul_socket`      smallint(6) NOT NULL DEFAULT 0,
    `soul_option`      smallint(6) NOT NULL DEFAULT 0,
    `arc`              smallint(6) NOT NULL DEFAULT 0,
    `arc_exp`          int(11) NOT NULL DEFAULT 0,
    `arc_level`        smallint(6) NOT NULL DEFAULT 0,
    `aut`              smallint(6) NOT NULL DEFAULT 0,
    `aut_exp`          int(11) NOT NULL DEFAULT 0,
    `aut_level`        smallint(6) NOT NULL DEFAULT 0,
    `break_limit`      bigint(20) NOT NULL DEFAULT 0,
    `break_limit_plus` bigint(20) NOT NULL DEFAULT 0,
    `skills`           longtext NOT NULL DEFAULT '{}',
    `exchange_timeout` datetime NOT NULL DEFAULT '1900-01-01 00:00:00',
    `exchange`         int(11) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`) USING BTREE,
    KEY                `id` (`id`) USING BTREE,
    CONSTRAINT `item_equip_option_ibfk_1` FOREIGN KEY (`id`) REFERENCES `item_equip` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for item_pet
-- ----------------------------
DROP TABLE IF EXISTS `item_pet`;
CREATE TABLE `item_pet`
(
    `id`               bigint(20) unsigned NOT NULL DEFAULT 0,
    `sn`               bigint(20) NOT NULL DEFAULT 0,
    `item_id`          int(11) NOT NULL DEFAULT 0,
    `expire_date`      datetime    NOT NULL DEFAULT '2079-01-01 00:00:00',
    `name`             varchar(15) NOT NULL DEFAULT '',
    `level`            tinyint(4) NOT NULL DEFAULT 0,
    `tameness`         int(11) NOT NULL DEFAULT 0,
    `repleteness`      tinyint(4) NOT NULL DEFAULT 0,
    `dead_date`        datetime    NOT NULL DEFAULT '2079-01-01 00:00:00',
    `pet_attribute`    smallint(6) NOT NULL DEFAULT 0,
    `pet_skill`        smallint(6) NOT NULL DEFAULT 0,
    `remain_life`      int(11) NOT NULL DEFAULT 0,
    `active_state`     tinyint(4) NOT NULL DEFAULT 0,
    `attribute`        smallint(6) NOT NULL DEFAULT 0,
    `pet_hue`          int(11) NOT NULL DEFAULT -1,
    `auto_buff_skill1` int(11) NOT NULL DEFAULT 0,
    `auto_buff_skill2` int(11) NOT NULL DEFAULT 0,
    `giant_rate`       smallint(6) NOT NULL DEFAULT 100,
    `training`         int(11) NOT NULL DEFAULT 0,
    `skin`             int(11) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`) USING BTREE,
    KEY                `id` (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for item_pet_exception
-- ----------------------------
DROP TABLE IF EXISTS `item_pet_exception`;
CREATE TABLE `item_pet_exception`
(
    `id`      bigint(20) DEFAULT NULL,
    `item_id` int(11) DEFAULT NULL,
    KEY       `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for item_slot
-- ----------------------------
DROP TABLE IF EXISTS `item_slot`;
CREATE TABLE `item_slot`
(
    `id`        bigint(20) NOT NULL,
    `owner_id`  int(11) DEFAULT NULL,
    `world_id`  int(11) DEFAULT NULL,
    `own_type`  tinyint(4) DEFAULT NULL,
    `item_type` tinyint(4) DEFAULT NULL,
    `slot`      smallint(6) DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE,
    KEY         `owner_id` (`owner_id`,`world_id`,`own_type`,`item_type`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for maple_union_artifact
-- ----------------------------
DROP TABLE IF EXISTS `maple_union_artifact`;
CREATE TABLE `maple_union_artifact`
(
    `account_id`  int(11) NOT NULL,
    `world_id`    int(11) NOT NULL,
    `slot`        int(11) NOT NULL,
    `level`       int(11) NOT NULL,
    `first_stat`  int(11) NOT NULL,
    `middle_stat` int(11) NOT NULL,
    `last_stat`   int(11) NOT NULL,
    `expire_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for maple_union_record
-- ----------------------------
DROP TABLE IF EXISTS `maple_union_record`;
CREATE TABLE `maple_union_record`
(
    `account_id`   int(11) NOT NULL,
    `world_id`     int(11) NOT NULL,
    `page`         int(11) NOT NULL,
    `type`         int(11) NOT NULL,
    `character_id` int(11) NOT NULL,
    `rotate`       int(11) NOT NULL,
    `board_idx`    int(11) NOT NULL,
    `local`        int(11) NOT NULL,
    KEY            `account_id` (`account_id`,`world_id`,`page`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for master_disciple
-- ----------------------------
DROP TABLE IF EXISTS `master_disciple`;
CREATE TABLE `master_disciple`
(
    `account_id`        int(11) NOT NULL,
    `world_id`          int(11) DEFAULT NULL,
    `stat`              int(11) DEFAULT NULL,
    `main_player`       int(11) DEFAULT NULL,
    `name`              varchar(15) DEFAULT NULL,
    `level`             int(11) DEFAULT NULL,
    `job`               int(11) DEFAULT NULL,
    `master_id`         int(11) DEFAULT NULL,
    `disciple_id`       int(11) DEFAULT NULL,
    `combat_power`      bigint(20) DEFAULT NULL,
    `last_combat_power` bigint(20) DEFAULT NULL,
    `auto_accept`       int(11) DEFAULT NULL,
    `maple_union_level` int(11) DEFAULT NULL,
    `point`             int(11) DEFAULT NULL,
    `point_special`     int(11) DEFAULT NULL,
    `grade`             int(11) DEFAULT NULL,
    `rank`              int(11) DEFAULT NULL,
    `nae_gong`          int(11) DEFAULT NULL,
    `last_rank`         int(11) DEFAULT NULL,
    `training_point`    int(11) DEFAULT NULL,
    `last_update`       datetime    DEFAULT current_timestamp() ON UPDATE current_timestamp (),
    UNIQUE KEY `account_id` (`account_id`,`world_id`),
    KEY                 `world_id` (`world_id`,`stat`),
    KEY                 `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for master_disciple_applicant
-- ----------------------------
DROP TABLE IF EXISTS `master_disciple_applicant`;
CREATE TABLE `master_disciple_applicant`
(
    `id`         int(11) NOT NULL AUTO_INCREMENT,
    `account_id` int(11) NOT NULL DEFAULT 0,
    `world_id`   int(11) NOT NULL DEFAULT 0,
    `target_id`  int(11) NOT NULL DEFAULT 0,
    `type`       int(11) NOT NULL DEFAULT 0,
    `msg`        varchar(60) NOT NULL,
    `date`       datetime    NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`),
    KEY          `account_id` (`account_id`,`world_id`),
    KEY          `world_id` (`world_id`,`target_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for memo_in
-- ----------------------------
DROP TABLE IF EXISTS `memo_in`;
CREATE TABLE `memo_in`
(
    `id`           int(11) NOT NULL AUTO_INCREMENT,
    `character_id` int(11) NOT NULL,
    `delete`       tinyint(4) NOT NULL,
    `state`        tinyint(4) NOT NULL,
    `sender_id`    int(11) NOT NULL,
    `sender`       varchar(20)  NOT NULL,
    `message`      varchar(200) NOT NULL,
    `date`         datetime     NOT NULL,
    `type`         tinyint(4) NOT NULL,
    PRIMARY KEY (`id`) USING BTREE,
    KEY            `character_id` (`character_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for memo_out
-- ----------------------------
DROP TABLE IF EXISTS `memo_out`;
CREATE TABLE `memo_out`
(
    `id`           int(11) NOT NULL AUTO_INCREMENT,
    `delete`       tinyint(4) NOT NULL,
    `state`        tinyint(4) NOT NULL,
    `sender_id`    int(11) NOT NULL,
    `sender`       varchar(20)  NOT NULL,
    `recipient_id` int(11) NOT NULL,
    `recipient`    varchar(20)  NOT NULL,
    `message`      varchar(200) NOT NULL,
    `date`         datetime     NOT NULL,
    PRIMARY KEY (`id`) USING BTREE,
    KEY            `sender_id` (`sender_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for my_home
-- ----------------------------
DROP TABLE IF EXISTS `my_home`;
CREATE TABLE `my_home`
(
    `account_id` int(11) NOT NULL,
    `world_id`   int(11) NOT NULL,
    `home_id`    int(11) NOT NULL,
    PRIMARY KEY (`account_id`, `world_id`),
    KEY          `home_id` (`home_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for my_home_collect
-- ----------------------------
DROP TABLE IF EXISTS `my_home_collect`;
CREATE TABLE `my_home_collect`
(
    `home_id` int(11) NOT NULL,
    `item_id` int(11) NOT NULL,
    UNIQUE KEY `home_id` (`home_id`,`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for my_home_drawing
-- ----------------------------
DROP TABLE IF EXISTS `my_home_drawing`;
CREATE TABLE `my_home_drawing`
(
    `id`      bigint(11) NOT NULL AUTO_INCREMENT,
    `home_id` int(11) NOT NULL,
    `drawing` int(11) NOT NULL,
    PRIMARY KEY (`id`) USING BTREE,
    KEY       `home_id` (`home_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for my_home_furniture
-- ----------------------------
DROP TABLE IF EXISTS `my_home_furniture`;
CREATE TABLE `my_home_furniture`
(
    `id`        bigint(20) NOT NULL AUTO_INCREMENT,
    `home_id`   int(11) NOT NULL,
    `state`     int(11) NOT NULL DEFAULT 0,
    `field_id`  int(11) NOT NULL DEFAULT 0,
    `floor_key` int(11) NOT NULL DEFAULT 0,
    `x`         int(11) NOT NULL DEFAULT 0,
    `y`         int(11) NOT NULL DEFAULT 0,
    `item_id`   int(11) NOT NULL DEFAULT 0,
    `stance`    int(11) NOT NULL DEFAULT 0,
    `collect`   int(11) NOT NULL DEFAULT 0,
    `animation` int(11) NOT NULL DEFAULT 0,
    `record`    varchar(200) NOT NULL DEFAULT '',
    PRIMARY KEY (`id`) USING BTREE,
    KEY         `home_id` (`home_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for my_home_info
-- ----------------------------
DROP TABLE IF EXISTS `my_home_info`;
CREATE TABLE `my_home_info`
(
    `id`            int(11) NOT NULL AUTO_INCREMENT,
    `name`          varchar(30)  NOT NULL DEFAULT '',
    `intro`         varchar(200) NOT NULL DEFAULT '',
    `type`          int(11) NOT NULL DEFAULT 1,
    `roof`          int(11) NOT NULL DEFAULT 0,
    `roof_deco`     int(11) NOT NULL DEFAULT 0,
    `wall_front`    int(11) NOT NULL DEFAULT 0,
    `wall_back`     int(11) NOT NULL DEFAULT 0,
    `tile`          int(11) NOT NULL DEFAULT 0,
    `window`        int(11) NOT NULL DEFAULT 0,
    `exterior_deco` int(11) NOT NULL DEFAULT 0,
    `door`          int(11) NOT NULL DEFAULT 0,
    `parasol`       int(11) NOT NULL DEFAULT 0,
    `chimney`       int(11) NOT NULL DEFAULT 0,
    `storage_slot`  int(11) NOT NULL DEFAULT 72,
    `visitor`       int(11) NOT NULL DEFAULT 0,
    `like`          int(11) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for my_home_neighbor
-- ----------------------------
DROP TABLE IF EXISTS `my_home_neighbor`;
CREATE TABLE `my_home_neighbor`
(
    `id`          bigint(20) NOT NULL AUTO_INCREMENT,
    `home_id`     int(11) NOT NULL DEFAULT 0,
    `neighbor_id` int(11) NOT NULL DEFAULT 0,
    `nick_name`   varchar(20) NOT NULL DEFAULT '',
    PRIMARY KEY (`id`),
    KEY           `home_id` (`home_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for parcel
-- ----------------------------
DROP TABLE IF EXISTS `parcel`;
CREATE TABLE `parcel`
(
    `id`            int(11) NOT NULL AUTO_INCREMENT,
    `character_id`  int(11) NOT NULL DEFAULT 0,
    `sender`        varchar(15)  NOT NULL DEFAULT '',
    `msg`           varchar(202) NOT NULL DEFAULT '',
    `money`         int(11) NOT NULL DEFAULT 0,
    `delivery_date` datetime     NOT NULL,
    `type`          tinyint(4) NOT NULL DEFAULT 0,
    `item_type`     tinyint(4) NOT NULL DEFAULT 0,
    `entity_id`     bigint(20) NOT NULL DEFAULT -1,
    PRIMARY KEY (`id`),
    KEY             `character_id` (`character_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for pvp_rank
-- ----------------------------
DROP TABLE IF EXISTS `pvp_rank`;
CREATE TABLE `pvp_rank`
(
    `account_id` int(11) NOT NULL COMMENT '帳號 ID',
    `world_id`   int(11) NOT NULL COMMENT '世界 ID',
    `name`       varchar(50) NOT NULL COMMENT '角色名稱',
    `point`      int(11) NOT NULL DEFAULT 0 COMMENT 'PVP 點數',
    `rank`       int(11) NOT NULL DEFAULT 0 COMMENT '排名',
    `total`      int(11) NOT NULL DEFAULT 0 COMMENT '總場次',
    `win`        int(11) NOT NULL DEFAULT 0 COMMENT '勝利場次',
    PRIMARY KEY (`account_id`, `world_id`) USING BTREE,
    KEY          `idx_world_point` (`world_id`,`point`),
    KEY          `idx_world_name` (`world_id`,`name`),
    KEY          `idx_world_rank` (`world_id`,`rank`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for trunk
-- ----------------------------
DROP TABLE IF EXISTS `trunk`;
CREATE TABLE `trunk`
(
    `account_id` int(11) NOT NULL DEFAULT 0,
    `world_id`   int(11) NOT NULL DEFAULT 0,
    `capacity`   smallint(6) NOT NULL DEFAULT 4,
    `money`      bigint(20) NOT NULL DEFAULT 0,
    UNIQUE KEY `account_id` (`account_id`,`world_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for zlog_ban
-- ----------------------------
DROP TABLE IF EXISTS `zlog_ban`;
CREATE TABLE `zlog_ban`
(
    `id`           int(11) NOT NULL AUTO_INCREMENT,
    `account_name` varchar(30)  NOT NULL,
    `reason`       varchar(255) NOT NULL,
    `date`         datetime     NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for zlog_command
-- ----------------------------
DROP TABLE IF EXISTS `zlog_command`;
CREATE TABLE `zlog_command`
(
    `id`           bigint(20) NOT NULL AUTO_INCREMENT,
    `character_id` int(11) DEFAULT 0,
    `command`      varchar(255) DEFAULT '',
    `date`         datetime     DEFAULT current_timestamp(),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for zlog_item_operate
-- ----------------------------
DROP TABLE IF EXISTS `zlog_item_operate`;
CREATE TABLE `zlog_item_operate`
(
    `id`          bigint(20) NOT NULL AUTO_INCREMENT,
    `entity_id`   bigint(20) DEFAULT NULL,
    `target_id`   bigint(20) DEFAULT NULL,
    `item_id`     int(11) DEFAULT NULL,
    `type`        tinyint(4) DEFAULT NULL,
    `state`       tinyint(4) DEFAULT NULL,
    `operator_id` int(11) DEFAULT NULL,
    `quantity`    int(11) DEFAULT NULL,
    `log`         varchar(100) DEFAULT '',
    `date`        datetime     DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for zlog_like_point
-- ----------------------------
DROP TABLE IF EXISTS `zlog_like_point`;
CREATE TABLE `zlog_like_point`
(
    `id`           bigint(20) NOT NULL AUTO_INCREMENT,
    `character_id` int(11) NOT NULL,
    `target_id`    int(11) NOT NULL,
    `date`         datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for zlog_login
-- ----------------------------
DROP TABLE IF EXISTS `zlog_login`;
CREATE TABLE `zlog_login`
(
    `id`         int(11) NOT NULL AUTO_INCREMENT,
    `account_id` int(11) NOT NULL,
    `ip`         varchar(17) NOT NULL,
    `mac`        varchar(18) NOT NULL,
    `date`       datetime    NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`),
    KEY          `account_id` (`account_id`),
    KEY          `ip` (`ip`),
    KEY          `mac` (`mac`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for zlog_player_chat
-- ----------------------------
DROP TABLE IF EXISTS `zlog_player_chat`;
CREATE TABLE `zlog_player_chat`
(
    `from`     varchar(16) NOT NULL,
    `to`       varchar(16)  DEFAULT NULL,
    `type`     tinyint(4) DEFAULT NULL,
    `channel`  tinyint(4) DEFAULT NULL,
    `field_id` int(11) DEFAULT NULL,
    `text`     varchar(255) DEFAULT NULL,
    `date`     datetime     DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for zlog_popularity
-- ----------------------------
DROP TABLE IF EXISTS `zlog_popularity`;
CREATE TABLE `zlog_popularity`
(
    `id`           bigint(20) NOT NULL AUTO_INCREMENT,
    `character_id` int(11) NOT NULL,
    `target_id`    int(11) NOT NULL,
    `date`         datetime NOT NULL,
    PRIMARY KEY (`id`),
    KEY            `character_id` (`character_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for zlog_trade
-- ----------------------------
DROP TABLE IF EXISTS `zlog_trade`;
CREATE TABLE `zlog_trade`
(
    `id`        bigint(20) NOT NULL AUTO_INCREMENT,
    `from`      int(11) NOT NULL,
    `to`        int(11) NOT NULL,
    `entity_id` bigint(20) NOT NULL,
    `item_id`   bigint(20) NOT NULL,
    `quantity`  bigint(20) NOT NULL,
    `date`      datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

SET
FOREIGN_KEY_CHECKS = 1;

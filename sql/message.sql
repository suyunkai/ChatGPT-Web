/*
 Navicat Premium Data Transfer

 Source Server         : gc-mysql-chatgptv2
 Source Server Type    : MySQL
 Source Server Version : 80024
 Source Host           : 34.92.176.183:3306
 Source Schema         : chatgptv2

 Target Server Type    : MySQL
 Target Server Version : 80024
 File Encoding         : 65001

 Date: 24/06/2023 22:39:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` bigint unsigned NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `room_id` varchar(255) DEFAULT NULL,
  `message_id` varchar(255) DEFAULT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `frequency_penalty` float DEFAULT NULL,
  `max_tokens` int DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `presence_penalty` float DEFAULT NULL,
  `temperature` float DEFAULT NULL,
  `parent_message_id` varchar(255) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `key_room_id` (`room_id`) USING BTREE,
  KEY `key_roomo_user` (`user_id`,`room_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS = 1;

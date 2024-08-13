/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 80300
Source Host           : localhost:3306
Source Database       : systeminfodb

Target Server Type    : MYSQL
Target Server Version : 80300
File Encoding         : 65001

Date: 2024-08-13 15:01:35
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES ('5', 'İdari');
INSERT INTO `categories` VALUES ('6', 'Akademik');
INSERT INTO `categories` VALUES ('7', 'Araştırma');
INSERT INTO `categories` VALUES ('8', 'Diğer');

-- ----------------------------
-- Table structure for cpu_info
-- ----------------------------
DROP TABLE IF EXISTS `cpu_info`;
CREATE TABLE `cpu_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `cpu_markasi` varchar(50) DEFAULT NULL,
  `cpu_modeli` varchar(100) DEFAULT NULL,
  `cpu_hizi` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of cpu_info
-- ----------------------------
INSERT INTO `cpu_info` VALUES ('65', '13', 'Intel', 'i5-10300H', '2.50 GHz');

-- ----------------------------
-- Table structure for departments
-- ----------------------------
DROP TABLE IF EXISTS `departments`;
CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `category_id` int NOT NULL,
  `subcategory_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `subcategory_id` (`subcategory_id`)
) ENGINE=MyISAM AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of departments
-- ----------------------------
INSERT INTO `departments` VALUES ('121', 'asdasd', '4', '19');
INSERT INTO `departments` VALUES ('115', 'Ali', '2', '9');
INSERT INTO `departments` VALUES ('120', 'Nab', '2', '2');
INSERT INTO `departments` VALUES ('117', 'ar41', '3', '0');
INSERT INTO `departments` VALUES ('118', 'Erdemli', '2', '1');
INSERT INTO `departments` VALUES ('119', 'Selam', '1', '3');
INSERT INTO `departments` VALUES ('122', 'ofis2016', '3', '15');
INSERT INTO `departments` VALUES ('123', 'asddsdf', '2', '11');

-- ----------------------------
-- Table structure for disk_info
-- ----------------------------
DROP TABLE IF EXISTS `disk_info`;
CREATE TABLE `disk_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `disk1_markasi` varchar(50) DEFAULT NULL,
  `disk1_modeli` varchar(100) DEFAULT NULL,
  `disk1_boyutu` varchar(50) DEFAULT NULL,
  `disk1_turu` varchar(10) DEFAULT NULL,
  `disk2_markasi` varchar(50) DEFAULT NULL,
  `disk2_modeli` varchar(100) DEFAULT NULL,
  `disk2_boyutu` varchar(50) DEFAULT NULL,
  `disk2_turu` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of disk_info
-- ----------------------------
INSERT INTO `disk_info` VALUES ('63', '13', 'SAMSUNG', 'MZALQ128HBHQ-000L2', '119 GB', 'SSD', 'WDC', 'WD10SPZX-08Z10', '931 GB', 'HDD');

-- ----------------------------
-- Table structure for gpu_info
-- ----------------------------
DROP TABLE IF EXISTS `gpu_info`;
CREATE TABLE `gpu_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `gpu_brand` varchar(100) DEFAULT NULL,
  `gpu_model` varchar(255) DEFAULT NULL,
  `gpu_memory` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of gpu_info
-- ----------------------------
INSERT INTO `gpu_info` VALUES ('13', '13', 'NVIDIA', 'GTX 1650', '4095 MB');

-- ----------------------------
-- Table structure for logins
-- ----------------------------
DROP TABLE IF EXISTS `logins`;
CREATE TABLE `logins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `fk_user_id` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of logins
-- ----------------------------
INSERT INTO `logins` VALUES ('1', 'admin', '$2y$10$cQNhbS115qaEBe/XBW5MZOu7iAzVZ9VYFURf.lsiI4v5efi1SoXm6', '13');

-- ----------------------------
-- Table structure for ram_info
-- ----------------------------
DROP TABLE IF EXISTS `ram_info`;
CREATE TABLE `ram_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `ram_size` varchar(50) DEFAULT NULL,
  `ram_type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of ram_info
-- ----------------------------
INSERT INTO `ram_info` VALUES ('13', '13', '16 GB', 'DDR4');

-- ----------------------------
-- Table structure for subcategories
-- ----------------------------
DROP TABLE IF EXISTS `subcategories`;
CREATE TABLE `subcategories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of subcategories
-- ----------------------------
INSERT INTO `subcategories` VALUES ('5', '1', 'Daire Başkanlığı');
INSERT INTO `subcategories` VALUES ('6', '1', 'Müdürlük');
INSERT INTO `subcategories` VALUES ('7', '1', 'Koordinatörlük');
INSERT INTO `subcategories` VALUES ('8', '1', 'Genel Sekreterlik');
INSERT INTO `subcategories` VALUES ('9', '1', 'Komisyon');
INSERT INTO `subcategories` VALUES ('10', '1', 'Kurul');
INSERT INTO `subcategories` VALUES ('11', '1', 'Diğer');
INSERT INTO `subcategories` VALUES ('12', '2', 'Yüksekokul');
INSERT INTO `subcategories` VALUES ('13', '2', 'Meslek Yüksekokulu');
INSERT INTO `subcategories` VALUES ('14', '2', 'Fakülte');
INSERT INTO `subcategories` VALUES ('15', '2', 'Enstitü');
INSERT INTO `subcategories` VALUES ('16', '2', 'Bölüm');
INSERT INTO `subcategories` VALUES ('17', '2', 'Diğer');
INSERT INTO `subcategories` VALUES ('18', '3', 'Uygulama ve Araştırma Merkezi');
INSERT INTO `subcategories` VALUES ('19', '3', 'Ofis');
INSERT INTO `subcategories` VALUES ('20', '3', 'Laboratuvar');
INSERT INTO `subcategories` VALUES ('21', '3', 'Projeler');
INSERT INTO `subcategories` VALUES ('22', '3', 'Diğer');
INSERT INTO `subcategories` VALUES ('23', '4', 'Hastaneler');
INSERT INTO `subcategories` VALUES ('24', '4', 'İşletmeler');
INSERT INTO `subcategories` VALUES ('25', '4', 'Diğer');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `department_id` int DEFAULT NULL,
  `gsm` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('13', 'Alizada', '1', '5318508993', 'alizada@gmail.com');
SET FOREIGN_KEY_CHECKS=1;

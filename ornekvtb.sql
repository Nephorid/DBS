/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 80300
Source Host           : localhost:3306
Source Database       : systeminfodb

Target Server Type    : MYSQL
Target Server Version : 80300
File Encoding         : 65001

Date: 2024-07-22 10:00:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cpu_info
-- ----------------------------
DROP TABLE IF EXISTS `cpu_info`;
CREATE TABLE `cpu_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `cpu_model` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of cpu_info
-- ----------------------------
INSERT INTO `cpu_info` VALUES ('45', '46', 'Intel(R) Core(TM) i5-10300H CPU @ 2.50GHz');
INSERT INTO `cpu_info` VALUES ('39', '40', 'Intel(R) Core(TM) i5-10300H CPU @ 2.50GHz');
INSERT INTO `cpu_info` VALUES ('43', '44', 'Intel(R) Core(TM) i5-10300H CPU @ 2.50GHz');
INSERT INTO `cpu_info` VALUES ('44', '45', 'Intel(R) Core(TM) i5-10300H CPU @ 2.50GHz');
INSERT INTO `cpu_info` VALUES ('47', '48', 'Intel(R) Core(TM) i5-10300H CPU @ 2.50GHz\n');
INSERT INTO `cpu_info` VALUES ('46', '47', 'Intel(R) Core(TM) i5-10300H CPU @ 2.50GHz\n');
INSERT INTO `cpu_info` VALUES ('17', '17', 'Intel(R) Core(TM) i5-8265U CPU @ 1.60GHz');
INSERT INTO `cpu_info` VALUES ('21', '22', 'Intel(R) Core(TM) i5-10300H CPU @ 2.50GHz');
INSERT INTO `cpu_info` VALUES ('22', '23', 'Intel(R) Core(TM) i5-10300H CPU @ 2.50GHz');
INSERT INTO `cpu_info` VALUES ('23', '24', 'Intel(R) Core(TM) i5-10300H CPU @ 2.50GHz');
INSERT INTO `cpu_info` VALUES ('24', '25', 'Intel(R) Core(TM) i5-10300H CPU @ 2.50GHz');
INSERT INTO `cpu_info` VALUES ('25', '26', 'Intel(R) Core(TM) i5-10300H CPU @ 2.50GHz');
INSERT INTO `cpu_info` VALUES ('26', '27', 'Intel(R) Core(TM) i5-10300H CPU @ 2.50GHz');
INSERT INTO `cpu_info` VALUES ('27', '28', 'Intel(R) Core(TM) i5-10300H CPU @ 2.50GHz');
INSERT INTO `cpu_info` VALUES ('28', '29', 'Intel(R) Core(TM) i5-10300H CPU @ 2.50GHz');
INSERT INTO `cpu_info` VALUES ('29', '30', 'Intel(R) Core(TM) i5-10300H CPU @ 2.50GHz');
INSERT INTO `cpu_info` VALUES ('30', '31', 'Intel(R) Core(TM) i5-3330 CPU @ 3.00GHz');
INSERT INTO `cpu_info` VALUES ('42', '43', 'Intel(R) Core(TM) i5-10300H CPU @ 2.50GHz');
INSERT INTO `cpu_info` VALUES ('32', '33', 'Intel(R) Core(TM) i5-10300H CPU @ 2.50GHz');
INSERT INTO `cpu_info` VALUES ('33', '34', 'Intel(R) Core(TM) i5-10300H CPU @ 2.50GHz');
INSERT INTO `cpu_info` VALUES ('34', '35', 'Intel(R) Core(TM) i5-10300H CPU @ 2.50GHz');
INSERT INTO `cpu_info` VALUES ('35', '36', 'Intel(R) Core(TM) i5-10300H CPU @ 2.50GHz');
INSERT INTO `cpu_info` VALUES ('36', '37', 'Intel(R) Core(TM) i5-10300H CPU @ 2.50GHz');
INSERT INTO `cpu_info` VALUES ('37', '38', 'Intel(R) Core(TM) i5-10300H CPU @ 2.50GHz');
INSERT INTO `cpu_info` VALUES ('38', '39', 'Intel(R) Core(TM) i5-10300H CPU @ 2.50GHz');

-- ----------------------------
-- Table structure for departments
-- ----------------------------
DROP TABLE IF EXISTS `departments`;
CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of departments
-- ----------------------------
INSERT INTO `departments` VALUES ('29', 'İlahiyat Fakültesi');
INSERT INTO `departments` VALUES ('28', 'İktisadi ve İdari Bilimler Fakültesi');
INSERT INTO `departments` VALUES ('27', 'Hemşirelik Fakültesi');
INSERT INTO `departments` VALUES ('26', 'Güzel Sanatlar Fakültesi');
INSERT INTO `departments` VALUES ('25', 'İnsan ve Toplum Bilimleri Fakültesi');
INSERT INTO `departments` VALUES ('24', 'Fen Fakültesi');
INSERT INTO `departments` VALUES ('23', 'Eğitim Fakültesi');
INSERT INTO `departments` VALUES ('20', 'Denizcilik Fakültesi');
INSERT INTO `departments` VALUES ('21', 'Diş Hekimliği Fakültesi');
INSERT INTO `departments` VALUES ('22', 'Eczacılık Fakültesi');
INSERT INTO `departments` VALUES ('30', 'İletişim Fakültesi');
INSERT INTO `departments` VALUES ('31', 'İnsan ve Toplum Bilimleri Fakültesi');
INSERT INTO `departments` VALUES ('32', 'Mimarlık Fakültesi');
INSERT INTO `departments` VALUES ('33', 'Mühendislik Fakültesi');
INSERT INTO `departments` VALUES ('34', 'Müzik ve Sahne Sanatları Fakültesi');
INSERT INTO `departments` VALUES ('35', 'Sağlık Bilimleri Fakültesi');
INSERT INTO `departments` VALUES ('36', 'Spor Bilimleri Fakültesi');
INSERT INTO `departments` VALUES ('37', 'Su Ürünleri Fakültesi');
INSERT INTO `departments` VALUES ('38', 'Tıp Fakültesi');
INSERT INTO `departments` VALUES ('39', 'Turizm Fakültesi');
INSERT INTO `departments` VALUES ('40', 'Anamur Uygulamalı Teknoloji ve İşletmecilik Yüksekokulu');
INSERT INTO `departments` VALUES ('41', 'Beden Eğitimi ve Spor Yüksekokulu');
INSERT INTO `departments` VALUES ('42', 'Devlet Konservatuvarı');
INSERT INTO `departments` VALUES ('43', 'Erdemli Uygulamalı Teknoloji ve İşletmecilik Yüksekokulu');
INSERT INTO `departments` VALUES ('44', 'İçel Sağlık Yüksekokulu');
INSERT INTO `departments` VALUES ('45', 'Silifke Uygulamalı Teknoloji ve İşletmecilik Yüksekokulu');
INSERT INTO `departments` VALUES ('46', 'Takı Teknolojisi ve Tasarımı Yüksekokulu');
INSERT INTO `departments` VALUES ('47', 'Yabancı Diller Yüksekokulu');
INSERT INTO `departments` VALUES ('48', 'Anamur Meslek Yüksekokulu');
INSERT INTO `departments` VALUES ('49', 'Aydıncık Meslek Yüksekokulu');
INSERT INTO `departments` VALUES ('50', 'Denizcilik Meslek Yüksekokulu');
INSERT INTO `departments` VALUES ('51', 'Erdemli Meslek Yüksekokulu');
INSERT INTO `departments` VALUES ('52', 'Gülnar Mustafa Baysan Meslek Yüksekokulu');
INSERT INTO `departments` VALUES ('53', 'Mersin Meslek Yüksekokulu');
INSERT INTO `departments` VALUES ('54', 'Mut Meslek Yüksekokulu');
INSERT INTO `departments` VALUES ('55', 'Sağlık Hizmetleri Meslek Yüksekokulu');
INSERT INTO `departments` VALUES ('56', 'Silifke Meslek Yüksekokulu');
INSERT INTO `departments` VALUES ('57', 'Sosyal Bilimler Meslek Yüksekokulu');
INSERT INTO `departments` VALUES ('58', 'Teknik Bilimler Meslek Yüksekokulu');
INSERT INTO `departments` VALUES ('59', 'Eğitim Bilimleri Enstitüsü');
INSERT INTO `departments` VALUES ('60', 'Fen Bilimleri Enstitüsü');
INSERT INTO `departments` VALUES ('61', 'Güzel Sanatlar Enstitüsü');
INSERT INTO `departments` VALUES ('62', 'Sağlık Bilimleri Enstitüsü');
INSERT INTO `departments` VALUES ('63', 'Sosyal Bilimler Enstitüsü');
INSERT INTO `departments` VALUES ('64', 'Atatürk İlkeleri ve İnkılap Tarihi Bölümü');
INSERT INTO `departments` VALUES ('65', 'Beden Eğitimi ve Spor Bölümü');
INSERT INTO `departments` VALUES ('66', 'Enformatik Bölümü');
INSERT INTO `departments` VALUES ('67', 'Türk Dili Bölümü');
INSERT INTO `departments` VALUES ('68', 'Akdeniz Kent Araştırmaları Merkezi');
INSERT INTO `departments` VALUES ('69', 'Atatürk İlkeleri ve Inkılap Tarihi Araştırma ve Uygulama Merkezi');
INSERT INTO `departments` VALUES ('70', 'Bilgi İşlem Araştırma ve Uygulama Merkezi');
INSERT INTO `departments` VALUES ('71', 'Biyoteknolojik Araştırmalar Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('72', 'Bölgesel İzleme Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('73', 'Çocuk Eğitimi Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('74', 'Çocuk Koruma Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('75', 'Deniz Araştırmaları ile Hidrografik Ölçmeler ve İnsansız Deniz-Hava Sistemleri Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('76', 'Deniz Kaplumbağaları Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('77', 'Dış Ticaret ve Lojistik Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('78', 'Diş Hekimliği Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('79', 'Egzersiz ve Spor Bilimleri Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('80', 'Enerji Teknolojileri Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('81', 'Genç Girişimci Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('82', 'Gençlik Bilim Sanat Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('83', 'Gıda Araştırmaları Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('84', 'Göç Araştırmaları Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('85', 'Görsel İşitsel Yapımlar Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('86', 'Hastane');
INSERT INTO `departments` VALUES ('87', 'İleri Teknoloji Eğitim Araştırma ve Uygulama Merkezi');
INSERT INTO `departments` VALUES ('88', 'İlk Yardım Araştırma ve Uygulama Merkezi');
INSERT INTO `departments` VALUES ('89', 'İş Sağlığı ve Güvenliği Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('90', 'Kadın Sorunları Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('91', 'Kalibrasyon Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('92', 'Kariyer Merkezi');
INSERT INTO `departments` VALUES ('93', 'Kilikia Arkeolojisi Araştırma Merkezi');
INSERT INTO `departments` VALUES ('94', 'Kozmetik Temizlik ve Kimyevi Ürünler Üretim Eğitim Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('95', 'Nevit Kodallı Oda Müziği Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('96', 'Nükleer Bilimler Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('97', 'Öğrenme ve Öğretmeyi Geliştirme Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('98', 'Ölçme ve Değerlendirme Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('99', 'Özel Yetenekliler Eğitimi Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('100', 'Rehberlik ve Psikolojik Danışmanlık Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('101', 'Restorasyon ve Koruma Merkezi');
INSERT INTO `departments` VALUES ('102', 'Sürdürülebilir Çevre Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('103', 'Sürekli Eğitim Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('104', 'Turizm Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('105', 'Türkçe Öğretimi Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('106', 'Uzaktan Eğitim Uygulama ve Araştırma Merkezi');
INSERT INTO `departments` VALUES ('107', 'Yörük Kültürü Uygulama ve Araştırma Merkezi');

-- ----------------------------
-- Table structure for disk_info
-- ----------------------------
DROP TABLE IF EXISTS `disk_info`;
CREATE TABLE `disk_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `disk1_model` varchar(255) DEFAULT NULL,
  `disk1_size` varchar(50) DEFAULT NULL,
  `disk1_type` varchar(50) DEFAULT NULL,
  `disk2_model` varchar(255) DEFAULT NULL,
  `disk2_size` varchar(50) DEFAULT NULL,
  `disk2_type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of disk_info
-- ----------------------------
INSERT INTO `disk_info` VALUES ('45', '46', 'SAMSUNG MZALQ128HBHQ-000L2', '119 GB', 'SSD', 'WDC WD10SPZX-08Z10', '931 GB', 'HDD');
INSERT INTO `disk_info` VALUES ('39', '40', 'SAMSUNG MZALQ128HBHQ-000L2', '119 GB', 'SSD', 'WDC WD10SPZX-08Z10', '931 GB', 'HDD');
INSERT INTO `disk_info` VALUES ('44', '45', 'SAMSUNG MZALQ128HBHQ-000L2', '119 GB', 'SSD', 'WDC WD10SPZX-08Z10', '931 GB', 'HDD');
INSERT INTO `disk_info` VALUES ('42', '43', 'SAMSUNG MZALQ128HBHQ-000L2', '119 GB', 'NULL', 'WDC WD10SPZX-08Z10', '931 GB', 'NULL');
INSERT INTO `disk_info` VALUES ('17', '17', 'ST1000LM048-2E7172', '931 GB', 'HDD', 'SAMSUNG MZNLN256HAJQ-000L2', '238 GB', 'SSD');
INSERT INTO `disk_info` VALUES ('21', '22', 'ST1000LM048-2E7172', '119 GB', 'NULL', 'SAMSUNG MZNLN256HAJQ-000L2', '238 GB', 'HDD');
INSERT INTO `disk_info` VALUES ('22', '23', 'SAMSUNG MZALQ128HBHQ-000L2', '119 GB', 'SSD', 'WDC WD10SPZX-08Z10', '931 GB', 'HDD');
INSERT INTO `disk_info` VALUES ('23', '24', 'ST1000LM048-2E7172', '119 GB', 'NULL', 'SAMSUNG MZNLN256HAJQ-000L2', '238 GB', 'HDD');
INSERT INTO `disk_info` VALUES ('24', '25', 'SAMSUNG MZALQ128HBHQ-000L2', '119 GB', 'SSD', 'WDC WD10SPZX-08Z10', '931 GB', 'HDD');
INSERT INTO `disk_info` VALUES ('25', '26', 'ST1000LM048-2E7172', '119 GB', 'NULL', 'SAMSUNG MZNLN256HAJQ-000L2', '238 GB', 'HDD');
INSERT INTO `disk_info` VALUES ('26', '27', 'ST1000LM048-2E7172', '930 GB', 'SSD', 'SAMSUNG MZNLN256HAJQ-000L2', '2048 GB', 'HDD');
INSERT INTO `disk_info` VALUES ('27', '28', 'SAMSUNG MZALQ128HBHQ-000L2', '119 GB', 'SSD', 'WDC WD10SPZX-08Z10', '931 GB', 'HDD');
INSERT INTO `disk_info` VALUES ('28', '29', 'NULL', 'NULL', 'NULL', 'NULL', 'NULL', 'NULL');
INSERT INTO `disk_info` VALUES ('29', '30', 'SAMSUNG MZALQ128HBHQ-000L2', '119 GB', 'SSD', 'WDC WD10SPZX-08Z10', '931 GB', 'HDD');
INSERT INTO `disk_info` VALUES ('30', '31', 'WDC WD3000JS-63PDB1 ATA Device', '279 GB', 'HDD', 'VendorCo ProductCode USB Device', '29 GB', 'Belirtilmemis');
INSERT INTO `disk_info` VALUES ('43', '44', 'SAMSUNG MZALQ128HBHQ-000L2', '119 GB', 'SSD', 'WDC WD10SPZX-08Z10', '931 GB', 'HDD');
INSERT INTO `disk_info` VALUES ('32', '33', 'NULL', 'NULL', 'NULL', 'NULL', 'NULL', 'NULL');
INSERT INTO `disk_info` VALUES ('33', '34', 'NULL', 'NULL', 'NULL', 'NULL', 'NULL', 'NULL');
INSERT INTO `disk_info` VALUES ('34', '35', 'SAMSUNG MZALQ128HBHQ-000L2', '119 GB', 'SSD', 'WDC WD10SPZX-08Z10', '931 GB', 'HDD');
INSERT INTO `disk_info` VALUES ('35', '36', 'SAMSUNG MZALQ128HBHQ-000L2', '119 GB', 'SSD', 'WDC WD10SPZX-08Z10', '931 GB', 'HDD');
INSERT INTO `disk_info` VALUES ('36', '37', 'NULL', 'NULL', 'NULL', 'NULL', 'NULL', 'NULL');
INSERT INTO `disk_info` VALUES ('37', '38', 'SAMSUNG MZALQ128HBHQ-000L2', '119 GB', 'SSD', 'WDC WD10SPZX-08Z10', '931 GB', 'HDD');
INSERT INTO `disk_info` VALUES ('38', '39', 'Samsung', '120 GB', 'SSD', 'NVME2', '500 GB', 'Toshiba');

-- ----------------------------
-- Table structure for gpu_info
-- ----------------------------
DROP TABLE IF EXISTS `gpu_info`;
CREATE TABLE `gpu_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `gpu_model` varchar(255) DEFAULT NULL,
  `gpu_memory` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of gpu_info
-- ----------------------------
INSERT INTO `gpu_info` VALUES ('45', '46', 'NVIDIA GeForce GTX 1650 Ti', '4095 MB');
INSERT INTO `gpu_info` VALUES ('39', '40', 'NVIDIA GeForce GTX 1650 Ti', '4095 MB');
INSERT INTO `gpu_info` VALUES ('43', '44', 'NVIDIA GeForce GTX 1650 Ti', '4095 MB');
INSERT INTO `gpu_info` VALUES ('44', '45', 'NVIDIA GeForce GTX 1650 Ti', '4095 MB');
INSERT INTO `gpu_info` VALUES ('17', '17', 'Intel(R) UHD Graphics 620', '1024 MB');
INSERT INTO `gpu_info` VALUES ('21', '22', 'NVIDIA GeForce GTX 1650 Ti', '4095 MB');
INSERT INTO `gpu_info` VALUES ('22', '23', 'NVIDIA GeForce GTX 1650 Ti', '4095 MB');
INSERT INTO `gpu_info` VALUES ('23', '24', 'NVIDIA GeForce GTX 1650 Ti', '4095 MB');
INSERT INTO `gpu_info` VALUES ('24', '25', 'NVIDIA GeForce GTX 1650 Ti', '4095 MB');
INSERT INTO `gpu_info` VALUES ('25', '26', 'NVIDIA GeForce GTX 1650 Ti', '4095 MB');
INSERT INTO `gpu_info` VALUES ('26', '27', 'NVIDIA GeForce RTX 4090', '20128 MB');
INSERT INTO `gpu_info` VALUES ('27', '28', 'NVIDIA GeForce GTX 1650 Ti', '4095 MB');
INSERT INTO `gpu_info` VALUES ('28', '29', 'NVIDIA GeForce GTX 1650 Ti', '4095 MB');
INSERT INTO `gpu_info` VALUES ('29', '30', 'NVIDIA GeForce GTX 1650 Ti', '4095 MB');
INSERT INTO `gpu_info` VALUES ('30', '31', 'Intel(R) HD Graphics', '2058 MB');
INSERT INTO `gpu_info` VALUES ('42', '43', 'NVIDIA GeForce GTX 1650 Ti', '');
INSERT INTO `gpu_info` VALUES ('32', '33', 'NVIDIA GeForce GTX 1650 Ti', '4095 MB');
INSERT INTO `gpu_info` VALUES ('33', '34', 'NVIDIA GeForce GTX 1650 Ti', '4095 MB');
INSERT INTO `gpu_info` VALUES ('34', '35', 'NVIDIA GeForce GTX 1650 Ti', '4095 MB');
INSERT INTO `gpu_info` VALUES ('35', '36', 'NVIDIA GeForce GTX 1650 Ti', '4095 MB');
INSERT INTO `gpu_info` VALUES ('36', '37', 'NVIDIA GeForce GTX 1650 Ti', '4095 MB');
INSERT INTO `gpu_info` VALUES ('37', '38', 'NVIDIA GeForce GTX 1650 Ti', '4095 MB');
INSERT INTO `gpu_info` VALUES ('38', '39', 'NVIDIA GeForce GTX 1650 Ti', '4095 MB');

-- ----------------------------
-- Table structure for logins
-- ----------------------------
DROP TABLE IF EXISTS `logins`;
CREATE TABLE `logins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of logins
-- ----------------------------
INSERT INTO `logins` VALUES ('4', 'alizada', '$2y$10$afxnFMZ4v6cXhkqjknHRbOLHRcej1sFieaH4s8Q8UMzZ71tnoCdxy');

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
) ENGINE=MyISAM AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of ram_info
-- ----------------------------
INSERT INTO `ram_info` VALUES ('45', '46', '16 GB', 'DDR4');
INSERT INTO `ram_info` VALUES ('39', '40', '16 GB', 'DDR4');
INSERT INTO `ram_info` VALUES ('42', '43', '16 GB', '');
INSERT INTO `ram_info` VALUES ('44', '45', '16 GB', 'DDR4');
INSERT INTO `ram_info` VALUES ('17', '17', '8 GB', 'DDR4');
INSERT INTO `ram_info` VALUES ('21', '22', '16 GB', 'DDR4');
INSERT INTO `ram_info` VALUES ('22', '23', '16 GB', 'DDR4');
INSERT INTO `ram_info` VALUES ('23', '24', '16 GB', 'DDR4');
INSERT INTO `ram_info` VALUES ('24', '25', '16 GB', 'DDR4');
INSERT INTO `ram_info` VALUES ('25', '26', '16 GB', 'DDR4');
INSERT INTO `ram_info` VALUES ('26', '27', '128 GB', 'DDR5');
INSERT INTO `ram_info` VALUES ('27', '28', '16 GB', 'DDR4');
INSERT INTO `ram_info` VALUES ('28', '29', '16 GB', 'DDR4');
INSERT INTO `ram_info` VALUES ('29', '30', '16 GB', 'DDR4');
INSERT INTO `ram_info` VALUES ('30', '31', '4 GB', 'DDR3');
INSERT INTO `ram_info` VALUES ('43', '44', '16 GB', 'DDR4');
INSERT INTO `ram_info` VALUES ('32', '33', '16 GB', 'DDR4');
INSERT INTO `ram_info` VALUES ('33', '34', '16 GB', 'DDR4');
INSERT INTO `ram_info` VALUES ('34', '35', '16 GB', 'DDR4');
INSERT INTO `ram_info` VALUES ('35', '36', '16 GB', 'DDR4');
INSERT INTO `ram_info` VALUES ('36', '37', '16 GB', 'DDR4');
INSERT INTO `ram_info` VALUES ('37', '38', '16 GB', 'DDR4');
INSERT INTO `ram_info` VALUES ('38', '39', '12 GB', 'DDR4');

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
) ENGINE=MyISAM AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('17', 'JALE ŞEN', '30', '+904450254789', 'jaleşen_17@example.com');
INSERT INTO `users` VALUES ('23', 'ALİ KANDEMİR', '31', '+907423752320', 'alikandemir_23@example.com');
INSERT INTO `users` VALUES ('40', 'MAHMUT ÇEVİK', '32', '+903767997542', 'mahmutçevik_40@example.com');
INSERT INTO `users` VALUES ('24', 'MANSUR KÜRŞAD ERKURAN', '33', '+906568731057', 'mansurkürşaderkuran_24@example.com');
INSERT INTO `users` VALUES ('22', 'GAMZE TÜTEN', '34', '+901539662966', 'gamzetüten_22@example.com');
INSERT INTO `users` VALUES ('25', 'MİRAÇ ÖZTÜRK', '35', '+907992121966', 'miraçöztürk_25@example.com');
INSERT INTO `users` VALUES ('26', 'YÜCEL YÜZBAŞIOĞLU', '36', '+905341621241', 'yücelyüzbaşioğlu_26@example.com');
INSERT INTO `users` VALUES ('27', 'KUBİLAY VURAL', '37', '+902731740616', 'kubilayvural_27@example.com');
INSERT INTO `users` VALUES ('28', 'HAYATİ YÜCEL', '37', '+907633839666', 'hayatiyücel_28@example.com');
INSERT INTO `users` VALUES ('29', 'BEDRİYE MÜGE SÖNMEZ', '38', '+909973976789', 'bedriyemügesönmez_29@example.com');
INSERT INTO `users` VALUES ('30', 'BİRSEN ERTEKİN', '39', '+906968365252', 'birsenertekin_30@example.com');
INSERT INTO `users` VALUES ('31', 'SERDAL DEDE', '40', '+904919896204', 'serdaldede_31@example.com');
INSERT INTO `users` VALUES ('33', 'BÜNYAMİN UYANIK', '41', '+903694385572', 'bünyaminuyanik_33@example.com');
INSERT INTO `users` VALUES ('34', 'ÖZGÜR ASLAN', '43', '+903712239557', 'özgüraslan_34@example.com');
INSERT INTO `users` VALUES ('35', 'FERDİ AKBULUT', '45', '+907478041376', 'ferdiakbulut_35@example.com');
INSERT INTO `users` VALUES ('36', 'REYHAN ORHON', '47', '+906253488516', 'reyhanorhon_36@example.com');
INSERT INTO `users` VALUES ('37', 'İLHAN UZ', '48', '+908833318761', 'ilhanuz_37@example.com');
INSERT INTO `users` VALUES ('38', 'GÜLŞAH YAVUZ', '65', '+905406128564', 'gülşahyavuz_38@example.com');
INSERT INTO `users` VALUES ('39', 'NALAN ERDEM', '48', '+90530686844', 'nalanerdem_39@example.com');
SET FOREIGN_KEY_CHECKS=1;

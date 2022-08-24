/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 50738
 Source Host           : localhost:3306
 Source Schema         : blog_db

 Target Server Type    : MySQL
 Target Server Version : 50738
 File Encoding         : 65001

 Date: 24/08/2022 18:09:50
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for blog_user
-- ----------------------------
DROP TABLE IF EXISTS `blog_user`;
CREATE TABLE `blog_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `is_delete` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT '0',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blog_user
-- ----------------------------
INSERT INTO `blog_user` VALUES (1, 'admin', '$2a$10$NyGSL5yy6oQ4terJl5HGHOKTWypWGuLklqfAkEMU.do62Tx3STvc2', '0', NULL);
INSERT INTO `blog_user` VALUES (2, 'admin3', '$2a$10$HLMMU09rOOqgdam.j3aMVurt2K65gwzsPPB1oEvRFXzYLhOT1Bura', '0', NULL);
INSERT INTO `blog_user` VALUES (3, 'admin1', '$2a$10$7UleVLYSUHoVJ3kjT./3eu5lsHZ5KWrysLjUrTmBDp7OYp4fyEYd6', '0', NULL);
INSERT INTO `blog_user` VALUES (4, 'admin1234', '$2a$10$uz27TyUJaSdhp.h14sjMxugkbvBP5lKa79ao/8v4iKtBn7H3JwlS.', '0', NULL);
INSERT INTO `blog_user` VALUES (5, 'admin123', '$2a$10$LcJaQ1vkRDJe8d04wohvxu0eyVRz.BzJwearH9yg8GdsWhgvGwT02', '0', NULL);

SET FOREIGN_KEY_CHECKS = 1;

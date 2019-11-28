/*
 Navicat Premium Data Transfer

 Source Server         : Localhost
 Source Server Type    : MySQL
 Source Server Version : 100317
 Source Host           : localhost:3306
 Source Schema         : cinemaif

 Target Server Type    : MySQL
 Target Server Version : 100317
 File Encoding         : 65001

 Date: 28/11/2019 19:57:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for filme
-- ----------------------------
DROP TABLE IF EXISTS `filme`;
CREATE TABLE `filme`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sinopse` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `duracao` time(0) NOT NULL,
  `classificacao` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `capa` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of filme
-- ----------------------------
INSERT INTO `filme` VALUES (5, 'Rei Leão', 'Conta a história do Simba', '15:24:00', 'L', '324d04e82f5089fd6f3dd93d46c4b30e.jpg');
INSERT INTO `filme` VALUES (6, 'Coringa', 'O comediante falido Arthur Fleck encontra violentos bandidos pelas ruas de Gotham City. Desconsiderado pela sociedade, Fleck começa a ficar louco e se transforma no criminoso conhecido como Coringa.', '02:30:00', '16', '0b2a9f6014fc55991cb07a0f6b6966cb.jpg');
INSERT INTO `filme` VALUES (7, 'Velozes e Furiosos', 'Depois que Brian e Mia se aposentaram, e o resto da equipe foi exonerado, Dom e Letty estão em lua de mel e levam uma vida pacata e completamente normal.', '02:50:00', '14', '8272c1ffcaa9d7028334617e0fb96e52.jpeg');

-- ----------------------------
-- Table structure for filme_genero
-- ----------------------------
DROP TABLE IF EXISTS `filme_genero`;
CREATE TABLE `filme_genero`  (
  `filme_id` int(10) UNSIGNED NOT NULL,
  `genero_id` int(10) UNSIGNED NOT NULL,
  INDEX `filme_genero_filme_id_foreign`(`filme_id`) USING BTREE,
  INDEX `filme_genero_genero_id_foreign`(`genero_id`) USING BTREE,
  CONSTRAINT `filme_genero_filme_id_foreign` FOREIGN KEY (`filme_id`) REFERENCES `filme` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `filme_genero_genero_id_foreign` FOREIGN KEY (`genero_id`) REFERENCES `genero` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of filme_genero
-- ----------------------------
INSERT INTO `filme_genero` VALUES (6, 13);
INSERT INTO `filme_genero` VALUES (6, 14);
INSERT INTO `filme_genero` VALUES (7, 33);
INSERT INTO `filme_genero` VALUES (7, 36);
INSERT INTO `filme_genero` VALUES (7, 34);
INSERT INTO `filme_genero` VALUES (7, 35);
INSERT INTO `filme_genero` VALUES (5, 36);
INSERT INTO `filme_genero` VALUES (5, 35);

-- ----------------------------
-- Table structure for genero
-- ----------------------------
DROP TABLE IF EXISTS `genero`;
CREATE TABLE `genero`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 41 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of genero
-- ----------------------------
INSERT INTO `genero` VALUES (13, 'Comédia');
INSERT INTO `genero` VALUES (14, 'Terror');
INSERT INTO `genero` VALUES (33, 'Ação');
INSERT INTO `genero` VALUES (34, 'Suspense');
INSERT INTO `genero` VALUES (35, 'Aventura');
INSERT INTO `genero` VALUES (36, 'Ficção Científica');

-- ----------------------------
-- Table structure for knex_migrations
-- ----------------------------
DROP TABLE IF EXISTS `knex_migrations`;
CREATE TABLE `knex_migrations`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `batch` int(11) NULL DEFAULT NULL,
  `migration_time` timestamp(0) NOT NULL DEFAULT current_timestamp(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of knex_migrations
-- ----------------------------
INSERT INTO `knex_migrations` VALUES (2, '20190808210915_create_tables.js', 1, '2019-08-08 21:51:24');
INSERT INTO `knex_migrations` VALUES (4, '20191014121002_change_sessoes.js', 2, '2019-10-17 21:40:09');

-- ----------------------------
-- Table structure for knex_migrations_lock
-- ----------------------------
DROP TABLE IF EXISTS `knex_migrations_lock`;
CREATE TABLE `knex_migrations_lock`  (
  `index` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `is_locked` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`index`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of knex_migrations_lock
-- ----------------------------
INSERT INTO `knex_migrations_lock` VALUES (1, 0);

-- ----------------------------
-- Table structure for sala
-- ----------------------------
DROP TABLE IF EXISTS `sala`;
CREATE TABLE `sala`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `cadeiras` int(11) NOT NULL,
  `numero` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sala
-- ----------------------------
INSERT INTO `sala` VALUES (2, 40, '1');

-- ----------------------------
-- Table structure for sessao
-- ----------------------------
DROP TABLE IF EXISTS `sessao`;
CREATE TABLE `sessao`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `sala_id` int(10) UNSIGNED NOT NULL,
  `filme_id` int(10) UNSIGNED NOT NULL,
  `tipo_id` int(10) UNSIGNED NOT NULL,
  `inicio_sessao` time(0) NOT NULL,
  `final_sessao` time(0) NOT NULL,
  `valor` float(30, 2) NOT NULL,
  `dia_inicio` date NOT NULL,
  `dia_fim` date NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `sessao_filme_id_foreign`(`filme_id`) USING BTREE,
  INDEX `sessao_sala_id_foreign`(`sala_id`) USING BTREE,
  INDEX `sessao_tipo_id_foreign`(`tipo_id`) USING BTREE,
  CONSTRAINT `sessao_filme_id_foreign` FOREIGN KEY (`filme_id`) REFERENCES `filme` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `sessao_sala_id_foreign` FOREIGN KEY (`sala_id`) REFERENCES `sala` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `sessao_tipo_id_foreign` FOREIGN KEY (`tipo_id`) REFERENCES `tipo` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sessao
-- ----------------------------
INSERT INTO `sessao` VALUES (1, 2, 5, 1, '13:10:00', '15:10:00', 15.00, '0000-00-00', '0000-00-00');
INSERT INTO `sessao` VALUES (2, 2, 6, 1, '20:15:00', '22:15:00', 15.00, '0000-00-00', '0000-00-00');
INSERT INTO `sessao` VALUES (4, 2, 5, 3, '19:30:00', '21:30:00', 30.00, '2019-10-01', '2019-10-11');

-- ----------------------------
-- Table structure for tipo
-- ----------------------------
DROP TABLE IF EXISTS `tipo`;
CREATE TABLE `tipo`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tipo
-- ----------------------------
INSERT INTO `tipo` VALUES (1, '3D+');
INSERT INTO `tipo` VALUES (3, 'XD');

-- ----------------------------
-- Table structure for usuario
-- ----------------------------
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `login` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `senha` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_nascimento` date NULL DEFAULT NULL,
  `admin` int(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usuario
-- ----------------------------
INSERT INTO `usuario` VALUES (8, 'marco', '$2b$10$sx5N.17L5M3arwd25LXxteA3CXhHIL./pnTp3q0hW89PRNhcW7EwG', '1992-09-12', 0);

-- ----------------------------
-- Table structure for usuario_sessao
-- ----------------------------
DROP TABLE IF EXISTS `usuario_sessao`;
CREATE TABLE `usuario_sessao`  (
  `usuario_id` int(10) UNSIGNED NOT NULL,
  `sessao_id` int(10) UNSIGNED NOT NULL,
  `cadeira` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `dia` date NOT NULL,
  INDEX `usuario_sessao_usuario_id_foreign`(`usuario_id`) USING BTREE,
  INDEX `usuario_sessao_sessao_id_foreign`(`sessao_id`) USING BTREE,
  CONSTRAINT `usuario_sessao_sessao_id_foreign` FOREIGN KEY (`sessao_id`) REFERENCES `sessao` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `usuario_sessao_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;

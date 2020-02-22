-- Adminer 4.7.5 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `Event`;
CREATE TABLE `Event` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `serializeId` varchar(1000) COLLATE utf8_bin NOT NULL,
  `name` varchar(300) COLLATE utf8_bin NOT NULL,
  `topic` varchar(500) COLLATE utf8_bin DEFAULT NULL,
  `type` enum('CONFERENCE','MEETUP','WORKSHOP','HACKATHON') COLLATE utf8_bin NOT NULL,
  `web` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `city` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `year` year(4) DEFAULT NULL,
  `month` int(11) DEFAULT NULL,
  `days` varchar(5) COLLATE utf8_bin DEFAULT NULL,
  `time` varchar(8) COLLATE utf8_bin DEFAULT NULL COMMENT 'TODO: Maybe this should be type time',
  `price` int(11) DEFAULT NULL,
  `priceCurrency` enum('CZK','EUR') COLLATE utf8_bin DEFAULT NULL,
  `visibility` enum('PENDING','VISIBLE','HIDDEN','FEATURED') COLLATE utf8_bin NOT NULL DEFAULT 'PENDING',
  `note` text COLLATE utf8_bin COMMENT 'Only a hidden note not visible for visitors of the web',
  PRIMARY KEY (`id`),
  UNIQUE KEY `serializeId` (`serializeId`),
  UNIQUE KEY `name_topic` (`name`,`topic`),
  KEY `type` (`type`),
  KEY `city` (`city`),
  KEY `year` (`year`),
  KEY `month` (`month`),
  KEY `time` (`time`),
  KEY `price` (`price`),
  KEY `priceCurrency` (`priceCurrency`),
  KEY `visibility` (`visibility`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


DROP TABLE IF EXISTS `EventCode`;
CREATE TABLE `EventCode` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event_id` int(11) NOT NULL,
  `type` enum('DISCOUNT_PERCENT') COLLATE utf8_bin NOT NULL,
  `code` varchar(200) COLLATE utf8_bin NOT NULL,
  `value` float(10,2) NOT NULL COMMENT 'Here are the percents. Please write them in 0-1 interval, for example, 25% has value 0.25 here.',
  `note` text COLLATE utf8_bin COMMENT 'Only a hidden note not visible for visitors of the web',
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  KEY `type` (`type`),
  KEY `value` (`value`),
  CONSTRAINT `EventCode_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `Event` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Promo codes for events';


DROP TABLE IF EXISTS `Event_Newsletter`;
CREATE TABLE `Event_Newsletter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event_id` int(11) NOT NULL,
  `newsletter_id` int(11) NOT NULL,
  `status` enum('VISIBLE','HIDDEN') COLLATE utf8_bin NOT NULL,
  `note` text COLLATE utf8_bin COMMENT 'Only a hidden note not visible for visitors of the web',
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  KEY `newsletter_id` (`newsletter_id`),
  KEY `status` (`status`),
  CONSTRAINT `Event_Newsletter_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `Event` (`id`),
  CONSTRAINT `Event_Newsletter_ibfk_2` FOREIGN KEY (`newsletter_id`) REFERENCES `Newsletter` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Every newsletter has events implicitly set by its year and months. For example, for an email newsletter in March 2021, every visible and featured event on March 2021 will appear. This table sets special rules which should or should not be in the email.';


DROP TABLE IF EXISTS `Newsletter`;
CREATE TABLE `Newsletter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` year(4) NOT NULL,
  `month` int(11) NOT NULL,
  `note` text COLLATE utf8_bin COMMENT 'Only a hidden note not visible for visitors of the web',
  PRIMARY KEY (`id`),
  KEY `year` (`year`),
  KEY `month` (`month`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Each row means one newsletter mail which is sent each month';


SET NAMES utf8mb4;

DROP TABLE IF EXISTS `NewsletterContent`;
CREATE TABLE `NewsletterContent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `newsletter_id` int(11) NOT NULL,
  `position` enum('SUBJECT','HEAD','HEAD_CONFERENCES','HEAD_MEETUPS','HEAD_WORKSHOPS','HEAD_HACKATHONS','BOTTOM') COLLATE utf8_bin NOT NULL,
  `order` int(11) DEFAULT NULL,
  `html` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `note` text COLLATE utf8_bin COMMENT 'Only a hidden note not visible for visitors of the web',
  PRIMARY KEY (`id`),
  KEY `newsletter_id` (`newsletter_id`),
  KEY `position` (`position`),
  CONSTRAINT `NewsletterContent_ibfk_1` FOREIGN KEY (`newsletter_id`) REFERENCES `Newsletter` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Extra contents like paragraphs on top and PS on the bottom along with the events in the newsletter';


DROP TABLE IF EXISTS `Subscriber`;
CREATE TABLE `Subscriber` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(1000) COLLATE utf8_bin NOT NULL,
  `fullname` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `source` varchar(2000) COLLATE utf8_bin DEFAULT NULL,
  `created` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `active` smallint(6) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `email` (`email`),
  KEY `created` (`created`),
  KEY `active` (`active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


DROP VIEW IF EXISTS `Subscriber_active`;
CREATE TABLE `Subscriber_active` (`id` int(11), `to` text);


DROP TABLE IF EXISTS `Subscriber_active`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `Subscriber_active` AS select min(`Subscriber`.`id`) AS `id`,if((max(`Subscriber`.`fullname`) is not null),concat('"',max(`Subscriber`.`fullname`),'" <',`Subscriber`.`email`,'>'),`Subscriber`.`email`) AS `to` from `Subscriber` where (`Subscriber`.`active` = 1) group by `Subscriber`.`email` order by `id`;

-- 2020-02-22 00:41:23
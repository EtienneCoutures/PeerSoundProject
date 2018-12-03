SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;

DROP TABLE IF EXISTS `message`;

CREATE TABLE IF NOT EXISTS `message` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `message_insert` datetime NOT NULL,
  `sender_id` int NOT NULL,
  `dest_id` int NOT NULL,
  `content` text NOT NULL,
  `is_read` boolean default false,
  foreign key (`sender_id`) references user(`usr_id`),
  foreign key (`dest_id`) references user(`usr_id`),
  primary key (`message_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

SET FOREIGN_KEY_CHECKS=1;
COMMIT;

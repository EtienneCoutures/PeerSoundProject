SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;

DROP TABLE IF EXISTS `friend`;


CREATE TABLE IF NOT EXISTS `friend` (
  `friend_id` int NOT NULL,
  `friend_insert` datetime NOT NULL,
  `first_usr_id` int NOT NULL,
  `second_usr_id` int NOT NULL,
  foreign key (`first_usr_id`) references user(`usr_id`),
  foreign key (`second_usr_id`) references user(`usr_id`),
  primary key (`friend_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;


SET FOREIGN_KEY_CHECKS=1;
COMMIT;

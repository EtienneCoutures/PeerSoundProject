SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;

DROP TABLE IF EXISTS `follow`;

CREATE TABLE IF NOT EXISTS `follow` (
  `follow_id` int NOT NULL,
  `follow_insert` datetime NOT NULL,
  `followed_usr_id` int NOT NULL,
  `follower_usr_id` int NOT NULL,
  foreign key (`followed_usr_id`) references user(`usr_id`),
  foreign key (`follower_usr_id`) references user(`usr_id`),
  primary key (`follow_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;


SET FOREIGN_KEY_CHECKS=1;
COMMIT;

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;

DROP TABLE IF EXISTS `subscription`;


CREATE TABLE IF NOT EXISTS `subscription` (
  `sub_id` int NOT NULL,
  `sub_insert` datetime NOT NULL,
  `usr_id` int NOT NULL,
  `playlist_id` int NOT NULL,
  foreign key (`usr_id`) references user(`usr_id`),
  foreign key (`playlist_id`) references playlist(`playlist_id`),
  primary key (`sub_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;


SET FOREIGN_KEY_CHECKS=1;
COMMIT;

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;

DROP TABLE IF EXISTS `profile`;


CREATE TABLE IF NOT EXISTS `profile` (
  `profile_id` int NOT NULL,
  `profile_insert` datetime NOT NULL,
  `usr_id` int NOT NULL,
  /* set fields here, pour l'instant j'ai la flemme*/
  foreign key (`usr_id`) references user(`usr_id`),
  primary key (`profile_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;


SET FOREIGN_KEY_CHECKS=1;
COMMIT;

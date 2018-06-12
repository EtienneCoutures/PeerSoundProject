SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;

DROP TABLE IF EXISTS `invitation`;

CREATE TABLE IF NOT EXISTS `invitation` (
  `invitation_id` int NOT NULL AUTO_INCREMENT,
  `invitation_insert` datetime NOT NULL,
  `invitation_update` datetime NOT NULL,
  `inviter_usr_id` int NOT NULL,
  `invited_usr_id` int NOT NULL,
  `playlist_id` int NOT NULL,
  `invited_role` enum('super-admin', 'admin', 'member') NOT NULL DEFAULT "member",
  foreign key (`inviter_usr_id`) references user(`usr_id`),
  foreign key (`invited_usr_id`) references user(`usr_id`),
  foreign key (`playlist_id`) references playlist(`playlist_id`),
  primary key (`invitation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;


SET FOREIGN_KEY_CHECKS=1;
COMMIT;

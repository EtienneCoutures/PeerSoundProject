SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;

DROP TABLE IF EXISTS `music_of`;


CREATE TABLE IF NOT EXISTS `music_of` (
  `music_of_id` int NOT NULL,
  `music_of_insert` datetime NOT NULL,
  `added_by` int NOT NULL,
  `music_id` int NOT NULL,
  `playlist_id` int NOT NULL,
  foreign key (`music_id`) references music(`music_id`),
  foreign key (`playlist_id`) references playlist(`playlist_id`),
  primary key (`music_of_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;


SET FOREIGN_KEY_CHECKS=1;
COMMIT;

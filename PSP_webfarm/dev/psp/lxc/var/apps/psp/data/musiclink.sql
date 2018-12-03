-- SQL Dump

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;

--
-- Database : `mydb`
--

-- --------------------------------------------------------

--
-- Drop table
--
DROP TABLE IF EXISTS `musiclink`;

-- --------------------------------------------------------

--
-- Structure of the table `musiclink`
--
CREATE TABLE IF NOT EXISTS `musiclink` (
  `musiclink_id` int NOT NULL AUTO_INCREMENT,
  `music_id` int NOT NULL,
  `playlist_id` int NOT NULL,
  `usr_id` int NOT NULL,
  `musiclink_insert` datetime NOT NULL,
  `musiclink_update` datetime NOT NULL,
  foreign key (`usr_id`) references user(`usr_id`),
  foreign key (`music_id`) references music(`music_id`),
  foreign key (`playlist_id`) references playlist(`playlist_id`),
  primary key (`musiclink_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

--
-- Index for dumped tables
--

--
-- Index of the table `musiclink`
--

--
-- Constraints for dumped tables
--

--
-- Data for tables
--
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

--  insert into music values (1, "music", "rock", "c'est une music de test", "commentaire", NULL,'2018-01-27 00:00:00', '2018-01-17 00:00:00', "youtube", "mfDoom", "url", "2011", 1);

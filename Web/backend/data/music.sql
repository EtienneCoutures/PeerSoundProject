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
DROP TABLE IF EXISTS `music`;

-- --------------------------------------------------------

--
-- Structure of the table `music`
--
CREATE TABLE IF NOT EXISTS `music` (
  `music_id` int NOT NULL AUTO_INCREMENT,
  `music_name` varchar(255) NOT NULL,
  `music_description` text NOT NULL,
  `music_comment` text,
  `music_picture_default` varchar(255) NOT NULL,
  `music_insert` datetime NOT NULL,
  `music_update` datetime NOT NULL,
  `music_source` enum('youtube','spotify','deezer','else') NOT NULL,
  `music_group` text NOT NULL,
  `music_url` text NOT NULL,
  `music_date` text NOT NULL,
  `usr_id` int NOT NULL,
  `duration` varchar(255) DEFAULT "0.0",
  foreign key (`usr_id`) references user(`usr_id`),
  primary key (`music_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

--
-- Index for dumped tables
--

--
-- Index of the table `music`
--

--
-- Constraints for dumped tables
--
--
-- Data for tables
--
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

--  insert into music values (2, "music", "rap", "c'est une music de test", "commentaire", NULL,'2018-01-27 00:00:00', '2018-01-17 00:00:00', "youtube", "mfDoom", "url", "2011", 1);

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
  `music_id` int NOT NULL,
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
  foreign key (`usr_id`) references user(`usr_id`),
  primary key (`music_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

--
-- Index for dumped tables
--

--
-- Index of the table `music`
--
ALTER TABLE `music`
  MODIFY `music_id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Data for tables
--
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

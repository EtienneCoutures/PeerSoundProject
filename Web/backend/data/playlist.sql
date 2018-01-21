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
DROP TABLE IF EXISTS `playlist`;

-- --------------------------------------------------------

--
-- Structure of the table `playlist`
--
CREATE TABLE IF NOT EXISTS `playlist` (
  `playlist_id` int NOT NULL,
  `playlist_name` varchar(255) NOT NULL,
  `playlist_style` varchar(255) NOT NULL,
  `playlist_description` text NOT NULL,
  `playlist_comment` text,
  `playlist_insert` datetime NOT NULL,
  `playlist_update` datetime NOT NULL,
  `playlist_creator` int NOT NULL,
  foreign key (`playlist_creator`) references user(`usr_id`),
  primary key (`playlist_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

--
-- Index for dumped tables
--

--
-- Index of the table `playlist`
--
ALTER TABLE `playlist`
  MODIFY `playlist_id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Data for tables
--
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

-- insert into playlist values (1, "first_playlist", "rock", "c'est une playlist de test", NULL, '2018-01-27 00:00:00', '2018-01-17 00:00:00', 1);

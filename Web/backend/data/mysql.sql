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
-- Drop all table
--
DROP TABLE IF EXISTS `music`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `playlist`;

-- --------------------------------------------------------

--
-- Structure of the table `user`
--
CREATE TABLE IF NOT EXISTS `user` (
  `usr_id` int NOT NULL AUTO_INCREMENT,
  `usr_login` varchar(255),
  `usr_password` varchar(255) NOT NULL,
  `usr_email` varchar(255) NOT NULL,
  `usr_gender` enum('man','woman') NOT NULL DEFAULT "man",
  `usr_firstname` varchar(255) NOT NULL,
  `usr_lastname` varchar(255) NOT NULL,
  `usr_phone` varchar(255) NOT NULL,
  `usr_birthday` date NOT NULL,
  `usr_role` enum('super-admin','admin','member') NOT NULL DEFAULT "member",
  `usr_insert` datetime NOT NULL,
  `usr_update` datetime NOT NULL,
  `usr_status` enum('waiting','active','lock') NOT NULL DEFAULT "active",
  `usr_image` blob default NULL,
  primary key (`usr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

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
-- Index of the table `music`
--
ALTER TABLE `music`
  MODIFY `music_id` int NOT NULL AUTO_INCREMENT;

--
-- Index of the table `user`
--
ALTER TABLE `user`
  MODIFY `usr_id` int NOT NULL AUTO_INCREMENT,
  ADD KEY (`usr_login`),
  ADD UNIQUE KEY `usr_email` (`usr_email`);

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

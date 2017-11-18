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
  `music_source` enum('youtube','spotify','deezer','else') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

--
-- Structure of the table `user`
--
CREATE TABLE IF NOT EXISTS `user` (
  `usr_id` int NOT NULL,
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
  `usr_status` enum('waiting','active','lock') NOT NULL DEFAULT "active"
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

--
-- Index for dumped tables
--

--
-- Index of the table `music`
--
ALTER TABLE `music`
  ADD PRIMARY KEY (`music_id`),
  MODIFY `music_id` int NOT NULL AUTO_INCREMENT;

--
-- Index of the table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`usr_id`),
  MODIFY `usr_id` int NOT NULL AUTO_INCREMENT,
  ADD KEY (`usr_login`),
  ADD UNIQUE KEY `usr_email` (`usr_email`);

--
-- Constraints for dumped tables
--

--
-- Data for tables
--
alter table music add music_group text;
alter table user add image blob;

alter table music add usr_id INT;

alter table music add foreign key (`usr_id`) references user(`usr_id`);

alter table music add music_date text;

alter table music add url text;

SET FOREIGN_KEY_CHECKS=1;
COMMIT;

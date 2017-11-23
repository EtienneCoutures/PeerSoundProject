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
DROP TABLE IF EXISTS `user`;

-- --------------------------------------------------------

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
  `usr_status` enum('waiting','active','lock') NOT NULL DEFAULT "active",
  `usr_image` blob default NULL,
  primary key (`usr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

--
-- Index for dumped tables
--

--
-- Index of the table `user`
--
ALTER TABLE `user`
  MODIFY `usr_id` int NOT NULL AUTO_INCREMENT,
  ADD KEY (`usr_login`),
  ADD UNIQUE KEY `usr_email` (`usr_email`);

--
-- Constraints for dumped tables
--

--
-- Data for tables
--
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

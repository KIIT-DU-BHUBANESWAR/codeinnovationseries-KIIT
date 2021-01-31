-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 31, 2021 at 01:29 PM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `digibadev2`
--

-- --------------------------------------------------------

--
-- Table structure for table `badges`
--

CREATE TABLE `badges` (
  `skill_name` varchar(50) NOT NULL,
  `skill_code` varchar(50) NOT NULL,
  `badge_image` varchar(4096) DEFAULT NULL,
  `min_score` int(5) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `badges`
--

INSERT INTO `badges` (`skill_name`, `skill_code`, `badge_image`, `min_score`) VALUES
('ANDROID DEVELOPMENT', 'AD2020', 'android dev badge.png', 0),
('MACHINE LEARNING', 'ML2020', 'ml.png', 0),
('WEB DEVELOPMENT', 'WD2020', 'web dev.png', 0);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `category_desc` varchar(255) NOT NULL,
  `category_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `category_desc`, `category_date`) VALUES
(1, 'corruption', 'how to report a corruption , what are the laws regarding corruption etc.', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `comment_desc` varchar(1024) NOT NULL,
  `comment_date` datetime NOT NULL DEFAULT current_timestamp(),
  `comment_user_id` int(11) NOT NULL,
  `comment_likes` int(5) NOT NULL,
  `comment_dislikes` int(5) NOT NULL,
  `comment_thread_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `comment_desc`, `comment_date`, `comment_user_id`, `comment_likes`, `comment_dislikes`, `comment_thread_id`) VALUES
(1, 'Some organizations may have internal reporting system . you can also report to their seniors however the latter one is the most preferred one ', '2021-01-12 02:59:12', 5, 3, 2, 1),
(3, 'this is a sample comment to test the discussion forum', '2021-01-18 13:33:36', 5, 3, 2, 1),
(4, 'this is sample comment', '2021-01-18 13:33:57', 5, 2, 3, 1),
(5, 'this is sample comment', '2021-01-18 13:35:17', 5, 2, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `threads`
--

CREATE TABLE `threads` (
  `thread_id` int(11) NOT NULL,
  `thread_title` varchar(255) NOT NULL,
  `thread_desc` varchar(2024) NOT NULL,
  `thread_date` datetime NOT NULL DEFAULT current_timestamp(),
  `thread_user_id` int(5) NOT NULL,
  `thread_category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `threads`
--

INSERT INTO `threads` (`thread_id`, `thread_title`, `thread_desc`, `thread_date`, `thread_user_id`, `thread_category`) VALUES
(1, 'What to do if I suspect a corruption', 'I saw a person involved in the corruption , what to do and where should I report this', '2021-01-12 02:26:11', 5, 1),
(3, 'hello world', 'sample query', '2021-01-23 03:04:10', 5, 1),
(4, 'hello world', 'sample query', '2021-01-23 03:04:22', 5, 1),
(5, 'hello world', 'sample query', '2021-01-23 03:06:20', 5, 1),
(6, 'hello world', 'sample query', '2021-01-23 03:06:21', 5, 1),
(7, 'hello world', 'sample query', '2021-01-23 03:06:21', 5, 1),
(8, 'hello world', 'sample query', '2021-01-23 03:06:22', 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_achievements`
--

CREATE TABLE `user_achievements` (
  `user_mail` varchar(50) NOT NULL,
  `skill_code` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `remark` varchar(200) DEFAULT NULL,
  `score` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_achievements`
--

INSERT INTO `user_achievements` (`user_mail`, `skill_code`, `date`, `remark`, `score`) VALUES
('ankitkumar.adi13@gmail.com', 'WD2020', '2020-11-06', NULL, NULL),
('ankitkumar.adi13@gmail.com', 'ML2020', '2020-11-06', NULL, NULL),
('ankitkumar.adi13@gmail.com', 'AD2020', '2020-11-06', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `user_email` varchar(50) DEFAULT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `country` varchar(50) NOT NULL,
  `state` varchar(100) NOT NULL,
  `pincode` int(10) DEFAULT NULL,
  `organisation` varchar(100) NOT NULL,
  `dob` date DEFAULT NULL,
  `github` varchar(200) DEFAULT NULL,
  `facebook` varchar(200) DEFAULT NULL,
  `twitter` varchar(200) DEFAULT NULL,
  `linkedin` varchar(200) DEFAULT NULL,
  `portfolio` varchar(200) DEFAULT NULL,
  `gender` varchar(1) NOT NULL,
  `profile_image` varchar(1024) DEFAULT NULL,
  `resume` varchar(4096) DEFAULT NULL,
  `moto` varchar(100) DEFAULT NULL,
  `profession` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`user_email`, `firstname`, `lastname`, `address`, `country`, `state`, `pincode`, `organisation`, `dob`, `github`, `facebook`, `twitter`, `linkedin`, `portfolio`, `gender`, `profile_image`, `resume`, `moto`, `profession`) VALUES
('ankitkumar.adi13@gmail.com', 'ankit ', 'kumar', 'malti bhawan', 'INDIA', 'JHARKHAND', 831013, 'KIIT UNIVERSITY', '2020-11-06', 'github link', 'facebook link', 'twitter link', 'linkedin link', 'portfolio link', 'M', NULL, NULL, 'live in peace', 'PROFESSIONAL'),
('aman@kiit.ac.in', 'aman', 'kumar', 'h.no-1840 , malti bhawan , jay prakash nagar', 'india', 'JHK', 831013, 'KIIT', '2020-11-07', 'github', 'facebook', 'twitter', 'linkedin', 'portfolio', 'M', 'ankit pic.jpg', 'ANKIT KUMAR-resume.pdf', 'live peace', 'STUDENT'),
('aman@kiit.ac.in', 'aman', 'kumar', 'h.no-1840,malti bhawan,jay prakash nagar', 'india', 'JHK', 831013, 'KIIT', '2020-11-07', 'github', 'facebook', 'twitter', 'linkedin', 'portfolio', 'M', 'ankit pic.jpg', 'ANKIT KUMAR-resume.pdf', 'live happy', 'STUDENT'),
('aman@kiit.ac.in', 'aman', 'kumar', 'h.no-1840,malti bhawan,jay prakash nagar', 'india', 'JHK', 831013, 'KIIT', '2020-11-07', 'github', 'facebook', 'twitter', 'linkedin', 'portfolio', 'M', 'ankit pic.jpg', 'ANKIT KUMAR-resume.pdf', 'live happy', 'STUDENT'),
('aman@kiit.ac.in', 'aman', 'kumar', 'h.no-1840,malti bhawan,jay prakash nagar', 'india', 'JHK', 831013, 'KIIT', '2020-11-07', 'github', 'facebook', 'twitter', 'linkedin', 'portfolio', 'M', 'ankit pic.jpg', 'ANKIT KUMAR-resume.pdf', 'live happy', 'STUDENT'),
('aman@kiit.ac.in', 'aman', 'kumar', 'h.no-1840,malti bhawan,jay prakash nagar', 'india', 'JHK', 831013, 'KIIT', '2020-11-07', 'github', 'facebook', 'twitter', 'linkedin', 'portfolio', 'M', 'ankit pic.jpg', 'ANKIT KUMAR-resume.pdf', 'live happy', 'STUDENT'),
('aman@kiit.ac.in', 'aman', 'kumar', 'h.no-1840,malti bhawan,jay prakash nagar', 'india', 'JHK', 831013, 'KIIT', '2020-11-07', 'github', 'facebook', 'twitter', 'linkedin', 'portfolio', 'M', 'ankit pic.jpg', 'ANKIT KUMAR-resume.pdf', 'live happy', 'STUDENT');

-- --------------------------------------------------------

--
-- Table structure for table `user_login`
--

CREATE TABLE `user_login` (
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `flag` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_login`
--

INSERT INTO `user_login` (`email`, `password`, `flag`) VALUES
('1805661@kiit.ac.in', '123', 0),
('aman@kiit.ac.in', '123', 0),
('ankesh@gmail.com', '123', 0),
('ankit@gmail.com', '123', 0),
('ankitkumar.adi13@gmail.com', '123', 0),
('ashish@gmail.com', '123', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `badges`
--
ALTER TABLE `badges`
  ADD PRIMARY KEY (`skill_code`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `user_foreign` (`comment_user_id`),
  ADD KEY `thread_foreign_key` (`comment_thread_id`);

--
-- Indexes for table `threads`
--
ALTER TABLE `threads`
  ADD PRIMARY KEY (`thread_id`),
  ADD KEY `user_foreign_key` (`thread_user_id`),
  ADD KEY `category_foreign_key` (`thread_category`);
ALTER TABLE `threads` ADD FULLTEXT KEY `thread_title` (`thread_title`,`thread_desc`);

--
-- Indexes for table `user_achievements`
--
ALTER TABLE `user_achievements`
  ADD KEY `user_foreign` (`user_mail`),
  ADD KEY `skill foreign` (`skill_code`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD KEY `foreign key` (`user_email`);

--
-- Indexes for table `user_login`
--
ALTER TABLE `user_login`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `threads`
--
ALTER TABLE `threads`
  MODIFY `thread_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_details`
--
ALTER TABLE `user_details`
  ADD CONSTRAINT `foreign key` FOREIGN KEY (`user_email`) REFERENCES `user_login` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

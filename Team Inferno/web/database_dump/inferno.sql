-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 30, 2021 at 04:24 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inferno`
--

-- --------------------------------------------------------

--
-- Table structure for table `brain_mri`
--

CREATE TABLE `brain_mri` (
  `id` int(11) NOT NULL,
  `pat_id` int(11) NOT NULL,
  `patient_mri` varchar(150) NOT NULL,
  `patient_doc` varchar(150) NOT NULL,
  `is_tumor` tinyint(1) DEFAULT NULL,
  `is_done` tinyint(1) NOT NULL,
  `date` datetime DEFAULT NULL
) ;

--
-- Dumping data for table `brain_mri`
--

INSERT INTO `brain_mri` (`id`, `pat_id`, `patient_mri`, `patient_doc`, `is_tumor`, `is_done`, `date`) VALUES
(1, 1, 'mri_scan.jpeg', 'addl_doc.doc', 1, 1, '2021-01-30 20:51:45');

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `id` int(11) NOT NULL,
  `d_id` varchar(100) DEFAULT NULL,
  `f_name` varchar(80) NOT NULL,
  `l_name` varchar(80) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `age` int(11) NOT NULL,
  `designation` varchar(200) NOT NULL,
  `email` varchar(120) NOT NULL,
  `password` varchar(200) NOT NULL,
  `reg_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`id`, `d_id`, `f_name`, `l_name`, `gender`, `age`, `designation`, `email`, `password`, `reg_date`) VALUES
(1, 'gkf2urtg4583q47', 'John', 'Doe', 'Male', 49, 'Surgeon', 'doctor@doctor.com', 'doctor', '2021-01-30 20:46:39');

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `id` int(11) NOT NULL,
  `p_id` varchar(100) DEFAULT NULL,
  `f_name` varchar(80) NOT NULL,
  `l_name` varchar(80) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `age` int(11) NOT NULL,
  `email` varchar(120) NOT NULL,
  `password` varchar(200) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `reg_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`id`, `p_id`, `f_name`, `l_name`, `gender`, `age`, `email`, `password`, `phone`, `reg_date`) VALUES
(1, 'krf8utqz1679l71', 'Jane', 'Doe', 'Female', 35, 'patient@patient.com', 'patient', '1234567890', '2021-01-30 20:47:55');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brain_mri`
--
ALTER TABLE `brain_mri`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pat_id` (`pat_id`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `d_id` (`d_id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `p_id` (`p_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brain_mri`
--
ALTER TABLE `brain_mri`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `brain_mri`
--
ALTER TABLE `brain_mri`
  ADD CONSTRAINT `brain_mri_ibfk_1` FOREIGN KEY (`pat_id`) REFERENCES `patient` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

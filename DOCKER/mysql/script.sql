CREATE DATABASE  IF NOT EXISTS `carRentalDB` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `carRentalDB`;
-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: carRentalDB
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `CarModels`
--

DROP TABLE IF EXISTS `CarModels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CarModels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `fuel` varchar(3) NOT NULL,
  `body` varchar(10) NOT NULL,
  `productionYear` int DEFAULT NULL,
  `enginePower` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `MakeId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `MakeId` (`MakeId`),
  CONSTRAINT `carmodels_ibfk_1` FOREIGN KEY (`MakeId`) REFERENCES `Makes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CarModels`
--

LOCK TABLES `CarModels` WRITE;
/*!40000 ALTER TABLE `CarModels` DISABLE KEYS */;
INSERT INTO `CarModels` VALUES (1,'X5','ON','SUV',2020,200,'2021-06-21 18:35:27','2021-06-21 18:35:27',1),(2,'Q7','ON','SUV',2019,220,'2021-06-21 18:35:27','2021-06-21 18:35:27',2),(3,'Cayenne GTS Coupe','PB','SUV',2021,650,'2021-06-21 18:35:27','2021-06-21 18:35:27',3);
/*!40000 ALTER TABLE `CarModels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cars`
--

DROP TABLE IF EXISTS `Cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cars` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cost` int NOT NULL,
  `VIN` int NOT NULL,
  `availability` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `CarModelId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `CarModelId` (`CarModelId`),
  CONSTRAINT `cars_ibfk_1` FOREIGN KEY (`CarModelId`) REFERENCES `CarModels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cars`
--

LOCK TABLES `Cars` WRITE;
/*!40000 ALTER TABLE `Cars` DISABLE KEYS */;
INSERT INTO `Cars` VALUES (1,250,2334433,1,'2021-06-21 18:35:27','2021-06-21 18:35:27',1),(2,275,111111,1,'2021-06-21 18:35:27','2021-06-21 18:35:27',2),(3,999,666,1,'2021-06-21 18:35:27','2021-06-21 18:35:27',3);
/*!40000 ALTER TABLE `Cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Makes`
--

DROP TABLE IF EXISTS `Makes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Makes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Makes`
--

LOCK TABLES `Makes` WRITE;
/*!40000 ALTER TABLE `Makes` DISABLE KEYS */;
INSERT INTO `Makes` VALUES (1,'BMW','2021-06-21 18:35:27','2021-06-21 18:35:27'),(2,'AUDI','2021-06-21 18:35:27','2021-06-21 18:35:27'),(3,'PORSCHE','2021-06-21 18:35:27','2021-06-21 18:35:27');
/*!40000 ALTER TABLE `Makes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Transactions`
--

DROP TABLE IF EXISTS `Transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cost` int DEFAULT NULL,
  `rentDate` date NOT NULL,
  `returnDate` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `CarId` int NOT NULL,
  `UserId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `CarId` (`CarId`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`CarId`) REFERENCES `Cars` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Transactions`
--

LOCK TABLES `Transactions` WRITE;
/*!40000 ALTER TABLE `Transactions` DISABLE KEYS */;
INSERT INTO `Transactions` VALUES (1,1250,'2021-05-15','2021-05-18','2021-06-21 18:35:27','2021-06-21 18:35:27',1,1),(2,2000,'2021-05-20','2021-05-25','2021-06-21 18:35:27','2021-06-21 18:35:27',2,2);
/*!40000 ALTER TABLE `Transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `role` varchar(5) NOT NULL DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Admin','Admin','admin','$2a$08$4BZCMa63qICjJV.i87uW2O1XO82r3gHy8fOwnsVvPIPG2WxxWZ376','123456789','admin','2021-06-21 18:35:27','2021-06-21 18:35:27'),(2,'Example','User','example@user.com','$2a$08$uni2rRx3xUiOtj/Yx9ISCOZ4OzLpc2YM9q4Ql18sg5aJu2IPrTzGy','444444444','user','2021-06-21 18:35:27','2021-06-21 18:35:27');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-21 20:41:46

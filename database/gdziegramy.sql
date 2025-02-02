-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: gdziegramy
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adresses`
--

DROP TABLE IF EXISTS `adresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adresses` (
  `AdressID` int NOT NULL AUTO_INCREMENT,
  `number` int NOT NULL,
  `street` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `coordinates` point NOT NULL /*!80003 SRID 0 */,
  PRIMARY KEY (`AdressID`),
  UNIQUE KEY `AdressID_UNIQUE` (`AdressID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adresses`
--

LOCK TABLES `adresses` WRITE;
/*!40000 ALTER TABLE `adresses` DISABLE KEYS */;
INSERT INTO `adresses` VALUES (4,20,'Kromera','Olsztyn',_binary '\0\0\0\0\0\0\0\ý└9#J\ŃJ@\r\Ó-Éáx4@'),(5,30,'Zachodnia','Krak├│w',_binary '\0\0\0\0\0\0\0B`\ň\đ\"I@\┘=yX\Ŕ3@'),(6,30,'Zachodnia','Krak├│w',_binary '\0\0\0\0\0\0\0ű\\m\┼■I@;\▀OŹŚn3@'),(7,30,'Zachodnia','Krak├│w',_binary '\0\0\0\0\0\0\0ű\\m\┼■I@;\▀OŹŚn3@'),(8,44,'united','Manchester',_binary '\0\0\0\0\0\0\0\nÎúp=*A@«G\ßzÄ6@'),(9,32,'kromera','Krak├│w',_binary '\0\0\0\0\0\0\09┤\╚vżĆE@V-▓ŁĆE@'),(10,1,'Stradomska','Krak├│w',_binary '\0\0\0\0\0\0\0\┼U┌É\ÔI@\▀\'ôtq\­3@'),(11,0,'Pastelowa','Krak├│w',_binary '\0\0\0\0\0\0\0\nĆiŽAI@fZ\ß■R\ŕ3@'),(12,13,'Gronostajowa','Krak├│w',_binary '\0\0\0\0\0\0\0CvDaI@\Ŕcu╣\╠\Ŕ3@'),(13,0,'Floria┼äska','Krak├│w',_binary '\0\0\0\0\0\0\081;\┌I@ü\0p▒░\´3@'),(14,0,'Sko┼Ťna','Krak├│w',_binary '\0\0\0\0\0\0\0y1Q\ËdI@ż\┼\§R\Š3@'),(15,0,'Sko┼Ťna','Krak├│w',_binary '\0\0\0\0\0\0\0\ńô%]I@kéź`\Š3@'),(16,3,'Borsucza','Krak├│w',_binary '\0\0\0\0\0\0\0K~ť\Ô«I@4h╣\Ý3@'),(17,107,'Kobierzy┼äska','Krak├│w',_binary '\0\0\0\0\0\0\0D6U8#I@\Ď\ýÁ{\Ŕ3@'),(18,24,'Aleja Pokoju','Krak├│w',_binary '\0\0\0\0\0\0\0\´Kűg\ĐI@\¸p\Z▓˙3@'),(19,0,'Plac Na Stawach','Krak├│w',_binary '\0\0\0\0\0\0\0hË▒ŘI@5PQMâ\Ű3@');
/*!40000 ALTER TABLE `adresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courts`
--

DROP TABLE IF EXISTS `courts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courts` (
  `CourtID` int NOT NULL AUTO_INCREMENT,
  `AdressID` int NOT NULL,
  `SportID` int NOT NULL,
  PRIMARY KEY (`CourtID`),
  KEY `AdressID` (`AdressID`),
  KEY `SportID` (`SportID`),
  CONSTRAINT `courts_ibfk_1` FOREIGN KEY (`AdressID`) REFERENCES `adresses` (`AdressID`),
  CONSTRAINT `courts_ibfk_2` FOREIGN KEY (`SportID`) REFERENCES `sports` (`SportID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courts`
--

LOCK TABLES `courts` WRITE;
/*!40000 ALTER TABLE `courts` DISABLE KEYS */;
INSERT INTO `courts` VALUES (9,7,3),(10,8,1),(11,9,1),(12,10,3),(13,11,1),(14,12,1),(15,13,3),(16,14,1),(17,15,2),(18,16,1),(19,17,4),(20,18,1),(21,19,4);
/*!40000 ALTER TABLE `courts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `EventID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `CourtID` int NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `LevelID` tinyint NOT NULL,
  `UserID` int NOT NULL,
  `SportID` int NOT NULL,
  PRIMARY KEY (`EventID`),
  KEY `CourtID` (`CourtID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`CourtID`) REFERENCES `courts` (`CourtID`),
  CONSTRAINT `events_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'granko',9,'2021-01-28 15:00:00','2021-01-28 16:00:00',4,1,3),(2,'nowe',9,'2021-01-19 16:02:00','2021-01-19 17:02:00',2,6,3),(3,'new',10,'2021-01-25 15:22:00','2021-01-25 16:22:00',2,6,1),(4,'nowe',11,'2021-02-23 13:35:00','2021-02-24 10:39:00',1,6,1),(5,'final mundialu',10,'2021-03-31 15:17:00','2021-03-31 15:17:00',2,6,1),(6,'blabla',11,'2021-05-21 12:05:00','2021-05-21 15:04:00',2,6,1),(7,'tescik',13,'2021-05-13 17:17:00','2021-05-14 17:17:00',2,6,1),(8,'eeeee',13,'2021-04-30 16:16:00','2021-04-30 21:20:00',5,6,1),(9,'nazwa',12,'2021-04-21 14:36:00','2021-04-21 18:36:00',1,6,3),(10,'nowe',13,'2021-04-29 14:52:00','2021-04-29 17:52:00',3,6,1),(11,'kolejnosc',13,'2021-05-01 17:29:00','2021-05-01 19:29:00',1,6,1),(12,'123',13,'2021-05-02 09:58:00','2021-05-02 11:58:00',1,6,1),(13,'123',13,'2021-05-20 16:54:00','2021-05-20 17:54:00',1,6,1),(14,'siatka',12,'2021-05-12 22:52:00','2021-05-14 14:52:00',1,6,3);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `levels`
--

DROP TABLE IF EXISTS `levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `levels` (
  `LevelID` tinyint NOT NULL,
  `levelName` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`LevelID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `levels`
--

LOCK TABLES `levels` WRITE;
/*!40000 ALTER TABLE `levels` DISABLE KEYS */;
INSERT INTO `levels` VALUES (1,'Pocz─ůtkuj─ůcy'),(2,'Amator'),(3,'┼Ürednio-zaawansowany'),(4,'Zaawansowany'),(5,'Profesjonalista');
/*!40000 ALTER TABLE `levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participants`
--

DROP TABLE IF EXISTS `participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participants` (
  `EventID` int NOT NULL,
  `UserID` int NOT NULL,
  PRIMARY KEY (`UserID`,`EventID`),
  KEY `EventID` (`EventID`),
  CONSTRAINT `participants_ibfk_1` FOREIGN KEY (`EventID`) REFERENCES `events` (`EventID`),
  CONSTRAINT `participants_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participants`
--

LOCK TABLES `participants` WRITE;
/*!40000 ALTER TABLE `participants` DISABLE KEYS */;
INSERT INTO `participants` VALUES (1,1),(2,6),(3,6),(5,6),(5,12),(7,6),(13,6),(14,6);
/*!40000 ALTER TABLE `participants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sports`
--

DROP TABLE IF EXISTS `sports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sports` (
  `SportID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`SportID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sports`
--

LOCK TABLES `sports` WRITE;
/*!40000 ALTER TABLE `sports` DISABLE KEYS */;
INSERT INTO `sports` VALUES (1,'Pi┼éka no┼╝na'),(2,'Koszyk├│wka'),(3,'Siatk├│wka'),(4,'Tenis');
/*!40000 ALTER TABLE `sports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_ratings`
--

DROP TABLE IF EXISTS `user_ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_ratings` (
  `UserID` int NOT NULL,
  `rating` tinyint NOT NULL,
  `judge` int NOT NULL,
  KEY `UserID` (`UserID`),
  KEY `judge` (`judge`),
  CONSTRAINT `user_ratings_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`),
  CONSTRAINT `user_ratings_ibfk_2` FOREIGN KEY (`judge`) REFERENCES `users` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_ratings`
--

LOCK TABLES `user_ratings` WRITE;
/*!40000 ALTER TABLE `user_ratings` DISABLE KEYS */;
INSERT INTO `user_ratings` VALUES (1,1,6),(6,3,1),(10,1,6),(1,5,10),(6,1,12),(12,4,6);
/*!40000 ALTER TABLE `user_ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `Name_UNIQUE` (`Name`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'koszykasz','basketball','basket@ball.pl'),(2,'pilkasz','football','foot@ball.pl'),(3,'siatkasz','voleyball','voley@ball.pl'),(4,'Mariusz','maroczaro','maro@czaro.pl'),(5,'mrpolska','dziendobry','elo@melo.pl'),(6,'1','2','2'),(9,'jeden','trzy','dwa'),(10,'test','test','test'),(12,'miko┼éaj','123','123'),(16,'5','5','5'),(17,'6','6','6');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-07 17:33:19

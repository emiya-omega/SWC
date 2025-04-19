CREATE DATABASE IF NOT EXISTS studywork;
USE studywork;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phone VARCHAR(15) NOT NULL UNIQUE,
    nickname VARCHAR(50) NOT NULL UNIQUE, 
    age INT NOT NULL,
    gender ENUM('male', 'female') NOT NULL,
    password VARCHAR(255) NOT NULL
);
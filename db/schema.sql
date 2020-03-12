DROP DATABASE IF EXISTS krustykrab_db;
CREATE DATABASE krustykrab_db;
USE krustykrab_db;

CREATE TABLE burger (
    id INT NOT NULL AUTO_INCREMENT,
    burger_name VARCHAR(50) NOT NULL,
    devoured BOOLEAN,
    PRIMARY KEY (id)
);
CREATE DATABASE IF NOT EXISTS test; 
USE test;
-- DROP TABLE IF EXISTS user;
CREATE TABLE user (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name varchar(100),
  id_num varchar(40),
  id_pic varchar(250)
);

INSERT INTO user VALUES (null, "vitalik buterin", "12456789", "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcR3xI3ItbtaTa06kb2vFizJ03Hw2fQ-U-i7Clke7vhloKAQX_NWOX9-T4yTQu4XjbLsF9GQ6BmOe6406Ws");
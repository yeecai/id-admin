CREATE DATABASE IF NOT EXISTS test; 
USE test;
-- DROP TABLE IF EXISTS admin;
CREATE TABLE admin (
  uuid VARCHAR(36) not null comment 'admin id',
  name varchar(100) not null comment 'admin account',
  passwd varchar(40) not null comment 'password',
  salt char(6) not null comment 'password salt'
) comment='admin user table';

-- INSERT INTO admin VALUES (uuid(), "vitalik buterin", '123', '456')
-- alter table admin change column passwd_salt salt char(6);
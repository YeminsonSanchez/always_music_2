CREATE DATABASE class;

\c class 

CREATE TABLE student (
  rut VARCHAR(15) PRIMARY KEY,
  name VARCHAR(30),
  course VARCHAR(30),
  level INT
);
DROP TABLE IF EXISTS user;

CREATE TABLE user (
    id serial PRIMARY KEY,
    username varchar(30) NOT NULL,
    password char(60) NOT NULL
);

DROP TABLE IF EXISTS habit;

CREATE TABLE habit (
    id serial PRIMARY KEY,
    name varchar(20) NOT NULL,
    repetitions INT NOT NULL,
    frequency varchar(20) NOT NULL,
    completed boolean NOT NULL
);

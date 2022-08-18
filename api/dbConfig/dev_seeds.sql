DROP TABLE IF EXISTS userAccount;

CREATE TABLE userAccount (
    id serial PRIMARY KEY,
    username varchar(30) NOT NULL,
    password char(60) NOT NULL
);

DROP TABLE IF EXISTS habit;

CREATE TABLE habit (
    id serial PRIMARY KEY,
    name varchar(50) NOT NULL,
    repetitions INT NOT NULL,
    frequency varchar(20) NOT NULL,
    completed boolean NOT NULL,
    streak INT NOT NULL,
    user_id INT 
);

INSERT INTO userAccount (username, password) 
VALUES
(
    'Molly234',
    'frangipane'
),
(
    'captainFantastic',
    'password12'
),
(
    'Joe_User',
    'password3'
),
(
    'SteveO555',
    'password4'
);

INSERT INTO habit (name, repetitions, frequency, completed, streak) 
VALUES
(
    'Gym',
    5,
    'Weekly',
    true,
    3
),
(
    'Drink Water 2 litres',
    1,
    'Daily',
    false,
    3
),
(
    'Sleep 8 hours',
    1,
    'Daily',
    false,
    3
),
(
    'Meditation',
    2,
    'Daily',
    true,
    3
);

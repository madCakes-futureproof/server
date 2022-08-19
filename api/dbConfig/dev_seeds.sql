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
    '$2b$10$c2lJLFUrQTfBCq2Z0qH9T.SOn93dkwgpkq7maBVvo1u4TRcxTOYAW'
),
(
    'captainFantastic',
    '$2b$10$kB1R2OR6/z.k7WEkrPbDO.OWEWjM3uzuQoIWS.W1uIJkdIoH3BSuy'
),
(
    'Joe_User',
    '$2b$10$/UXFN6kmzbm8CZha2Kj5OuMDDn4UXpb65ScKmECe9gC5eaZv1ua1e'
),
(
    'SteveO555',
    '$2b$10$fZbK4QXNOj5vZ0k1wdJVau3hJaBJ753ULCTaGMQdJNqlth42d7hca'
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

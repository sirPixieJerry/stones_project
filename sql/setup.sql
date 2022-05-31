-- PLEASE CHANGE IF NECCESSARY -->

-- drop existing table
DROP TABLE IF EXISTS password_reset;
DROP TABLE IF EXISTS chat_messages;
DROP TABLE IF EXISTS texture_data;

-- create user table:
CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     first_name VARCHAR(255) NOT NULL,
     last_name VARCHAR(255) NOT NULL,
     email VARCHAR(50) NOT NULL UNIQUE,
     texture_url TEXT,
     password_hash VARCHAR NOT NULL,
     created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- create user password reset:
CREATE TABLE password_reset (
     id SERIAL PRIMARY KEY,
     code VARCHAR(6) NOT NULL,
     email VARCHAR(50) NOT NULL,
     created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE texture_data (
     id SERIAL PRIMARY KEY,
     texture_data TEXT
)
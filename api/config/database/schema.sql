CREATE SCHEMA IF NOT EXISTS skdl_api;

DROP TABLE IF EXISTS skdl_api.login CASCADE;
CREATE TABLE skdl_api.login (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password_hash VARCHAR NOT NULL,
    avatar_url VARCHAR NOT NULL
);

DROP TABLE IF EXISTS skdl_api.patient CASCADE;
CREATE TABLE skdl_api.patient (
    id SERIAL PRIMARY KEY,
    login_id INTEGER REFERENCES skdl_api.login (id),
    phone CHAR(11) NOT NULL,
    cpf CHAR(11) NOT NULL
);

DROP TABLE IF EXISTS skdl_api.provider CASCADE;
CREATE TABLE skdl_api.provider (
    id SERIAL PRIMARY KEY,
    login_id INTEGER REFERENCES skdl_api.login (id)
);


DROP TABLE IF EXISTS skdl_api.timeslots CASCADE;
CREATE TABLE skdl_api.timeslots(
    id SERIAL PRIMARY KEY,
    provider_id INTEGER REFERENCES skdl_api.provider (id),
    starts_at TIMESTAMP WITH TIME ZONE,
    ends_at TIMESTAMP WITH TIME ZONE 
);
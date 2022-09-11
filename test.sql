CREATE TABLE Users(
   id SERIAL PRIMARY KEY,
   firstName varchar(32) NOT NULL,
   lastName varchar(32) NOT NULL,
   email VARCHAR(128) NOT NULL UNIQUE,
   pseudo VARCHAR(64) UNIQUE,
   password VARCHAR(255) NOT NULL,
   isAdmin boolean default false
);

CREATE TABLE Orders(
   id SERIAL PRIMARY KEY,
   user_id INT NOT NULL,
   basket_id INT NOT NULL,
   address VARCHAR(255) NOT NULL,
   payed boolean default false,
   delivered boolean default false
);

CREATE TABLE Baskets(
   id SERIAL PRIMARY KEY,
   user_id INT NOT NULL,
   items JSON,
   ordered boolean default false,
   hidden boolean default false
);

CREATE TABLE Items (
   id SERIAL PRIMARY KEY,
   name varchar(32) NOT NULL,
   description varchar(255),
   price INT NOT NULL,
   quantity INT NOT NULL,
   picture BYTEA
);
CREATE TABLE users (
  id         INTEGER PRIMARY KEY,
  username   TEXT,
  email   TEXT,
  password   TEXT
);

INSERT INTO users (id, username)
  VALUES (1, 'example user 1', 'email1@mail.com', 'admin'),
         (2, 'example user 2', 'email2@mail.com', 'admin'),
         (3, 'example user 3', 'email3@mail.com', 'admin');
         
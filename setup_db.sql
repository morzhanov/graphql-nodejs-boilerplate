CREATE TABLE "user" (
  id         INTEGER,
  username   TEXT,
  email   TEXT,
  password   TEXT
);

INSERT INTO "user" (id, username, email, password)
  VALUES (1, 'example user 1', 'email1@mail.com', 'admin'),
         (2, 'example user 2', 'email2@mail.com', 'admin'),
         (3, 'example user 3', 'email3@mail.com', 'admin');
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

CREATE TABLE "post" (
  id         INTEGER,
  url        TEXT,
  likes      INTEGER,
  owner      INTEGER
);

INSERT INTO "post"  (id, url, likes, owner)
   VALUES (1, 'http://url.com', 10, 1),
          (2, 'http://url.com', 20, 2),
          (3, 'http://url.com', 30, 3);
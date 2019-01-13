BEGIN ;
DROP TABLE IF EXISTS users, messages;

CREATE TABLE users (
Id SERIAL PRIMARY KEY ,
first_name VARCHAR(100) NOT NULL ,
surname VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE,
gender VARCHAR(100) NOT NULL,
password TEXT NOT NULL
);

CREATE TABLE messages (
id SERIAL PRIMARY KEY,
user_ID INTEGER,
title TEXT,
body TEXT,
FOREIGN KEY (user_ID) REFERENCES users(Id) ON DELETE CASCADE
);

insert into users (first_name, surname, email, gender, password) values 
('ahmad' , 'libda', 'aa@aa.aa','male', '$2a$10$t3bm8JUU3dwAvUpE0Pr/e.S5XDnaX./JaGpIv5uDX7I51n4JVKH42'),
('marwan' , 'elkhoudary', 'mm@mm.mm','male', '$2a$10$t3bm8JUU3dwAvUpE0Pr/e.S5XDnaX./JaGpIv5uDX7I51n4JVKH42');


insert into messages(user_ID, title, body) values
(1,'Math','Hussam'),
(1,'Arabic','Ali'),
(1,'English','Yousef'),
(2,'Math','Hussam'),
(2,'English','Yousef'),
(2,'Math','Hussam');

COMMIT;
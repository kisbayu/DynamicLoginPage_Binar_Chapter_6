--drop existing table
DROP TABLE IF EXISTS user_game;
DROP TABLE IF EXISTS user_game_biodata;
DROP TABLE IF EXISTS user_game_history;

--user_game
create table user_game
(user_id serial primary key,
 user_name varchar(50) NOT NULL,
 user_email varchar(50) UNIQUE NOT NULl,
 user_password varchar(255) NOT NULL
);

--user_game_biodata
CREATE TABLE user_game_biodata(
bio_id SERIAL PRIMARY KEY,
user_id INT NOT NULL,
bio_age INT,
bio_city VARCHAR(50),
CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES user_game(user_id)
);

--user_game_history
CREATE TABLE user_game_history(
history_id SERIAL PRIMARY KEY,
user_id INT NOT NULL,
history_win_count INT,
history_lose_count INT,
CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES user_game(user_id)
);

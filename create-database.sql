DROP DATABASE IF EXISTS `sql_music_service`;
CREATE DATABASE `sql_music_service`; 
USE `sql_music_service`;

SET NAMES utf8 ;
SET character_set_client = utf8mb4 ;

CREATE TABLE `songs`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `length` TIME NOT NULL,
    `artist` INT UNSIGNED NOT NULL,
    `album` INT UNSIGNED NULL,
    `track_number` INT NOT NULL,
    `lyrics` TEXT NOT NULL,
    `youtube_link` VARCHAR(255) NOT NULL,
    `thumbnails` VARCHAR(255) NOT NULL,
    `created_at` DATE NOT NULL,
    `upload_at` DATE NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `albums`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `artist` INT UNSIGNED NOT NULL,
    `cover_img` VARCHAR(255) NOT NULL,
    `created_at` DATE NOT NULL,
    `upload_at` DATE NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `artists`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `cover_img` VARCHAR(255) NOT NULL,
    `created_at` DATE NOT NULL,
    `upload_at` DATE NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `playlists`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `cover_img` VARCHAR(255) NOT NULL,
    `created_at` DATE NOT NULL,
    `upload_at` DATE NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` CHAR(8) NOT NULL,
    `created_at` DATE NOT NULL,
    `upload_at` DATE NOT NULL,
    `is_admin` TINYINT(1) NOT NULL,
    `preferences` JSON NOT NULL,
    `remember_token` TINYINT(1) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `songs_in_playlists`(
    `playlist_id` INT UNSIGNED NOT NULL,
    `song_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`playlist_id`, `song_id`)
);

CREATE TABLE `interactions`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED NOT NULL,
    `song_id` INT UNSIGNED NOT NULL,
    `is_liked` TINYINT(1) NOT NULL,
    `play_count` INT NOT NULL,
    `created_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`)
);

ALTER TABLE
    `songs` ADD CONSTRAINT `songs_artist_foreign` FOREIGN KEY(`artist`) REFERENCES `artists`(`id`);
ALTER TABLE
    `songs` ADD CONSTRAINT `songs_album_foreign` FOREIGN KEY(`album`) REFERENCES `albums`(`id`);
ALTER TABLE
    `albums` ADD CONSTRAINT `albums_artist_foreign` FOREIGN KEY(`artist`) REFERENCES `artists`(`id`);
ALTER TABLE
    `songs_in_playlists` ADD CONSTRAINT `songs_in_playlists_playlist_id_foreign` FOREIGN KEY(`playlist_id`) REFERENCES `playlists`(`id`);
ALTER TABLE
    `songs_in_playlists` ADD CONSTRAINT `songs_in_playlists_song_id_foreign` FOREIGN KEY(`song_id`) REFERENCES `songs`(`id`);
ALTER TABLE
    `interactions` ADD CONSTRAINT `interactions_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
ALTER TABLE
    `interactions` ADD CONSTRAINT `interactions_song_id_foreign` FOREIGN KEY(`song_id`) REFERENCES `songs`(`id`);
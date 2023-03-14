drop database if exists meepledb;

create database meepledb;

use meepledb;

create table users (

    user_id int auto_increment,
    username varchar(128) not null,
    email varchar(256) not null,
    password varchar(256) not null,

    primary key(user_id)


);

create table boardgames (

    bg_id int not null,
    title varchar(256) not null,
    year_published int,
    thumbnail varchar(512),
    image varchar(512),
    playing_time int,

    primary key(bg_id)

);

create table user_collection (

    comment_id int auto_increment,
    user_id int not null,
    bg_id int not null,
    comment text,

    primary key (comment_id)
#     constraint fk_user_id foreign key (user_id) references users (user_id),
#     constraint fk_bg_id foreign key (bg_id) references boardgames (bg_id)
);


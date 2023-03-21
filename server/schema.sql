drop database if exists meepledb;

create database meepledb;

use meepledb;

create table users (

    user_id int auto_increment,
    username varchar(128) not null,
    email varchar(256) not null,
    password varchar(256) not null,

    primary key (user_id)


);

create table boardgames (

    bg_id int not null,
    title varchar(256) not null,
    year_published int,
    thumbnail varchar(512),
    image varchar(512),
    playing_time int,

    primary key (bg_id)

);

create table user_collection (


    user_id int not null,
    bg_id int not null,
    comment text,

    primary key (user_id, bg_id)
    #constraint fk_user_id foreign key (user_id) references users (user_id),
    #constraint fk_bg_id foreign key (bg_id) references boardgames (bg_id)
);

create table game_session (

    game_session_id varchar(8) not null,
    title varchar(256) not null,
    user_id int not null,
    address_name varchar(256) not null,
    address_position point not null,
    date date not null,
    player_count int,
    comment text,
    icon varchar(256),

    primary key (game_session_id)
    #constraint fk_user_id foreign key (user_id) references users (user_id)

)


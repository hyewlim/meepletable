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



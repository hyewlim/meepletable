package com.project.meepletable.repositories;

public class Queries {

    public static String SQL_POST_USER =
            "insert into users(username, email, password) values(?,?,sha1(?))";

    public static String SQL_AUTH_USER =
            "select user_id from users where username=? and password=sha1(?)";
//            "select count(*) > 0 as auth_state from users where username=? and password=sha1(?)";

}

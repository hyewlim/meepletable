package com.project.meepletable.repositories;

public class Queries {

    public static String SQL_POST_USER =
            "insert into users(username, email, password) values(?,?,sha1(?))";

    public static String SQL_AUTH_USER =
            "select user_id from users where username=? and password=sha1(?)";
//            "select count(*) > 0 as auth_state from users where username=? and password=sha1(?)";

    public static String SQL_INSERT_COLLECTION =
            "insert ignore into boardgames values (?, ?, ?, ?, ?, ?)";

    public static String SQL_INSERT_COMMENT =
            "replace into user_collection(user_id, bg_id, comment) values (?, ?, ?)";

    public static String SQL_GET_COLLECTION =
            """
            select user_id, boardgames.bg_id, comment, title, year_published, thumbnail, image, playing_time from user_collection
            join boardgames on user_collection.bg_id=boardgames.bg_id
            where user_id=?
            """;

    public static String SQL_DELETE_COLLECTION =
            "delete from user_collection where user_id=? and bg_id=?";


    public static String SQL_ADD_GAME_SESSION =
            "insert into game_session(game_session_id, title, user_id, address_name, address_position, date, player_count, comment, icon) values (?,?,?,?,POINT(?,?),?,?,?,?)";

    public static String SQL_GET_SESSIONS =
            """
            select title, users.username, address_name, address_position, date, player_count, comment, icon from game_session
            join users on game_session.user_id = users.user_id
            where game_session.user_id=?
            """;

}

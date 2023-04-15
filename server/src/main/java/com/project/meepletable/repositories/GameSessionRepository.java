package com.project.meepletable.repositories;

import com.project.meepletable.models.Address;
import com.project.meepletable.models.GameSession;
import com.project.meepletable.models.Position;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import java.awt.*;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

import static com.project.meepletable.repositories.Queries.*;

@Repository
public class GameSessionRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;


    public void postSession(GameSession session, String userId) {

        String randomUUID = UUID.randomUUID().toString();

        jdbcTemplate.update(SQL_ADD_GAME_SESSION,
                randomUUID,
                session.getTitle(),
                userId,
                session.getAddress().getName(),
                session.getAddress().getPosition().getLat(),
                session.getAddress().getPosition().getLng(),
                session.getDate().plusHours(8),
                session.getPlayerCount(),
                session.getComment(),
                session.getIcon()
                );
    }

    public List<GameSession> getSessions() {

        return jdbcTemplate.query(SQL_GET_SESSIONS,
                (rs, rowNum) -> new GameSession(
                        rs.getString("game_session_id"),
                        rs.getString("title"),
                        rs.getString("username"),
                        new Address(
                          rs.getString("address_name"),
                          new Position(
                                  rs.getDouble("X"),
                                  rs.getDouble("Y")
                          )
                        ),
                        rs.getObject("date",LocalDateTime.class),
                        rs.getInt("player_count"),
                        rs.getString("comment"),
                        rs.getString("icon")
                ));

    }

    public int deleteSession(String id) {

        return jdbcTemplate.update(SQL_DELETE_SESSION, id);

    }
}

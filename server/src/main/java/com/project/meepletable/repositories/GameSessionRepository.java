package com.project.meepletable.repositories;

import com.project.meepletable.models.Address;
import com.project.meepletable.models.GameSession;
import com.project.meepletable.models.Position;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import java.awt.*;
import java.util.List;
import java.util.UUID;

import static com.project.meepletable.repositories.Queries.*;

@Repository
public class GameSessionRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;


    public void postSession(GameSession session, int userId) {

        String randomUUID = UUID.randomUUID().toString().substring(0,8);

        jdbcTemplate.update(SQL_ADD_GAME_SESSION,
                randomUUID,
                session.getTitle(),
                userId,
                session.getAddress().getName(),
                session.getAddress().getPosition().getLat(),
                session.getAddress().getPosition().getLng(),
                session.getDate(),
                session.getPlayerCount(),
                session.getComment(),
                session.getIcon()
                );
    }

    public List<GameSession> getSessions(int userId) {

        return jdbcTemplate.query(SQL_GET_SESSIONS,
                (rs, rowNum) -> new GameSession(
                        rs.getString("title"),
                        rs.getString("username"),
                        new Address(
                          rs.getString("address_name"),
                          new Position(
                                  rs.getDouble("X"),
                                  rs.getDouble("Y")
                          )
                        ),
                        rs.getDate("date"),
                        rs.getInt("player_count"),
                        rs.getString("comment"),
                        rs.getString("icon")
                ), userId);

    }
}

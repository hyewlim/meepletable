package com.project.meepletable.repositories;

import com.project.meepletable.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import java.awt.*;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.project.meepletable.repositories.Queries.*;

@Repository
public class GameSessionRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private UserRepository userRepository;


    public boolean postSession(GameSession session, String userId) {

        String id;

        if (session.getId().equals("")){
            id = UUID.randomUUID().toString();
        } else {
            id = session.getId();
        }

        batchUpdateParticipants(session, id);

        return jdbcTemplate.update(SQL_ADD_GAME_SESSION,
                id,
                session.getTitle(),
                userId,
                session.getAddress().getName(),
                session.getAddress().getPosition().getLat(),
                session.getAddress().getPosition().getLng(),
                session.getDate().plusHours(8),
                session.getPlayerCount(),
                session.getComment(),
                session.getIcon()
                ) > 0;

    }

    public int[] batchUpdateParticipants(GameSession session, String sessionId){

        List<User> users = session.getParticipants();
        for (User user: users) {
            if (user.getId()==null) {
                Optional<User> tempUser = userRepository.findByUsername(user.getUsername());
                user.setId(tempUser.get().getId());
            }
        }

         return jdbcTemplate.batchUpdate(SQL_INSERT_PARTICIPANTS, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                User user = users.get(i);
                ps.setString(1, sessionId);
                ps.setString(2, user.getId());
            }

            @Override
            public int getBatchSize() {
                return session.getParticipants().size();
            }
        });

    }

    public List<GameSession> getSessions() {

        return  jdbcTemplate.query(SQL_GET_SESSIONS,
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
                        rs.getString("icon"),
                        getParticipants(rs.getString("game_session_id"))

                ));

    }

    public List<User> getParticipants(String gs_id){

        List<User> users = jdbcTemplate.query(SQL_GET_PARTICIPANTS,
                (rs, rowNum) -> new User(
                        rs.getString("username"),
                        rs.getString("userId")
                ), gs_id);

        return users;

    }

    public int deleteSession(String id) {

        return jdbcTemplate.update(SQL_DELETE_SESSION, id);

    }



}



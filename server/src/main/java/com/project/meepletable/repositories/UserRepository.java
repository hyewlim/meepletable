package com.project.meepletable.repositories;

import com.project.meepletable.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import static com.project.meepletable.repositories.Queries.*;

@Repository
public class UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void postUser(User user){

        jdbcTemplate.update(SQL_POST_USER,
                user.getUsername(),
                user.getEmail(),
                user.getPassword());
    }

    public int authUser(User user){

        final SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_AUTH_USER, user.getUsername(), user.getPassword());

        while (rs.next()) {
            return rs.getInt("user_id");
        }

        return 0;
    }

    Optional<User> findByEmail(String email) {

        jdbcTemplate.queryForRowSet(SQL_FIND_USER_BY_EMAIL, email);

        return null;
    }

}

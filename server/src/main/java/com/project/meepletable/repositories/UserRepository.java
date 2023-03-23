package com.project.meepletable.repositories;

import com.project.meepletable.models.Role;
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

    public Optional<User> findByEmail(String email) {
//
//        User user = jdbcTemplate.queryForObject(SQL_FIND_USER_BY_EMAIL, User.class, email);

        final SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_FIND_USER_BY_EMAIL, email);

        User user = new User();
        while (rs.next()) {
            user.setId(rs.getString("user_id"));
            user.setUsername(rs.getString("username"));
            user.setEmail(rs.getString("email"));
            user.setPassword(rs.getString("password"));
            user.setRole(Role.valueOf((rs.getString("role"))));
        }

        return Optional.of(user);
    }

    public void save(User user) {
        jdbcTemplate.update(SQL_POST_USER,
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getRole().name());
    }

}

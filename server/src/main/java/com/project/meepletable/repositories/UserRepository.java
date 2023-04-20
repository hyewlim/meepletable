package com.project.meepletable.repositories;

import com.project.meepletable.auth.AuthenticationRequest;
import com.project.meepletable.models.Role;
import com.project.meepletable.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Optional;

import static com.project.meepletable.repositories.Queries.*;

@Repository
public class UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public String save(User user) {

        int result = 0;

        try {
            result = jdbcTemplate.update(SQL_POST_USER,
                    user.getUsername(),
                    user.getEmail(),
                    user.getPassword(),
                    user.getRole().name());
        } catch (Exception e) {
            if (e.getMessage().contains("Duplicate entry")){
                System.err.println("Duplicate Entry");
                return "username and/or password is unavailable";
            }
        }

        return String.valueOf(result);

    }

    public boolean authUser(AuthenticationRequest request){

        System.out.println("AUTHUSER EMAIL>>" + request.getEmail());
        System.out.println("AUTHUSER PASSWORD>>" + request.getPassword());

        final SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_AUTH_USER, request.getEmail(), request.getPassword());

        boolean result = false;

        while (rs.next()) {
            System.out.println("RESULT FROM USER SEARRCH >>>" + result);
            result = rs.getBoolean("auth_state");
        }

        return result;
    }

    public Optional<User> findByEmail(String email) {

        final SqlRowSet rs = jdbcTemplate.queryForRowSet(
                SQL_FIND_USER_BY_EMAIL, email);

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

    public Optional<User> findByUsername(String username) {

        final SqlRowSet rs = jdbcTemplate.queryForRowSet(
                SQL_FIND_USER_BY_USERNAME, username);

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

    public boolean updatePassword(AuthenticationRequest request, String newPassword) {

        return jdbcTemplate.update(SQL_UPDATE_PASSWORD, newPassword, request.getEmail()) > 0;
    }
}

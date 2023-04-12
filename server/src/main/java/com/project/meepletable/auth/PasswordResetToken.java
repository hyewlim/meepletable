package com.project.meepletable.auth;

import com.project.meepletable.models.User;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;


import java.sql.Date;
import java.util.Optional;
import java.util.UUID;


public class PasswordResetToken {

    private static final int EXPIRATION = 60 * 24;

    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String token;

    private User user;

    private Date expiryDate;

    public PasswordResetToken(String token, User user) {
        this.token = token;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }
}

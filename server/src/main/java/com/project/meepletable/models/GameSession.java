package com.project.meepletable.models;

import java.sql.Date;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;


public class GameSession {

    private String id;

    private String title;
    private String host;
    private Address address;
    private LocalDateTime date;
    private int playerCount;
    private String comment;
    private String icon;

    private List<User> participants;

    public GameSession() {
    }

    public GameSession(String id,
                       String title,
                       String host,
                       Address address,
                       LocalDateTime date,
                       int playerCount,
                       String comment,
                       String icon,
                       List<User> participants) {
        this.id = id;
        this.title = title;
        this.host = host;
        this.address = address;
        this.date = date;
        this.playerCount = playerCount;
        this.comment = comment;
        this.icon = icon;
        this.participants = participants;
    }

    public GameSession(String id,
                       String title,
                       String host,
                       Address address,
                       LocalDateTime date,
                       int playerCount,
                       String comment,
                       String icon) {
        this.id = id;
        this.title = title;
        this.host = host;
        this.address = address;
        this.date = date;
        this.playerCount = playerCount;
        this.comment = comment;
        this.icon = icon;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public int getPlayerCount() {
        return playerCount;
    }

    public void setPlayerCount(int playerCount) {
        this.playerCount = playerCount;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public List<User> getParticipants() {
        return participants;
    }

    public void setParticipants(List<User> participants) {
        this.participants = participants;
    }

    @Override
    public String toString() {
        return "GameSession{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", host='" + host + '\'' +
                ", address=" + address +
                ", date=" + date +
                ", playerCount=" + playerCount +
                ", comment='" + comment + '\'' +
                ", icon='" + icon + '\'' +
                ", participants=" + participants +
                '}';
    }
}

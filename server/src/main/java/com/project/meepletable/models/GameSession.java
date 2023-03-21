package com.project.meepletable.models;

import java.sql.Date;

public class GameSession {

    private String title;
    private String host;
    private Address address;
    private Date date;
    private int playerCount;
    private String comment;
    private String icon;

    public GameSession() {
    }

    public GameSession(String title, String host, Address address, Date date, int playerCount, String comment, String icon) {
        this.title = title;
        this.host = host;
        this.address = address;
        this.date = date;
        this.playerCount = playerCount;
        this.comment = comment;
        this.icon = icon;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
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

    @Override
    public String toString() {
        return "GameSession{" +
                "title='" + title + '\'' +
                ", host='" + host + '\'' +
                ", address=" + address +
                ", date='" + date + '\'' +
                ", playerCount='" + playerCount + '\'' +
                ", comment='" + comment + '\'' +
                ", icon='" + icon + '\'' +
                '}';
    }
}

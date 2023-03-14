package com.project.meepletable.models;

public class Boardgame {

    private int id;
    private String type;
    private String name;
    private int yearPublished;
    private String thumbnail;
    private String image;
    private int playingTime;
    private String comment;

    public Boardgame(int id, String type, String name, int yearPublished) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.yearPublished = yearPublished;
    }

    public Boardgame(int id, String name, int yearPublished, String thumbnail, String image, int playingTime, String comment) {
        this.id = id;
        this.name = name;
        this.yearPublished = yearPublished;
        this.thumbnail = thumbnail;
        this.image = image;
        this.playingTime = playingTime;
        this.comment = comment;
    }

    public Boardgame(int id, String name, int yearPublished, String thumbnail, String image, int playingTime) {
        this.id = id;
        this.name = name;
        this.yearPublished = yearPublished;
        this.thumbnail = thumbnail;
        this.image = image;
        this.playingTime = playingTime;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getYearPublished() {
        return yearPublished;
    }

    public void setYearPublished(int yearPublished) {
        this.yearPublished = yearPublished;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getPlayingTime() {
        return playingTime;
    }

    public void setPlayingTime(int playingTime) {
        this.playingTime = playingTime;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    @Override
    public String toString() {
        return "Boardgame{" +
                "id=" + id +
                ", type='" + type + '\'' +
                ", name='" + name + '\'' +
                ", yearPublished=" + yearPublished +
                ", thumbnail='" + thumbnail + '\'' +
                ", image='" + image + '\'' +
                ", playingTime=" + playingTime +
                ", comment='" + comment + '\'' +
                '}';
    }
}

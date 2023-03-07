package com.project.meepletable.models;

public class Boardgame {

    private String id;
    private String type;
    private String name;
    private String yearPublished;

    public Boardgame(String id, String type, String name, String yearPublished) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.yearPublished = yearPublished;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public String getYearPublished() {
        return yearPublished;
    }

    public void setYearPublished(String yearPublished) {
        this.yearPublished = yearPublished;
    }

    @Override
    public String toString() {
        return "Boardgame{" +
                "id='" + id + '\'' +
                ", type='" + type + '\'' +
                ", name='" + name + '\'' +
                ", yearPublished='" + yearPublished + '\'' +
                '}';
    }
}

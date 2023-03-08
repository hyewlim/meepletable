package com.project.meepletable.models;

public class Boardgame {

    private int id;
    private String type;
    private String name;
    private int yearPublished;

    public Boardgame(int id, String type, String name, int yearPublished) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.yearPublished = yearPublished;
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

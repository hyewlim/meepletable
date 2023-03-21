package com.project.meepletable.models;

public class Position {
    private double lat;
    private double lng;

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLng() {
        return lng;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

    public Position(double lat, double lng) {
        this.lat = lat;
        this.lng = lng;
    }
}

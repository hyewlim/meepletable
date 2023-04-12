package com.project.meepletable.utils;

import com.project.meepletable.models.Boardgame;
import com.project.meepletable.models.GameSession;
import jakarta.json.*;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

public class JsonBuilder {

    public static JsonArray bgJsonArray(List<Boardgame> boardgameList) {

        JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
        for (Boardgame bg : boardgameList) {
            arrayBuilder.add(bgToJson(bg));
        }

        return arrayBuilder.build();

    }

    public static JsonObject bgDetailToJson(Boardgame bg) {

        return Json.createObjectBuilder()
                .add("id", bg.getId())
                .add("name", bg.getName())
                .add("thumbnail", bg.getThumbnail())
                .add("image", bg.getImage())
                .add("yearPublished", bg.getYearPublished())
                .add("playingTime", bg.getPlayingTime())
                .add("comment", Optional.ofNullable(bg.getComment()).isPresent() ? bg.getComment() : "")
                .build();

    }

    public static JsonObject bgToJson(Boardgame bg) {

        return Json.createObjectBuilder()
                .add("id", bg.getId())
                .add("name", bg.getName())
                .add("yearPublished", bg.getYearPublished())
                .build();

    }

    public static JsonObject authResult(int result) {
        return Json.createObjectBuilder()
                .add("result", result)
                .build();
    }

    public static Boardgame create(String json) {
        Boardgame bg = new Boardgame();
        InputStream is = new ByteArrayInputStream(json.getBytes());
        JsonReader jsonreader = Json.createReader(is);
        JsonObject jsonObject = jsonreader.readObject();

        bg.setName(jsonObject.getString("name"));
        bg.setId(jsonObject.getInt("id"));
        bg.setImage(jsonObject.getString("image"));
        bg.setThumbnail(jsonObject.getString("thumbnail"));
        bg.setYearPublished(jsonObject.getInt("yearPublished"));
        bg.setPlayingTime(jsonObject.getInt("playingTime"));
        bg.setComment(jsonObject.getString("comment"));

        return bg;

    }

    public static JsonObject gsDetailToJson(GameSession gs) {

        return Json.createObjectBuilder()
                .add("title", gs.getTitle())
                .add("host", gs.getHost())
                .add("address", JsonBuilder.addressToJson(gs))
                .add("date", String.valueOf(gs.getDate()))
                .add("playerCount", gs.getPlayerCount())
                .add("comment", gs.getComment())
                .add("icon", gs.getIcon())
                .build();

    }

    public static JsonObject positionToJson(GameSession gs) {

        return Json.createObjectBuilder()
                .add("lat", gs.getAddress().getPosition().getLat())
                .add("lng", gs.getAddress().getPosition().getLng())
                .build();

    }

    public static JsonObject addressToJson(GameSession gs) {

        return Json.createObjectBuilder()
                .add("name", gs.getAddress().getName())
                .add("position", JsonBuilder.positionToJson(gs))
                .build();

    }

    public static JsonObject SQLError(String resp) {

        return Json.createObjectBuilder()
                .add("error", resp)
                .build();
    }

    public static JsonObject emailVerification(String email) {

            return Json.createObjectBuilder()
                    .add("success", email)
                    .build();
    }

}
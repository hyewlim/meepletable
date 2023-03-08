package com.project.meepletable.utils;

import com.project.meepletable.models.Boardgame;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;

import java.util.List;

public class JsonBuilder {

    public static JsonArray bgJsonArray(List<Boardgame> boardgameList) {

        JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
        for (Boardgame bg: boardgameList) {
            arrayBuilder.add(bgToJson(bg));
        }

        return arrayBuilder.build();

    }

    public static JsonObject bgToJson(Boardgame bg) {

        return Json.createObjectBuilder()
                .add("id", bg.getId())
                .add("name", bg.getName())
                .add("yearPublished", bg.getYearPublished())
                .build();

    }

    public static JsonObject authResult(Boolean result){
        return Json.createObjectBuilder()
                .add("result", result)
                .build();
    }

}

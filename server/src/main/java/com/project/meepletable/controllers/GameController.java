package com.project.meepletable.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.meepletable.models.Boardgame;
import com.project.meepletable.models.User;
import com.project.meepletable.repositories.GamesRepository;
import com.project.meepletable.repositories.UserRepository;
import com.project.meepletable.services.BgaService;
import com.project.meepletable.services.BggService;
import com.project.meepletable.utils.JsonBuilder;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.List;

@RestController
@RequestMapping(path = "/api/v1")
public class GameController {

    @Autowired
    private BggService bggService;

    @Autowired
    private BgaService bgaService;

    @Autowired
    private GamesRepository gamesRepo;


    @GetMapping("/games")
    public ResponseEntity<String> getGames(@RequestParam String name) {

        System.out.println(name);

        List<Boardgame> bgList = bggService.getGames(name);

        JsonArray result = JsonBuilder.bgJsonArray(bgList);

        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(result.toString());

    }

    @GetMapping("/game/{id}")
    public ResponseEntity<String> getGameDetail(@PathVariable int id) {

        Boardgame boardgame = bggService.getGameDetail(id);

        JsonObject result = JsonBuilder.bgDetailToJson(boardgame);

        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(result.toString());

    }

    @GetMapping("/bga")
    public ResponseEntity<String> getGamesFromBGA(@RequestParam String name) {

        bgaService.getGames(name);

        return null;

    }

    @PostMapping("/games/collection")
    public ResponseEntity<String> saveCollection(@RequestBody String body, @RequestParam String userId) throws JsonProcessingException {

        ObjectMapper objectMapper = new ObjectMapper();
        List<Boardgame> boardgameList = objectMapper.readValue(body, new TypeReference<List<Boardgame>>(){});

        gamesRepo.saveCollection(boardgameList, userId);

        return null;
    }

    @GetMapping("/games/collection")
    public ResponseEntity<String> getCollection(@RequestParam String userId) {

        List<Boardgame> bgList = gamesRepo.getCollection(userId);

        JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();

        for (Boardgame bg: bgList){
            arrayBuilder.add(JsonBuilder.bgDetailToJson(bg));
        }

        JsonArray result = arrayBuilder.build();

        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(result.toString());

    }

    @DeleteMapping("/games/collection")
    public ResponseEntity<String> deleteCollection(@RequestParam String userId, @RequestParam int bgId) {

        int result = gamesRepo.deleteCollection(userId, bgId);

        return ResponseEntity.ok(String.valueOf(result));

    }



}

package com.project.meepletable.controllers;

import com.project.meepletable.models.Boardgame;
import com.project.meepletable.models.User;
import com.project.meepletable.repositories.UserRepository;
import com.project.meepletable.services.BgaService;
import com.project.meepletable.services.BggService;
import com.project.meepletable.utils.JsonBuilder;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api")
public class GameController {

    @Autowired
    private BggService bggService;

    @Autowired
    private BgaService bgaService;


    @GetMapping("/games")
    public ResponseEntity<String> getGames(@RequestParam String name) {

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



}

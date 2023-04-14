package com.project.meepletable.controllers;

import com.project.meepletable.models.GameSession;
import com.project.meepletable.repositories.GameSessionRepository;
import com.project.meepletable.utils.JsonBuilder;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/session")
public class GameSessionController {

    @Autowired
    private GameSessionRepository sessionRepository;

    @PostMapping("/{userId}")
    public ResponseEntity<String> postSession(@RequestBody GameSession gameSession, @PathVariable String userId) {

        sessionRepository.postSession(gameSession, userId);

        return null;
    }

    @GetMapping()
    public ResponseEntity<String> getSessions() {

        List<GameSession> gameSessionList = sessionRepository.getSessions();

        JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();

        for (GameSession gs: gameSessionList) {
            arrayBuilder.add(JsonBuilder.gsDetailToJson(gs));
        }

        JsonArray result = arrayBuilder.build();

        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(result.toString());

    }
}

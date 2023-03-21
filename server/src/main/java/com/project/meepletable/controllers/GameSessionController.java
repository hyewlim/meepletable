package com.project.meepletable.controllers;

import com.project.meepletable.models.GameSession;
import com.project.meepletable.repositories.GameSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/session")
public class GameSessionController {

    @Autowired
    private GameSessionRepository sessionRepository;

    @PostMapping("/{userId}")
    public ResponseEntity<String> postSession(@RequestBody GameSession gameSession, @PathVariable int userId) {

        sessionRepository.postSession(gameSession, userId);

        return null;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<String> getSessions(@PathVariable int userId) {

        List<GameSession> gameSessionList = sessionRepository.getSessions(userId);

        for (GameSession gs: gameSessionList){
            System.out.println(gs.toString());
        }

        return null;

    }
}

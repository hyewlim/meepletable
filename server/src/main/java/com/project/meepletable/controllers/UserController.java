package com.project.meepletable.controllers;

import com.project.meepletable.models.User;
import com.project.meepletable.repositories.UserRepository;
import com.project.meepletable.utils.JsonBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping()
    public ResponseEntity<String> postUser(@RequestBody User user) {

        System.out.println(user.toString());

        userRepository.postUser(user);

        return null;

    }

    @PostMapping("/auth")
    public ResponseEntity<String> authUser(@RequestBody User user) {

        boolean result = userRepository.authUser(user);

        return ResponseEntity.ok(JsonBuilder.authResult(result).toString());

    }
}

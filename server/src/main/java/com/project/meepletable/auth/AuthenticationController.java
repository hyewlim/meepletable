package com.project.meepletable.auth;

import com.project.meepletable.utils.JsonBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody RegisterRequest request
    ) {

        Optional<String> resp = service.register(request);

        System.out.println(resp.get());

        if (resp.get().length() > 1){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(JsonBuilder.SQLError(resp.get()).toString());
        }

        return ResponseEntity.ok(resp.get().toString());

    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody AuthenticationRequest request
    ) {

        AuthenticationResponse response = service.authenticate(request);

        if (response.getToken()=="Bad credentials"){
            System.out.println("UNAUTHORIZED");
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(response);
        }

        return ResponseEntity.ok(response);
    }
}

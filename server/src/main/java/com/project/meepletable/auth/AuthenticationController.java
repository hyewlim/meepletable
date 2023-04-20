package com.project.meepletable.auth;

import com.project.meepletable.models.User;
import com.project.meepletable.utils.JsonBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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



        if (resp.get().length() > 1){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(JsonBuilder.SQLError(resp.get()).toString());
        }

        return ResponseEntity.ok(resp.get());

    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody AuthenticationRequest request
    ) {

        AuthenticationResponse response = service.authenticate(request);

        if (response.getToken().equals("Bad credentials")){
            System.out.println("UNAUTHORIZED");
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(response);
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/reset")
    public ResponseEntity<String> resetPassword(@RequestParam String email){

        service.resetPassword(email);
        return ResponseEntity.ok(JsonBuilder.emailVerification(email).toString());

    }

    @PostMapping("/changepassword")
    public ResponseEntity<String> changePassword(@RequestBody AuthenticationRequest request, @RequestParam String newPassword) {

        boolean result = service.changePassword(request, newPassword);

        if (result){

            return ResponseEntity.ok(String.valueOf(result));

        }

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(String.valueOf(result));
    }

}

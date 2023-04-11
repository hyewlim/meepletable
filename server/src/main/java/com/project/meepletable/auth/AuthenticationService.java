package com.project.meepletable.auth;

import com.project.meepletable.models.Role;
import com.project.meepletable.models.User;
import com.project.meepletable.repositories.UserRepository;
import com.project.meepletable.services.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    @Autowired
    private UserRepository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {

        User user = new User(
                request.getUsername(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                Role.USER
        );

        repository.save(user);
        String jwtToken = jwtService.generateToken(user);
        AuthenticationResponse response = new AuthenticationResponse(jwtToken);
        return response;
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {

        AuthenticationResponse response = new AuthenticationResponse();

        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            User user = repository.findByEmail(request.getEmail())
                    .orElseThrow();
            System.out.println(user.toString());
            String jwtToken = jwtService.generateToken(user);
            response.setToken(jwtToken);


        } catch (Exception e) {
            System.err.println(e.getMessage());
            response.setToken(e.getMessage());
        }

        return response;

    }
}

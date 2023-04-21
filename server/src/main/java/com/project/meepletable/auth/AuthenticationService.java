package com.project.meepletable.auth;

import com.project.meepletable.models.Role;
import com.project.meepletable.models.User;
import com.project.meepletable.repositories.UserRepository;
import com.project.meepletable.services.EmailSenderService;
import com.project.meepletable.services.JwtService;
import jakarta.mail.MessagingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;


@Service
public class AuthenticationService {

    Logger logger = LoggerFactory.getLogger(AuthenticationService.class);
    @Autowired
    private UserRepository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private EmailSenderService emailSenderService;

    public Optional<String> register(RegisterRequest request) {

        User user = new User(
                request.getUsername(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                Role.USER
        );

        return Optional.of(repository.save(user));
//        String jwtToken = jwtService.generateToken(user);
//        AuthenticationResponse response = new AuthenticationResponse(jwtToken);

    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {

        AuthenticationResponse response = new AuthenticationResponse();

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            User user = repository.findByEmail(request.getEmail())
                    .orElseThrow();
            String jwtToken = jwtService.generateToken(user);
            response.setToken(jwtToken);
            response.setUserId(user.getId());


        } catch (Exception e) {
            System.err.println(e.getMessage());
            response.setToken(e.getMessage());
        }

        return response;

    }

    public boolean resetPasswordEmail(String email) throws MessagingException {

        Optional<User> user = repository.findByEmail(email);



        if (user.get().getUsername() != null){
            String token = UUID.randomUUID().toString();
            PasswordResetToken resetToken = new PasswordResetToken(token, user.get());
            tokenService.saveToken(resetToken);

            String url = "http://localhost:4200/#/resetpw/" + token;

            String htmlMsg = "<p><b>Your Login details for Meeple Table</b><br><b>Email: </b> "
                    + email
                    + "<br><a href="
                    + url
                    + ">Click here to change your password</a></p>";

            emailSenderService.sendEmail(
                    email,
                    "Reset Password: " + email,
                    htmlMsg);

            return true;
        }

        logger.error(email + " not found");
        return false;

    }

    public boolean resetPassword(String token, String newPassword) {

        Optional<PasswordResetToken> prt = tokenService.findToken(token);

        if (prt.isPresent()) {

            AuthenticationRequest request = new AuthenticationRequest(
                    prt.get().getUser().getEmail(),
                    prt.get().getUser().getPassword()
            );

            return repository.updatePassword(request, passwordEncoder.encode(newPassword));

        } else {
            return false;
        }

    }

    public boolean changePassword(AuthenticationRequest request, String newPassword) {

        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            if (auth.isAuthenticated()) {
            return repository.updatePassword(request, passwordEncoder.encode(newPassword));
            }
        } catch (Exception e){
            System.err.println(e.getMessage());
        }
        return false;
    }
}

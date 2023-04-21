package com.project.meepletable.auth;

import com.project.meepletable.chat.ChatMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TokenService {

    @Autowired
    private TokenRepository tokenRepository;

    public void saveToken(PasswordResetToken passwordResetToken){
        tokenRepository.save(passwordResetToken);
    }

    public Optional<PasswordResetToken> findToken(String token) {
        return Optional.of(tokenRepository.findByToken(token));
    }

}

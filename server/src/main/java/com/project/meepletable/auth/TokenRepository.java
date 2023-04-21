package com.project.meepletable.auth;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TokenRepository extends MongoRepository<PasswordResetToken, String> {

    PasswordResetToken findByToken(String token);


}

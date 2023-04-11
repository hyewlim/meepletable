package com.project.meepletable.controllers;

import com.project.meepletable.services.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/email")
public class EmailController {

    @Autowired
    private EmailSenderService emailSenderService;

    @GetMapping
    public ResponseEntity<String> sendMail() {

        System.out.println("sendmail endpoint activated");

        emailSenderService.sendEmail("hyew.lim@gmail.com", "this is testing", "please confirm");

        return ResponseEntity.ok("ok");

    }
}

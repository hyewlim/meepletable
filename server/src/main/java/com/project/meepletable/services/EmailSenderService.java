package com.project.meepletable.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String toEmail,
                          String subject,
                          String body) throws MessagingException {

        MimeMessage message = mailSender.createMimeMessage();

//        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("meepletable@gmail.com");
        message.setRecipients(MimeMessage.RecipientType.TO, toEmail);
        message.setContent(body, "text/html; charset=utf-8");

        message.setSubject(subject);


        mailSender.send(message);

        System.out.println("mail sent successfully");
    }

}

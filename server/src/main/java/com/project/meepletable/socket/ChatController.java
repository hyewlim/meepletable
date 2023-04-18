package com.project.meepletable.socket;

import com.project.meepletable.models.Boardgame;
import com.project.meepletable.models.ChatMessage;
import com.project.meepletable.services.ChatMessageService;
import com.project.meepletable.utils.JsonBuilder;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
public class ChatController {

    @Autowired
    private ChatMessageService chatMessageService;

    @MessageMapping("/chat.register")
    @SendTo("start/topic")
    public ChatMessage register(@Payload ChatMessage chatMessage,
                                SimpMessageHeaderAccessor headerAccessor){

        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage;

    }

    @MessageMapping("/chat.send")
    @SendTo("start/topic")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage){

        chatMessageService.saveChatMessage(chatMessage);

        System.out.println(chatMessage);
        return chatMessage;
    }

    @GetMapping
    @RequestMapping(value="/api/chat/messages")
    @ResponseBody
    public ResponseEntity<String> findMessagesById(@RequestParam String id) {

        List<ChatMessage> messageList = chatMessageService.retrieveChatById(id);

        JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();

        for (ChatMessage msg: messageList){
            arrayBuilder.add(JsonBuilder.msgDetailToJson(msg));
        }

        JsonArray result = arrayBuilder.build();

        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(result.toString());

    }




}

package com.project.meepletable.services;

import com.project.meepletable.models.ChatMessage;
import com.project.meepletable.repositories.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatMessageService {

    @Autowired
    private ChatMessageRepository repository;

    public void saveChatMessage(ChatMessage chatMessage){
        repository.save(chatMessage);
    }

    public List<ChatMessage> retrieveChatById(String id){
        return repository.findBySessionId(id);
    }

}

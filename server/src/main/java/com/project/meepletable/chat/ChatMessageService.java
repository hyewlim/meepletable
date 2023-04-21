package com.project.meepletable.chat;

import com.project.meepletable.chat.ChatMessage;
import com.project.meepletable.chat.ChatMessageRepository;
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

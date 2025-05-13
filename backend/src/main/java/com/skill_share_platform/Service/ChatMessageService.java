package com.skill_share_platform.Service;

import com.skill_share_platform.Model.ChatMessage;
import com.skill_share_platform.Model.UserModel;
import com.skill_share_platform.Repository.ChatMessageRepository;
import com.skill_share_platform.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ChatMessageService {
    @Autowired
    private ChatMessageRepository chatMessageRepository;
    @Autowired
    private UserRepository userRepository;

    public List<ChatMessage> getAllMessages() {
        return chatMessageRepository.findAllByOrderByTimestampAsc();
    }

    public ChatMessage createMessage(String userId, String content) {
        UserModel sender = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        ChatMessage message = new ChatMessage();
        message.setSender(sender);
        message.setContent(content);
        message.setTimestamp(LocalDateTime.now());
        return chatMessageRepository.save(message);
    }

    public ChatMessage updateMessage(String messageId, String userId, String newContent) {
        Optional<ChatMessage> optional = chatMessageRepository.findById(messageId);
        if (optional.isEmpty()) throw new RuntimeException("Message not found");
        ChatMessage message = optional.get();
        if (!message.getSender().getUserId().equals(userId)) throw new RuntimeException("Not authorized");
        message.setContent(newContent);
        return chatMessageRepository.save(message);
    }

    public void deleteMessage(String messageId, String userId) {
        Optional<ChatMessage> optional = chatMessageRepository.findById(messageId);
        if (optional.isEmpty()) throw new RuntimeException("Message not found");
        ChatMessage message = optional.get();
        if (!message.getSender().getUserId().equals(userId)) throw new RuntimeException("Not authorized");
        chatMessageRepository.deleteById(messageId);
    }
} 
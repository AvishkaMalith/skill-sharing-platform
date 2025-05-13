package com.skill_share_platform.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "chat_messages")
public class ChatMessage {
    @Id
    private String id;
    @DBRef
    private UserModel sender;
    private String content;
    private LocalDateTime timestamp;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public UserModel getSender() { return sender; }
    public void setSender(UserModel sender) { this.sender = sender; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
} 
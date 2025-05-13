package com.skill_share_platform.Controller;

import com.skill_share_platform.Model.ChatMessage;
import com.skill_share_platform.Service.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat-messages")
public class ChatMessageController {
    @Autowired
    private ChatMessageService chatMessageService;

    @GetMapping
    public List<ChatMessage> getAllMessages() {
        return chatMessageService.getAllMessages();
    }

    @PostMapping
    public ChatMessage createMessage(@RequestBody Map<String, String> payload) {
        String userId = payload.get("userId");
        String content = payload.get("content");
        return chatMessageService.createMessage(userId, content);
    }

    @PutMapping("/{id}")
    public ChatMessage updateMessage(@PathVariable String id, @RequestBody Map<String, String> payload) {
        String userId = payload.get("userId");
        String content = payload.get("content");
        return chatMessageService.updateMessage(id, userId, content);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMessage(@PathVariable String id, @RequestParam String userId) {
        chatMessageService.deleteMessage(id, userId);
        Map<String, String> resp = new HashMap<>();
        resp.put("message", "Deleted");
        return ResponseEntity.ok(resp);
    }
} 
package com.skill_share_platform.Controller;

import com.skill_share_platform.Model.CommentModel;
import com.skill_share_platform.Service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @GetMapping("/post/{postId}")
    public List<CommentModel> getCommentsByPostId(@PathVariable String postId) {
        return commentService.getCommentsByPostId(postId);
    }

    @GetMapping("/post/{postId}/count")
    public ResponseEntity<Map<String, Long>> getCommentCountByPostId(@PathVariable String postId) {
        long count = commentService.getCommentCountByPostId(postId);
        Map<String, Long> response = new HashMap<>();
        response.put("count", count);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public CommentModel createComment(@RequestBody Map<String, String> payload) {
        String postId = payload.get("postId");
        String userId = payload.get("userId");
        String content = payload.get("content");
        return commentService.createComment(postId, userId, content);
    }

    @PutMapping("/{id}")
    public CommentModel updateComment(@PathVariable String id, @RequestBody Map<String, String> payload) {
        String userId = payload.get("userId");
        String content = payload.get("content");
        return commentService.updateComment(id, userId, content);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable String id, @RequestParam String userId) {
        commentService.deleteComment(id, userId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Comment deleted successfully");
        return ResponseEntity.ok(response);
    }
}

package com.skill_share_platform.Controller;

import com.skill_share_platform.DataTransferObject.CommentDataTransferObject;
import com.skill_share_platform.Service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    // Create a comment
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public String createComment(@RequestBody CommentDataTransferObject comment) {
        return commentService.createComment(comment);
    }

    // Get comments (all or by postId)
    @GetMapping("/get")
    @ResponseStatus(HttpStatus.OK)
    public List<CommentDataTransferObject> getComments(@RequestParam(required = false) String postId) {
        if (postId != null && !postId.isEmpty()) {
            return commentService.getCommentsByPostId(postId);
        }
        return commentService.getComments();
    }

    // Update a comment by commentId
    @PutMapping("/update/{commentId}")
    @ResponseStatus(HttpStatus.OK)
    public String updateComment(@PathVariable String commentId,
                               @RequestBody CommentDataTransferObject updatedComment) {
        return commentService.updateCommentById(commentId, updatedComment);
    }

    // Delete a comment by commentId
    @DeleteMapping("/delete/{commentId}")
    @ResponseStatus(HttpStatus.OK)
    public String deleteComment(@PathVariable String commentId) {
        return commentService.deleteCommentById(commentId);
    }
}

package com.skill_share_platform.Service;

import com.skill_share_platform.Model.CommentModel;
import com.skill_share_platform.Model.UserModel;
import com.skill_share_platform.Repository.CommentRepository;
import com.skill_share_platform.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;
    
    @Autowired
    private UserRepository userRepository;

    public List<CommentModel> getCommentsByPostId(String postId) {
        return commentRepository.findByPostIdOrderByCreatedAtDesc(postId);
    }

    public long getCommentCountByPostId(String postId) {
        return commentRepository.countByPostId(postId);
    }

    public CommentModel createComment(String postId, String userId, String content) {
        UserModel user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        CommentModel comment = new CommentModel();
        comment.setPostId(postId);
        comment.setUser(user);
        comment.setContent(content);
        comment.setCreatedAt(LocalDateTime.now());
        comment.setUpdatedAt(LocalDateTime.now());
        comment.setEdited(false);

        return commentRepository.save(comment);
    }

    public CommentModel updateComment(String commentId, String userId, String content) {
        Optional<CommentModel> optional = commentRepository.findById(commentId);
        if (optional.isEmpty()) {
            throw new RuntimeException("Comment not found");
        }

        CommentModel comment = optional.get();
        if (!comment.getUser().getUserId().equals(userId)) {
            throw new RuntimeException("Not authorized to edit this comment");
        }

        comment.setContent(content);
        comment.setUpdatedAt(LocalDateTime.now());
        comment.setEdited(true);

        return commentRepository.save(comment);
    }

    public void deleteComment(String commentId, String userId) {
        Optional<CommentModel> optional = commentRepository.findById(commentId);
        if (optional.isEmpty()) {
            throw new RuntimeException("Comment not found");
        }

        CommentModel comment = optional.get();
        if (!comment.getUser().getUserId().equals(userId)) {
            throw new RuntimeException("Not authorized to delete this comment");
        }

        commentRepository.deleteById(commentId);
    }
}
package com.skill_share_platform.Service;

import com.skill_share_platform.DataTransferObject.CommentDataTransferObject;
import com.skill_share_platform.Model.CommentModel;
import com.skill_share_platform.Repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    // Map DTO to Model
    private CommentModel toModel(CommentDataTransferObject dto) {
        CommentModel model = new CommentModel();
        model.setId(dto.getCommentId());
        model.setPostId(dto.getPostId());
        model.setUserId(dto.getUserId());
        model.setContent(dto.getContent());
        model.setCreatedAt(dto.getCreatedAt());
        model.setUpdatedAt(dto.getUpdatedAt());
        return model;
    }

    // Map Model to DTO
    private CommentDataTransferObject toDto(CommentModel model) {
        return new CommentDataTransferObject(
                model.getId(),
                model.getPostId(),
                model.getUserId(),
                model.getContent(),
                model.getCreatedAt(),
                model.getUpdatedAt()
        );
    }

    // Create a comment
    public String createComment(CommentDataTransferObject commentDto) {
        try {
            if (commentDto == null) return "Error: comment data is null";
            if (commentDto.getPostId() == null || commentDto.getPostId().isEmpty()) {
                return "Error: postId is required";
            }
            if (commentDto.getContent() == null || commentDto.getContent().isEmpty()) {
                return "Error: content is required";
            }

            CommentModel model = toModel(commentDto);
            model.setCreatedAt(new Date());
            model.setUpdatedAt(new Date());
            commentRepository.save(model);
            return "Comment created successfully";
        } catch (Exception e) {
            return "Error creating comment: " + e.getMessage();
        }
    }

    // Get all comments
    public List<CommentDataTransferObject> getComments() {
        try {
            return commentRepository.findAll().stream()
                    .map(this::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    // Get comments by postId
    public List<CommentDataTransferObject> getCommentsByPostId(String postId) {
        try {
            return commentRepository.findByPostId(postId).stream()
                    .map(this::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    // Update comment by ID
    public String updateCommentById(String commentId, CommentDataTransferObject updatedDto) {
        try {
            CommentModel existing = commentRepository.findById(commentId).orElse(null);
            if (existing == null) {
                return "Comment ID: " + commentId + " not found";
            }

            if (updatedDto.getContent() != null && !updatedDto.getContent().isEmpty()) {
                existing.setContent(updatedDto.getContent());
            }
            existing.setUpdatedAt(new Date());
            commentRepository.save(existing);
            return "Comment ID: " + commentId + " updated successfully";
        } catch (Exception e) {
            return "Error updating comment: " + e.getMessage();
        }
    }

    // Delete comment by ID
    public String deleteCommentById(String commentId) {
        try {
            if (!commentRepository.existsById(commentId)) {
                return "Comment ID: " + commentId + " not found";
            }
            commentRepository.deleteById(commentId);
            return "Comment ID: " + commentId + " deleted successfully";
        } catch (Exception e) {
            return "Error deleting comment: " + e.getMessage();
        }
    }
}
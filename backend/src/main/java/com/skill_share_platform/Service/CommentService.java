package com.skill_share_platform.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skill_share_platform.Repository.CommentRepository;
import com.skill_share_platform.DataTransferObject.CommentDataTransferObject;
import com.skill_share_platform.Model.CommentModel;

@Service
public class CommentService {

  @Autowired
  private CommentRepository commentRepository;

  // Method to create a comment
  public String createComment(CommentDataTransferObject commentDataTransferObject) {
    try {
      // Creating an object of comment class
      CommentModel comment = new CommentModel();
      // Assigning the values of data transfer object class to the user object
      comment.setPostId(commentDataTransferObject.getPostId());
      comment.setUserId(commentDataTransferObject.getUserId());
      comment.setContent(commentDataTransferObject.getContent());
      comment.setCreatedAt(commentDataTransferObject.getCreatedAt());
      comment.setUpdatedAt(commentDataTransferObject.getUpdatedAt());
      // Saving the comment object to the database
      commentRepository.save(comment);
      return "comment created successfully";
    } catch (Exception e) {
      return "Error creating comment : " + e.getMessage();
    }
  }

  // Method to get all the comments
  public List<CommentModel> getComments() {
    // Creating an empty list of comments
    List<CommentModel> comments = new ArrayList<>();
    try {
      // assigning the comments from the database to the list
      comments = commentRepository.findAll();
    } catch (Exception e) {
      System.out.println("Error fetching comments: " + e.getMessage());
    }
    return comments;
  }

  // Method to get a specific comment by commentId
  public CommentModel getcommentById(String commentId) {
    // Checking if the given postId exists in the database
    if (commentRepository.existsById(commentId)) {
      // If comment Id exists, return the comment object
      return commentRepository.findById(commentId).get();
    } else {
      // If comment Id does not exist, return null
      return null;
    }
  }

  // Method to update a comment by commentId
  public String updateCommentById(String commentId, CommentDataTransferObject commentDataTransferObject) {
    try {
      if (commentRepository.existsById(commentId)) {
        // Getting the existing comment details
        CommentModel existingComment = commentRepository.findById(commentId).get();
        // Assigning the content and updatedAt of Data transfer object class to the comment object
        existingComment.setContent(commentDataTransferObject.getContent());
        existingComment.setUpdatedAt(commentDataTransferObject.getUpdatedAt());
        // Saving the updated comment to the database
        commentRepository.save(existingComment);
        return "Comment ID : " + commentId + " updated successfully";
      } else {
        return "Comment ID : " + commentId + " not found";
      }
    } catch (Exception e) {
      return "Error updating comment : " + e.getMessage();
    }
  }

  // Method to delete a comment by commentId
  public String deleteCommentById(String commentId) {
    try {
      // Checking if the comment Id exists in the database
      if(commentRepository.existsById(commentId)) {
        commentRepository.deleteById(commentId);
        return "Comment ID : " + commentId + " deleted successfully";
      } else {
        return "Comment ID : " + commentId + " not found";
      }
    } catch (Exception e) {
      return "Error deleting comment : " + e.getMessage();
    }
  }
}

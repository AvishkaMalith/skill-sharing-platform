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
  public String createComment(CommentDataTransferObject commentDataTransferObject){
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

  // Need to implement "Method to get all the comments of a post with postID" 
}

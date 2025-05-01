package com.skill_share_platform.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

import com.skill_share_platform.DataTransferObject.CommentDataTransferObject;
import com.skill_share_platform.Service.CommentService;
import com.skill_share_platform.Model.CommentModel;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("api/comments")
public class CommentController {

  @Autowired
  private CommentService commentService;

  // Endpoint to create a comment
  @PostMapping("/create")
  @ResponseStatus(HttpStatus.CREATED)
  public String createComment(@RequestBody CommentDataTransferObject commentDataTransferObject) {
    return commentService.createComment(commentDataTransferObject);
  }

  // Endpoint to get all comments
  @GetMapping("/get")
  @ResponseStatus(HttpStatus.OK)
  public List<CommentModel> getComments() {
    return commentService.getComments();
  }

  // Endpoint to update a specific comment by commentId
  @PutMapping("update/{commentId}")
  public String updateComment(@PathVariable String commentId,
      @RequestBody CommentDataTransferObject commentDataTransferObject) {
    return commentService.updateCommentById(commentId, commentDataTransferObject);
  }

  // Endpoint to delete a comment by commentId
  @DeleteMapping("/delete/{commentId}")
  public String deleteComment(@PathVariable String commentId) {
    return commentService.deleteCommentById(commentId);
  }
}

package com.skill_share_platform.Model;

import java.time.LocalDateTime;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(value = "comments")
public class CommentModel {
  // Basic attributes of a comment
  private String postId;
  private String userId;
  private String content;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  // Default constructor
  public CommentModel() {
  }

  // Parameterized constructor
  public CommentModel(String postId, String userId, String content, LocalDateTime createdAt, LocalDateTime updatedAt) {
    this.postId = postId;
    this.userId = userId;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Getters and Setters
  public String getPostId() {
    return postId;
  }

  public void setPostId(String postId) {
    this.postId = postId;
  }

  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }
}

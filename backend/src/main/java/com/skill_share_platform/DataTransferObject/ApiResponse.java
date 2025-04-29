package com.skill_share_platform.DataTransferObject;

public class ApiResponse {
    private boolean success;
    private String message;
    private String postId;

    public ApiResponse(boolean success, String message, String postId) {
        this.success = success;
        this.message = message;
        this.postId = postId;
    }

    // Getters and Setters
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }
}
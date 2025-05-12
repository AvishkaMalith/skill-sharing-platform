package com.skill_share_platform.DataTransferObject;

import java.util.Date;
import java.util.List;

public class PostDataTransferObject {
    private String postId;
    private String userId;
    private Date postTime;
    private String publisherName;
    private String publisherId;
    private String content;
    private List<String> images;
    private List<String> videos;

    // Default constructor
    public PostDataTransferObject() {
    }

    // Parameterized constructor
    public PostDataTransferObject(String postId, String userId, Date postTime, String publisherName, String publisherId,
                                  String content, List<String> images, List<String> videos) {
        this.postId = postId;
        this.userId = userId;
        this.postTime = postTime;
        this.publisherName = publisherName;
        this.publisherId = publisherId;
        this.content = content;
        this.images = images;
        this.videos = videos;
    }

    // Getters and Setters
    public String getPostId() {
        return postId;
    }
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    public void setPostId(String postId) {
        this.postId = postId;
    }

    public Date getPostTime() {
        return postTime;
    }

    public void setPostTime(Date postTime) {
        this.postTime = postTime;
    }

    public String getPublisherName() {
        return publisherName;
    }

    public void setPublisherName(String publisherName) {
        this.publisherName = publisherName;
    }

    public String getPublisherId() {
        return publisherId;
    }

    public void setPublisherId(String publisherId) {
        this.publisherId = publisherId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public List<String> getVideos() {
        return videos;
    }

    public void setVideos(List<String> videos) {
        this.videos = videos;
    }
}
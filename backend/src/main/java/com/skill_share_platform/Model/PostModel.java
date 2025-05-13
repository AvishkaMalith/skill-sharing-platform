package com.skill_share_platform.Model;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(value = "posts")
public class PostModel {
    @Id
    private String postId;
    private Date postTime;
    private String publisherName;
    private String publisherId;
    private String postCategory;
    private String postTitle;
    private String content;
    private List<String> images;
    private List<String> videos;

    // Default constructor
    public PostModel() {
    }

    // Parameterized constructor
    public PostModel(String postId, Date postTime, String publisherName, String publisherId,String postCategory,String postTitle, String content,
                     List<String> images, List<String> videos) {
        this.postId = postId;
        this.postTime = postTime;
        this.publisherName = publisherName;
        this.publisherId = publisherId;
        this.postCategory = postCategory;
        this.postTitle = postTitle;
        this.content = content;
        this.images = images;
        this.videos = videos;
    }

    // Getters and Setters
    public String getPostId() {
        return postId;
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

    public String getPostCategory() { return postCategory; }

    public void setPostCategory(String postCategory) { this.postCategory = postCategory; }

    public String getPostTitle() { return postTitle; }

    public void setPostTitle(String postTitle) { this.postTitle = postTitle; }

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
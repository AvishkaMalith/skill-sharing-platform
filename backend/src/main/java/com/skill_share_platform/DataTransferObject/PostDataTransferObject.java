package com.skill_share_platform.DataTransferObject;

import java.util.Date;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public class PostDataTransferObject {
    private String postId;
    private Date postTime;
    private String publisherName;
    private String publisherId;
    private String postTitle;
    private String content;
    private List<String> images; // Store paths after upload
    private List<String> videos; // Store paths after upload
    private List<MultipartFile> imageFiles; // New field for uploaded images
    private List<MultipartFile> videoFiles; // New field for uploaded videos

    // Default constructor
    public PostDataTransferObject() {
    }

    // Parameterized constructor
    public PostDataTransferObject(String postId, Date postTime, String publisherName, String publisherId, String postTitle,
                                  String content, List<String> images, List<String> videos, List<MultipartFile> imageFiles,
                                  List<MultipartFile> videoFiles) {
        this.postId = postId;
        this.postTime = postTime;
        this.publisherName = publisherName;
        this.publisherId = publisherId;
        this.postTitle = postTitle;
        this.content = content;
        this.images = images;
        this.videos = videos;
        this.imageFiles = imageFiles;
        this.videoFiles = videoFiles;
    }

    // Getters and Setters
    public String getPostId() { return postId; }
    public void setPostId(String postId) { this.postId = postId; }
    public Date getPostTime() { return postTime; }
    public void setPostTime(Date postTime) { this.postTime = postTime; }
    public String getPublisherName() { return publisherName; }
    public void setPublisherName(String publisherName) { this.publisherName = publisherName; }
    public String getPublisherId() { return publisherId; }
    public void setPublisherId(String publisherId) { this.publisherId = publisherId; }
    public String getPostTitle() { return postTitle; }
    public void setPostTitle(String postTitle) { this.postTitle = postTitle; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public List<String> getImages() { return images; }
    public void setImages(List<String> images) { this.images = images; }
    public List<String> getVideos() { return videos; }
    public void setVideos(List<String> videos) { this.videos = videos; }
    public List<MultipartFile> getImageFiles() { return imageFiles; }
    public void setImageFiles(List<MultipartFile> imageFiles) { this.imageFiles = imageFiles; }
    public List<MultipartFile> getVideoFiles() { return videoFiles; }
    public void setVideoFiles(List<MultipartFile> videoFiles) { this.videoFiles = videoFiles; }
}
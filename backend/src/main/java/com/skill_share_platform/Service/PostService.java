package com.skill_share_platform.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.skill_share_platform.DataTransferObject.PostDataTransferObject;
import com.skill_share_platform.DataTransferObject.ApiResponse;
import com.skill_share_platform.Model.PostModel;
import com.skill_share_platform.Repository.PostRepository;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    // Use a configurable upload directory, defaulting to "uploads/" in the project root
    @Value("${upload.dir:uploads/}")
    private String UPLOAD_DIR;

    // Method to create a post
    public ApiResponse createPost(PostDataTransferObject postDataTransferObject) {
        try {
            // Validate required fields
            if (postDataTransferObject.getPublisherName() == null || postDataTransferObject.getPublisherName().isEmpty()) {
                return new ApiResponse(false, "Publisher name is required", null);
            }
            if (postDataTransferObject.getPublisherId() == null || postDataTransferObject.getPublisherId().isEmpty()) {
                return new ApiResponse(false, "Publisher ID is required", null);
            }
            if (postDataTransferObject.getPostCategory() == null || postDataTransferObject.getPostCategory().isEmpty()) {
                return new ApiResponse(false, "Post Category is required", null);
            }
            if (postDataTransferObject.getPostTitle() == null || postDataTransferObject.getPostTitle().isEmpty()) {
                return new ApiResponse(false, "Post title is required", null);
            }

            PostModel post = new PostModel();
            post.setPostTime(new Date());
            post.setPublisherName(postDataTransferObject.getPublisherName());
            post.setPublisherId(postDataTransferObject.getPublisherId());
            post.setPostCategory(postDataTransferObject.getPostCategory());
            post.setPostTitle(postDataTransferObject.getPostTitle());
            post.setContent(postDataTransferObject.getContent());

            // Resolve the absolute path for UPLOAD_DIR
            Path uploadPath = Paths.get(UPLOAD_DIR).toAbsolutePath().normalize();
            Files.createDirectories(uploadPath); // Ensure the base upload directory exists

            // Handle image uploads
            List<String> imagePaths = new ArrayList<>();
            if (postDataTransferObject.getImageFiles() != null) {
                for (MultipartFile file : postDataTransferObject.getImageFiles()) {
                    if (file != null && !file.isEmpty()) {
                        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
                        Path filePath = uploadPath.resolve("images/" + fileName);
                        Files.createDirectories(filePath.getParent()); // Ensure the images directory exists
                        System.out.println("Saving image to: " + filePath.toAbsolutePath());
                        file.transferTo(filePath.toFile());
                        imagePaths.add("/uploads/images/" + fileName); // Path for static serving
                    }
                }
            }
            post.setImages(imagePaths);

            // Handle video uploads
            List<String> videoPaths = new ArrayList<>();
            if (postDataTransferObject.getVideoFiles() != null) {
                for (MultipartFile file : postDataTransferObject.getVideoFiles()) {
                    if (file != null && !file.isEmpty()) {
                        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
                        Path filePath = uploadPath.resolve("videos/" + fileName);
                        Files.createDirectories(filePath.getParent()); // Ensure the videos directory exists
                        System.out.println("Saving video to: " + filePath.toAbsolutePath());
                        file.transferTo(filePath.toFile());
                        videoPaths.add("/uploads/videos/" + fileName); // Path for static serving
                    }
                }
            }
            post.setVideos(videoPaths);

            postRepository.save(post);
            return new ApiResponse(true, "Post created successfully!", post.getPostId());
        } catch (IOException e) {
            e.printStackTrace();
            return new ApiResponse(false, "Error saving files: " + e.getMessage(), null);
        } catch (Exception e) {
            e.printStackTrace();
            return new ApiResponse(false, "Error creating post: " + e.getMessage(), null);
        }
    }

    // Other methods remain unchanged
    public List<PostModel> getPosts() {
        List<PostModel> postsList = new ArrayList<>();
        try {
            postsList = postRepository.findAll();
        } catch (Exception e) {
            System.out.println("Error fetching posts: " + e.getMessage());
        }
        return postsList;
    }

    public PostModel getPostById(String postId) {
        if (postRepository.existsById(postId)) {
            return postRepository.findById(postId).get();
        } else {
            return null;
        }
    }

    public String updatePost(PostDataTransferObject postDataTransferObject) {
        try {
            if (postRepository.existsById(postDataTransferObject.getPostId())) {
                PostModel existingPost = postRepository.findById(postDataTransferObject.getPostId()).get();
                existingPost.setPostCategory(postDataTransferObject.getPostCategory());
                existingPost.setPostTitle(postDataTransferObject.getPostTitle());
                existingPost.setContent(postDataTransferObject.getContent());
                existingPost.setImages(postDataTransferObject.getImages());
                existingPost.setVideos(postDataTransferObject.getVideos());
                postRepository.save(existingPost);
                return "Post ID: " + postDataTransferObject.getPostId() + " updated successfully";
            } else {
                return "Post ID: " + postDataTransferObject.getPostId() + " not found";
            }
        } catch (Exception e) {
            return "Error updating post: " + e.getMessage();
        }
    }

    public String deletePostById(String postId) {
        try {
            if (postRepository.existsById(postId)) {
                postRepository.deleteById(postId);
                return "Post ID: " + postId + " deleted successfully";
            } else {
                return "Post ID: " + postId + " not found";
            }
        } catch (Exception e) {
            return "Error deleting post: " + e.getMessage();
        }
    }
}
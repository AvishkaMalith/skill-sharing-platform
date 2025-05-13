package com.skill_share_platform.Service;

import com.skill_share_platform.DataTransferObject.ApiResponse;
import com.skill_share_platform.DataTransferObject.PostDataTransferObject;
import com.skill_share_platform.Model.PostModel;
import com.skill_share_platform.Repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Value("${upload.dir:uploads/}")
    private String UPLOAD_DIR;

    public List<PostModel> getPosts() {
        try {
            return postRepository.findAll();
        } catch (Exception e) {
            System.out.println("Error fetching posts: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    public PostModel getPostById(String postId) {
        try {
            Optional<PostModel> post = postRepository.findById(postId);
            return post.orElse(null);
        } catch (Exception e) {
            System.out.println("Error fetching post by ID: " + e.getMessage());
            return null;
        }
    }

    public ApiResponse createPost(PostDataTransferObject postDataTransferObject) {
        try {
            if (postDataTransferObject.getPublisherName() == null || postDataTransferObject.getPublisherName().isEmpty()) {
                return new ApiResponse(false, "Publisher name is required", null);
            }
            if (postDataTransferObject.getPublisherId() == null || postDataTransferObject.getPublisherId().isEmpty()) {
                return new ApiResponse(false, "Publisher ID is required", null);
            }
            if (postDataTransferObject.getPostTitle() == null || postDataTransferObject.getPostTitle().isEmpty()) {
                return new ApiResponse(false, "Post title is required", null);
            }
            if (postDataTransferObject.getPostCategory() == null || postDataTransferObject.getPostCategory().isEmpty()) {
                return new ApiResponse(false, "Post category is required", null);
            }

            PostModel post = new PostModel();
            post.setPostTime(new Date());
            post.setPublisherName(postDataTransferObject.getPublisherName());
            post.setPublisherId(postDataTransferObject.getPublisherId());
            post.setPostTitle(postDataTransferObject.getPostTitle());
            post.setContent(postDataTransferObject.getContent());
            post.setPostCategory(postDataTransferObject.getPostCategory());

            Path uploadPath = Paths.get(UPLOAD_DIR).toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);

            List<String> imagePaths = new ArrayList<>();
            if (postDataTransferObject.getImageFiles() != null) {
                for (MultipartFile file : postDataTransferObject.getImageFiles()) {
                    if (file != null && !file.isEmpty()) {
                        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
                        Path filePath = uploadPath.resolve("images/" + fileName);
                        Files.createDirectories(filePath.getParent());
                        System.out.println("Saving image to: " + filePath.toAbsolutePath());
                        file.transferTo(filePath.toFile());
                        imagePaths.add("/uploads/images/" + fileName);
                    }
                }
            }
            post.setImages(imagePaths);

            List<String> videoPaths = new ArrayList<>();
            if (postDataTransferObject.getVideoFiles() != null) {
                for (MultipartFile file : postDataTransferObject.getVideoFiles()) {
                    if (file != null && !file.isEmpty()) {
                        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
                        Path filePath = uploadPath.resolve("videos/" + fileName);
                        Files.createDirectories(filePath.getParent());
                        System.out.println("Saving video to: " + filePath.toAbsolutePath());
                        file.transferTo(filePath.toFile());
                        videoPaths.add("/uploads/videos/" + fileName);
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

    public ApiResponse updatePost(PostDataTransferObject postDataTransferObject) {
        try {
            Optional<PostModel> existingPostOpt = postRepository.findById(postDataTransferObject.getPostId());
            if (!existingPostOpt.isPresent()) {
                return new ApiResponse(false, "Post not found", null);
            }

            PostModel post = existingPostOpt.get();
            post.setPostTitle(postDataTransferObject.getPostTitle());
            post.setContent(postDataTransferObject.getContent());
            post.setPostCategory(postDataTransferObject.getPostCategory());
            post.setPublisherName(postDataTransferObject.getPublisherName());
            post.setPublisherId(postDataTransferObject.getPublisherId());
            post.setPostTime(new Date()); // Update timestamp

            Path uploadPath = Paths.get(UPLOAD_DIR).toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);

            List<String> imagePaths = post.getImages() != null ? new ArrayList<>(post.getImages()) : new ArrayList<>();
            if (postDataTransferObject.getImageFiles() != null) {
                for (MultipartFile file : postDataTransferObject.getImageFiles()) {
                    if (file != null && !file.isEmpty()) {
                        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
                        Path filePath = uploadPath.resolve("images/" + fileName);
                        Files.createDirectories(filePath.getParent());
                        file.transferTo(filePath.toFile());
                        imagePaths.add("/uploads/images/" + fileName);
                    }
                }
            }
            post.setImages(imagePaths);

            List<String> videoPaths = post.getVideos() != null ? new ArrayList<>(post.getVideos()) : new ArrayList<>();
            if (postDataTransferObject.getVideoFiles() != null) {
                for (MultipartFile file : postDataTransferObject.getVideoFiles()) {
                    if (file != null && !file.isEmpty()) {
                        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
                        Path filePath = uploadPath.resolve("videos/" + fileName);
                        Files.createDirectories(filePath.getParent());
                        file.transferTo(filePath.toFile());
                        videoPaths.add("/uploads/videos/" + fileName);
                    }
                }
            }
            post.setVideos(videoPaths);

            postRepository.save(post);
            return new ApiResponse(true, "Post updated successfully!", post.getPostId());
        } catch (IOException e) {
            e.printStackTrace();
            return new ApiResponse(false, "Error saving files: " + e.getMessage(), null);
        } catch (Exception e) {
            e.printStackTrace();
            return new ApiResponse(false, "Error updating post: " + e.getMessage(), null);
        }
    }

    public ApiResponse deletePost(String postId) {
        try {
            Optional<PostModel> postOpt = postRepository.findById(postId);
            if (!postOpt.isPresent()) {
                return new ApiResponse(false, "Post not found", null);
            }

            PostModel post = postOpt.get();
            Path uploadPath = Paths.get(UPLOAD_DIR).toAbsolutePath().normalize();

            // Delete associated files
            if (post.getImages() != null) {
                for (String imagePath : post.getImages()) {
                    Path filePath = uploadPath.resolve(imagePath.replace("/uploads/", ""));
                    Files.deleteIfExists(filePath);
                }
            }
            if (post.getVideos() != null) {
                for (String videoPath : post.getVideos()) {
                    Path filePath = uploadPath.resolve(videoPath.replace("/uploads/", ""));
                    Files.deleteIfExists(filePath);
                }
            }

            postRepository.deleteById(postId);
            return new ApiResponse(true, "Post deleted successfully!", null);
        } catch (IOException e) {
            e.printStackTrace();
            return new ApiResponse(false, "Error deleting files: " + e.getMessage(), null);
        } catch (Exception e) {
            e.printStackTrace();
            return new ApiResponse(false, "Error deleting post: " + e.getMessage(), null);
        }
    }
}
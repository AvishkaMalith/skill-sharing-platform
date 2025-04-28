package com.skill_share_platform.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skill_share_platform.DataTransferObject.PostDataTransferObject;
import com.skill_share_platform.Model.PostModel;
import com.skill_share_platform.Repository.PostRepository;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    // Method to create a post
    public String createPost(PostDataTransferObject postDataTransferObject) {
        try {
            PostModel post = new PostModel();
            post.setPostTime(new Date()); // Set the current time
            post.setPublisherName(postDataTransferObject.getPublisherName());
            post.setPublisherId(postDataTransferObject.getPublisherId());
            post.setContent(postDataTransferObject.getContent());
            post.setImages(postDataTransferObject.getImages());
            post.setVideos(postDataTransferObject.getVideos());
            postRepository.save(post);
            return "Post ID: " + post.getPostId() + " created successfully";
        } catch (Exception e) {
            return "Error creating post: " + e.getMessage();
        }
    }

    // Method to get all posts
    public List<PostModel> getPosts() {
        List<PostModel> postsList = new ArrayList<>();
        try {
            postsList = postRepository.findAll();
        } catch (Exception e) {
            System.out.println("Error fetching posts: " + e.getMessage());
        }
        return postsList;
    }

    // Method to get a post by ID
    public PostModel getPostById(String postId) {
        if (postRepository.existsById(postId)) {
            return postRepository.findById(postId).get();
        } else {
            return null;
        }
    }

    // Method to update a post
    public String updatePost(PostDataTransferObject postDataTransferObject) {
        try {
            if (postRepository.existsById(postDataTransferObject.getPostId())) {
                PostModel existingPost = postRepository.findById(postDataTransferObject.getPostId()).get();
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

    // Method to delete a post by ID
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
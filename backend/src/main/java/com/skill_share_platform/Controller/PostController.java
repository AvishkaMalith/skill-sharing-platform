package com.skill_share_platform.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.skill_share_platform.DataTransferObject.PostDataTransferObject;
import com.skill_share_platform.DataTransferObject.ApiResponse;
import com.skill_share_platform.Model.PostModel;
import com.skill_share_platform.Service.PostService;

@RestController
@RequestMapping("api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    // Endpoint to create a post
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse createPost(@RequestBody PostDataTransferObject postDataTransferObject) {
        return postService.createPost(postDataTransferObject);
    }

    // Endpoint to get all posts (for the wall)
    @GetMapping("/get")
    @ResponseStatus(HttpStatus.OK)
    public List<PostModel> getPosts() {
        return postService.getPosts();
    }

    // Endpoint to get a post by ID
    @GetMapping("/get/{postId}")
    @ResponseStatus(HttpStatus.OK)
    public PostModel getPostById(@PathVariable String postId) {
        return postService.getPostById(postId);
    }

    // Endpoint to update a post
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    public String updatePost(@RequestBody PostDataTransferObject postDataTransferObject) {
        return postService.updatePost(postDataTransferObject);
    }

    // Endpoint to delete a post by ID
    @DeleteMapping("/delete/{postId}")
    @ResponseStatus(HttpStatus.OK)
    public String deletePostById(@PathVariable String postId) {
        return postService.deletePostById(postId);
    }
}
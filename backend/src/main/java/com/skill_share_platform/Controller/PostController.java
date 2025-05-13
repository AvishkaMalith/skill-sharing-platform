package com.skill_share_platform.Controller;

import com.skill_share_platform.DataTransferObject.ApiResponse;
import com.skill_share_platform.DataTransferObject.PostDataTransferObject;
import com.skill_share_platform.Model.PostModel;
import com.skill_share_platform.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping("/get")
    @ResponseStatus(HttpStatus.OK)
    public List<PostModel> getPosts() {
        return postService.getPosts();
    }

    @GetMapping("/get/by-user/{publisherId}")
    @ResponseStatus(HttpStatus.OK)
    public List<PostModel> getPostsByPublisherId(@PathVariable String publisherId) {
        return postService.getPostsByPublisherId(publisherId);
    }

    @GetMapping("/get/{postId}")
    @ResponseStatus(HttpStatus.OK)
    public PostModel getPostById(@PathVariable String postId) {
        return postService.getPostById(postId);
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse createPost(
            @RequestParam("publisherName") String publisherName,
            @RequestParam("publisherId") String publisherId,
            @RequestParam("postTitle") String postTitle,
            @RequestParam("content") String content,
            @RequestParam("postCategory") String postCategory,
            @RequestParam(value = "imageFiles", required = false) List<MultipartFile> imageFiles,
            @RequestParam(value = "videoFiles", required = false) List<MultipartFile> videoFiles) {

        PostDataTransferObject postData = new PostDataTransferObject();
        postData.setPublisherName(publisherName);
        postData.setPublisherId(publisherId);
        postData.setPostTitle(postTitle);
        postData.setContent(content);
        postData.setPostCategory(postCategory);
        postData.setImageFiles(imageFiles);
        postData.setVideoFiles(videoFiles);

        return postService.createPost(postData);
    }

    @PutMapping("/update/{postId}")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse updatePost(
            @PathVariable String postId,
            @RequestParam("publisherName") String publisherName,
            @RequestParam("publisherId") String publisherId,
            @RequestParam("postTitle") String postTitle,
            @RequestParam("content") String content,
            @RequestParam("postCategory") String postCategory,
            @RequestParam(value = "imageFiles", required = false) List<MultipartFile> imageFiles,
            @RequestParam(value = "videoFiles", required = false) List<MultipartFile> videoFiles) {

        PostDataTransferObject postData = new PostDataTransferObject();
        postData.setPostId(postId);
        postData.setPublisherName(publisherName);
        postData.setPublisherId(publisherId);
        postData.setPostTitle(postTitle);
        postData.setContent(content);
        postData.setPostCategory(postCategory);
        postData.setImageFiles(imageFiles);
        postData.setVideoFiles(videoFiles);

        return postService.updatePost(postData);
    }

    @DeleteMapping("/delete/{postId}")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse deletePost(@PathVariable String postId) {
        return postService.deletePost(postId);
    }
}
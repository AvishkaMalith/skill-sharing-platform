package com.skill_share_platform.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.skill_share_platform.Model.PostModel;

public interface PostRepository extends MongoRepository<PostModel, String> {
    List<PostModel> findByPublisherId(String publisherId);

    // Get the count of posts by a specific publisher
    long countByPublisherId(String publisherId);
}
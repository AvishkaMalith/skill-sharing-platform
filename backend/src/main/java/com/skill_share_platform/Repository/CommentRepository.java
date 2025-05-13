package com.skill_share_platform.Repository;

import com.skill_share_platform.Model.CommentModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CommentRepository extends MongoRepository<CommentModel, String> {
    List<CommentModel> findByPostId(String postId);
}
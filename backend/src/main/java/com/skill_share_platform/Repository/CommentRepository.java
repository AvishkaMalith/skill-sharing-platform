package com.skill_share_platform.Repository;

import com.skill_share_platform.Model.CommentModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends MongoRepository<CommentModel, String> {
    List<CommentModel> findByPostIdOrderByCreatedAtDesc(String postId);
    long countByPostId(String postId);
}
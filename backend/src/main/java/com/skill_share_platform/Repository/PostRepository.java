package com.skill_share_platform.Repository;

import com.skill_share_platform.Model.PostModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface PostRepository extends MongoRepository<PostModel, String> {
    List<PostModel> findByPublisherId(String publisherId);
}
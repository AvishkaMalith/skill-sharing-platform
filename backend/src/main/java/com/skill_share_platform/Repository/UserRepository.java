package com.skill_share_platform.Repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.skill_share_platform.Model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    
}

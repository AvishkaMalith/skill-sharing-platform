package com.skill_share_platform.Repository;

import com.skill_share_platform.Model.LearningGoal;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearningGoalRepository extends MongoRepository<LearningGoal, String> {
    List<LearningGoal> findByUserUserId(String userId);
    List<LearningGoal> findByUserUserIdAndStatus(String userId, String status);
    List<LearningGoal> findByCategory(String category);
} 
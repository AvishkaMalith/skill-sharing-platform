package com.skill_share_platform.Controller;

import com.skill_share_platform.DataTransferObject.LearningGoalDTO;
import com.skill_share_platform.Service.LearningGoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/learning-goals")
public class LearningGoalController {

    @Autowired
    private LearningGoalService learningGoalService;

    @PostMapping
    public ResponseEntity<String> createLearningGoal(@RequestBody LearningGoalDTO learningGoalDTO) {
        String response = learningGoalService.createLearningGoal(learningGoalDTO);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateLearningGoal(
            @PathVariable String id,
            @RequestBody LearningGoalDTO learningGoalDTO) {
        String response = learningGoalService.updateLearningGoal(id, learningGoalDTO);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLearningGoal(@PathVariable String id) {
        String response = learningGoalService.deleteLearningGoal(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getLearningGoalById(@PathVariable String id) {
        LearningGoalDTO goal = learningGoalService.getLearningGoalById(id);
        if (goal == null) {
            return ResponseEntity.ok("Learning Goal ID: " + id + " not found");
        }
        return ResponseEntity.ok(goal);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getLearningGoalsByUserId(@PathVariable String userId) {
        List<LearningGoalDTO> goals = learningGoalService.getLearningGoalsByUserId(userId);
        if (goals == null || goals.isEmpty()) {
            return ResponseEntity.ok("No learning goals found for User ID: " + userId);
        }
        return ResponseEntity.ok(goals);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<?> getLearningGoalsByCategory(@PathVariable String category) {
        List<LearningGoalDTO> goals = learningGoalService.getLearningGoalsByCategory(category);
        if (goals == null || goals.isEmpty()) {
            return ResponseEntity.ok("No learning goals found for category: " + category);
        }
        return ResponseEntity.ok(goals);
    }

    @GetMapping("/user/{userId}/status/{status}")
    public ResponseEntity<?> getLearningGoalsByUserIdAndStatus(@PathVariable String userId, @PathVariable String status) {
        List<LearningGoalDTO> goals = learningGoalService.getLearningGoalsByUserIdAndStatus(userId, status);
        if (goals == null || goals.isEmpty()) {
            return ResponseEntity.ok("No learning goals found for User ID: " + userId + " and status: " + status);
        }
        return ResponseEntity.ok(goals);
    }
} 
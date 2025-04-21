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
    public ResponseEntity<LearningGoalDTO> createLearningGoal(@RequestBody LearningGoalDTO learningGoalDTO) {
        LearningGoalDTO createdGoal = learningGoalService.createLearningGoal(learningGoalDTO);
        return ResponseEntity.ok(createdGoal);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LearningGoalDTO> updateLearningGoal(
            @PathVariable String id,
            @RequestBody LearningGoalDTO learningGoalDTO) {
        LearningGoalDTO updatedGoal = learningGoalService.updateLearningGoal(id, learningGoalDTO);
        return ResponseEntity.ok(updatedGoal);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLearningGoal(@PathVariable String id) {
        learningGoalService.deleteLearningGoal(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LearningGoalDTO> getLearningGoalById(@PathVariable String id) {
        LearningGoalDTO goal = learningGoalService.getLearningGoalById(id);
        return ResponseEntity.ok(goal);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LearningGoalDTO>> getLearningGoalsByUserId(@PathVariable String userId) {
        List<LearningGoalDTO> goals = learningGoalService.getLearningGoalsByUserId(userId);
        return ResponseEntity.ok(goals);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<LearningGoalDTO>> getLearningGoalsByCategory(@PathVariable String category) {
        List<LearningGoalDTO> goals = learningGoalService.getLearningGoalsByCategory(category);
        return ResponseEntity.ok(goals);
    }
} 
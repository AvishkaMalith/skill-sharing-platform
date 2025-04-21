package com.skill_share_platform.Service;

import com.skill_share_platform.DataTransferObject.LearningGoalDTO;
import com.skill_share_platform.Model.LearningGoal;
import com.skill_share_platform.Model.UserModel;
import com.skill_share_platform.Repository.LearningGoalRepository;
import com.skill_share_platform.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LearningGoalService {

    @Autowired
    private LearningGoalRepository learningGoalRepository;

    @Autowired
    private UserRepository userRepository;

    public LearningGoalDTO createLearningGoal(LearningGoalDTO learningGoalDTO) {
        LearningGoal learningGoal = new LearningGoal();
        learningGoal.setTitle(learningGoalDTO.getTitle());
        learningGoal.setDescription(learningGoalDTO.getDescription());
        learningGoal.setCategory(learningGoalDTO.getCategory());
        learningGoal.setTargetDate(learningGoalDTO.getTargetDate());
        learningGoal.setStartDate(LocalDateTime.now());
        learningGoal.setStatus("IN_PROGRESS");
        
        UserModel user = userRepository.findById(learningGoalDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        learningGoal.setUser(user);
        
        LearningGoal savedGoal = learningGoalRepository.save(learningGoal);
        return convertToDTO(savedGoal);
    }

    public LearningGoalDTO updateLearningGoal(String id, LearningGoalDTO learningGoalDTO) {
        LearningGoal existingGoal = learningGoalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Learning goal not found"));
        
        existingGoal.setTitle(learningGoalDTO.getTitle());
        existingGoal.setDescription(learningGoalDTO.getDescription());
        existingGoal.setCategory(learningGoalDTO.getCategory());
        existingGoal.setTargetDate(learningGoalDTO.getTargetDate());
        existingGoal.setStatus(learningGoalDTO.getStatus());
        
        LearningGoal updatedGoal = learningGoalRepository.save(existingGoal);
        return convertToDTO(updatedGoal);
    }

    public void deleteLearningGoal(String id) {
        learningGoalRepository.deleteById(id);
    }

    public LearningGoalDTO getLearningGoalById(String id) {
        LearningGoal goal = learningGoalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Learning goal not found"));
        return convertToDTO(goal);
    }

    public List<LearningGoalDTO> getLearningGoalsByUserId(String userId) {
        List<LearningGoal> goals = learningGoalRepository.findByUserUserId(userId);
        return goals.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<LearningGoalDTO> getLearningGoalsByCategory(String category) {
        List<LearningGoal> goals = learningGoalRepository.findByCategory(category);
        return goals.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private LearningGoalDTO convertToDTO(LearningGoal goal) {
        LearningGoalDTO dto = new LearningGoalDTO();
        dto.setId(goal.getId());
        dto.setTitle(goal.getTitle());
        dto.setDescription(goal.getDescription());
        dto.setCategory(goal.getCategory());
        dto.setStartDate(goal.getStartDate());
        dto.setTargetDate(goal.getTargetDate());
        dto.setStatus(goal.getStatus());
        dto.setUserId(goal.getUser().getUserId());
        return dto;
    }
} 
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

    public String createLearningGoal(LearningGoalDTO learningGoalDTO) {
        try {
            LearningGoal learningGoal = new LearningGoal();
            learningGoal.setTitle(learningGoalDTO.getTitle());
            learningGoal.setDescription(learningGoalDTO.getDescription());
            learningGoal.setCategory(learningGoalDTO.getCategory());
            learningGoal.setTargetDate(learningGoalDTO.getTargetDate());
            learningGoal.setStartDate(LocalDateTime.now());
            if (learningGoalDTO.getMilestones() != null) {
                learningGoal.setMilestones(convertToMilestones(learningGoalDTO.getMilestones()));
            }
            // Set status based on progress
            if (learningGoal.getMilestones() != null && !learningGoal.getMilestones().isEmpty()
                && learningGoal.getMilestones().stream().allMatch(LearningGoal.Milestone::isCompleted)) {
                learningGoal.setStatus("COMPLETED");
            } else {
                learningGoal.setStatus("IN_PROGRESS");
            }
            UserModel user = userRepository.findById(learningGoalDTO.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            learningGoal.setUser(user);
            LearningGoal savedGoal = learningGoalRepository.save(learningGoal);
            return "Learning Goal ID: " + savedGoal.getId() + " created successfully";
        } catch (Exception e) {
            return "Error creating learning goal: " + e.getMessage();
        }
    }

    public String updateLearningGoal(String id, LearningGoalDTO learningGoalDTO) {
        try {
            LearningGoal existingGoal = learningGoalRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Learning goal not found"));
            existingGoal.setTitle(learningGoalDTO.getTitle());
            existingGoal.setDescription(learningGoalDTO.getDescription());
            existingGoal.setCategory(learningGoalDTO.getCategory());
            existingGoal.setTargetDate(learningGoalDTO.getTargetDate());
            if (learningGoalDTO.getMilestones() != null) {
                existingGoal.setMilestones(convertToMilestones(learningGoalDTO.getMilestones()));
            }
            // Set status based on progress
            if (existingGoal.getMilestones() != null && !existingGoal.getMilestones().isEmpty()
                && existingGoal.getMilestones().stream().allMatch(LearningGoal.Milestone::isCompleted)) {
                existingGoal.setStatus("COMPLETED");
            } else {
                existingGoal.setStatus("IN_PROGRESS");
            }
            learningGoalRepository.save(existingGoal);
            return "Learning Goal ID: " + id + " updated successfully";
        } catch (Exception e) {
            return "Error updating learning goal: " + e.getMessage();
        }
    }

    public String deleteLearningGoal(String id) {
        try {
            if (learningGoalRepository.existsById(id)) {
                learningGoalRepository.deleteById(id);
                return "Learning Goal ID: " + id + " deleted successfully";
            } else {
                return "Learning Goal ID: " + id + " not found";
            }
        } catch (Exception e) {
            return "Error deleting learning goal: " + e.getMessage();
        }
    }

    public LearningGoalDTO getLearningGoalById(String id) {
        try {
            LearningGoal goal = learningGoalRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Learning goal not found"));
            return convertToDTO(goal);
        } catch (Exception e) {
            System.out.println("Error fetching learning goal: " + e.getMessage());
            return null;
        }
    }

    public List<LearningGoalDTO> getLearningGoalsByUserId(String userId) {
        try {
            List<LearningGoal> goals = learningGoalRepository.findByUserUserId(userId);
            return goals.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.out.println("Error fetching learning goals by user: " + e.getMessage());
            return null;
        }
    }

    public List<LearningGoalDTO> getLearningGoalsByCategory(String category) {
        try {
            List<LearningGoal> goals = learningGoalRepository.findByCategory(category);
            return goals.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.out.println("Error fetching learning goals by category: " + e.getMessage());
            return null;
        }
    }

    public List<LearningGoalDTO> getLearningGoalsByUserIdAndStatus(String userId, String status) {
        try {
            List<LearningGoal> goals = learningGoalRepository.findByUserUserIdAndStatus(userId, status);
            return goals.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.out.println("Error fetching learning goals by user and status: " + e.getMessage());
            return null;
        }
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
        if (goal.getMilestones() != null) {
            dto.setMilestones(convertToMilestoneDTOs(goal.getMilestones()));
        }
        dto.setUserId(goal.getUser().getUserId());
        return dto;
    }

    private List<LearningGoal.Milestone> convertToMilestones(List<LearningGoalDTO.MilestoneDTO> milestoneDTOs) {
        if (milestoneDTOs == null) return null;
        return milestoneDTOs.stream()
                .map(dto -> {
                    LearningGoal.Milestone milestone = new LearningGoal.Milestone();
                    milestone.setTitle(dto.getTitle());
                    milestone.setDescription(dto.getDescription());
                    milestone.setCompleted(dto.isCompleted());
                    milestone.setCompletedDate(dto.getCompletedDate());
                    return milestone;
                })
                .collect(Collectors.toList());
    }

    private List<LearningGoalDTO.MilestoneDTO> convertToMilestoneDTOs(List<LearningGoal.Milestone> milestones) {
        if (milestones == null) return null;
        return milestones.stream()
                .map(milestone -> {
                    LearningGoalDTO.MilestoneDTO dto = new LearningGoalDTO.MilestoneDTO();
                    dto.setTitle(milestone.getTitle());
                    dto.setDescription(milestone.getDescription());
                    dto.setCompleted(milestone.isCompleted());
                    dto.setCompletedDate(milestone.getCompletedDate());
                    return dto;
                })
                .collect(Collectors.toList());
    }
} 
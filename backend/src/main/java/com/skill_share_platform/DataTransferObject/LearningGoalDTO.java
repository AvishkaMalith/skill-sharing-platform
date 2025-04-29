package com.skill_share_platform.DataTransferObject;

import java.time.LocalDateTime;
import java.util.List;

public class LearningGoalDTO {
    private String id;
    private String title;
    private String description;
    private String category;
    private LocalDateTime startDate;
    private LocalDateTime targetDate;
    private String status;
    private List<MilestoneDTO> milestones;
    private String userId;

    public static class MilestoneDTO {
        private String title;
        private String description;
        private boolean completed;
        private LocalDateTime completedDate;

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public boolean isCompleted() { return completed; }
        public void setCompleted(boolean completed) { this.completed = completed; }
        public LocalDateTime getCompletedDate() { return completedDate; }
        public void setCompletedDate(LocalDateTime completedDate) { this.completedDate = completedDate; }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public LocalDateTime getStartDate() { return startDate; }
    public void setStartDate(LocalDateTime startDate) { this.startDate = startDate; }
    public LocalDateTime getTargetDate() { return targetDate; }
    public void setTargetDate(LocalDateTime targetDate) { this.targetDate = targetDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public List<MilestoneDTO> getMilestones() { return milestones; }
    public void setMilestones(List<MilestoneDTO> milestones) { this.milestones = milestones; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
} 
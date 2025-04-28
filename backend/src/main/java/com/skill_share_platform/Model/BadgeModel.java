package com.skill_share_platform.Model;

import java.util.Date;

public class BadgeModel {
  private String badgeName;
  private String badgeDescription;
  private Date BadgeAwardedDate;

  // Default Constructor
  public BadgeModel() {
  }

  // Parameterized Constructor
  public BadgeModel(String badgeName, String badgeDescription, Date badgeAwardedDate) {
    this.badgeName = badgeName;
    this.badgeDescription = badgeDescription;
    this.BadgeAwardedDate = badgeAwardedDate;
  }

  // Getters and Setters
  public String getBadgeName() {
    return badgeName;
  }

  public void setBadgeName(String badgeName) {
    this.badgeName = badgeName;
  }

  public String getBadgeDescription() {
    return badgeDescription;
  }

  public void setBadgeDescription(String badgeDescription) {
    this.badgeDescription = badgeDescription;
  }

  public Date getBadgeAwardedDate() {
    return BadgeAwardedDate;
  }

  public void setBadgeAwardedDate(Date badgeAwardedDate) {
    this.BadgeAwardedDate = badgeAwardedDate;
  }
}

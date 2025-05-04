package com.skill_share_platform.Model;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;

@Document(value = "users")
public class UserModel implements UserDetails {
    @Id
    private String userId;
    // Basic user attributes
    private String userName;
    private String userEmail;
    private String userPassword;
    // Profile info
    private String fullName;
    private String bio;
    private String profilePictureUrl;
    private String location;
    private List<String> badges;
    private List<String> currentSkills;
    private Map<String, String> socialLinks;
    // Social interactions
    private List<String> followers;
    private List<String> following;
    // user roles
    private List<String> roles;
    private boolean enabled;
    private Date createdAt;
    private Date updatedAt;

    // Default constructor
    public UserModel() {
    }

    // Parameterized constructor
    public UserModel(String userId, String userName, String userEmail, String userPassword, String fullName, String bio,
            String profilePictureUrl, String location, List<String> badges, List<String> currentSkills, Map<String, String> socialLinks,
            List<String> followers, List<String> following, List<String> roles,
            boolean enabled, Date createdAt, Date updatedAt) {
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.fullName = fullName;
        this.bio = bio;
        this.profilePictureUrl = profilePictureUrl;
        this.location = location;
        this.badges = badges;
        this.currentSkills = currentSkills;
        this.socialLinks = socialLinks;
        this.followers = followers;
        this.following = following;
        this.roles = roles;
        this.enabled = enabled;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // UserDetails implementation
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        if (roles != null) {
            for (String role : roles) {
                authorities.add(new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()));
            }
        }
        return authorities;
    }

    @Override
    public String getPassword() {
        return userPassword;
    }

    @Override
    public String getUsername() {
        return userEmail;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    // Setters for attributes
    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public void setProfilePictureUrl(String profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setCurrentSkills(List<String> currentSkills) {
        this.currentSkills = currentSkills;
    }

    public void setSocialLinks(Map<String, String> socialLinks) {
        this.socialLinks = socialLinks;
    }

    public void setFollowers(List<String> followers) {
        this.followers = followers;
    }

    public void setFollowing(List<String> following) {
        this.following = following;
    }

    public void setBadges(List<String> badges) {
        this.badges = badges;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    // Getters for attributes
    public String getUserId() {
        return userId;
    }
    
    public String getUserName() {
        return userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public String getFullName() {
        return fullName;
    }

    public String getBio() {
        return bio;
    }

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    public String getLocation() {
        return location;
    }

    public List<String> getCurrentSkills() {
        return currentSkills;
    }

    public Map<String, String> getSocialLinks() {
        return socialLinks;
    }

    public List<String> getFollowers() {
        return followers;
    }

    public List<String> getFollowing() {
        return following;
    }

    public List<String> getBadges() {
        return badges;
    }

    public List<String> getRoles() {
        return roles;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }
}

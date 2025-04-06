package com.skill_share_platform.Service;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skill_share_platform.Repository.UserRepository;
import com.skill_share_platform.DataTransferObject.UserDataTransferObject;
import com.skill_share_platform.Model.User;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String createUser(UserDataTransferObject userDataTransferObject) {
        try {
            User user = new User();
            user.setUserId(userDataTransferObject.getUserId());
            user.setUserName(userDataTransferObject.getUserName());
            user.setUserEmail(userDataTransferObject.getUserEmail());
            user.setUserPassword(userDataTransferObject.getUserPassword());
            user.setFullName(userDataTransferObject.getFullName());
            user.setBio(userDataTransferObject.getBio());
            user.setProfilePictureUrl(userDataTransferObject.getProfilePictureUrl());
            user.setLocation(userDataTransferObject.getLocation());
            user.setCurrentSkills(userDataTransferObject.getCurrentSkills());
            user.setSocialLinks(userDataTransferObject.getSocialLinks());
            user.setFollowers(userDataTransferObject.getFollowers());
            user.setFollowing(userDataTransferObject.getFollowing());
            user.setBadges(userDataTransferObject.getBadges());
            user.setRoles(userDataTransferObject.getRoles());
            user.setEnabled(userDataTransferObject.isEnabled());
            user.setCreatedAt(userDataTransferObject.getCreatedAt());
            user.setUpdatedAt(userDataTransferObject.getUpdatedAt());

            userRepository.save(user);
            return "User ID : " + userDataTransferObject.getUserId() + " created successfully";
        } catch (Exception e) {
            return "Error creating user: " + e.getMessage();
        }
    }

    public List<User> getUsers() {
        List<User> usersList = new ArrayList<>();
        try {
            usersList = userRepository.findAll();
        } catch (Exception e) {
            System.out.println("Error fetching users: " + e.getMessage());
        }
        return usersList;
    }

    public String deleteUserById(String userId) {
        try {
            if (userRepository.existsById(userId)) {
                userRepository.deleteById(userId);
                return "User ID : " + userId + " deleted successfully";
            } else {
                return "User ID : " + userId + " not found";
            }
        } catch (Exception e) {
            return "Error deleting user: " + e.getMessage();
        }
    }
}

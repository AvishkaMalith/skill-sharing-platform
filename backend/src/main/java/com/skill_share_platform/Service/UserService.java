package com.skill_share_platform.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skill_share_platform.DataTransferObject.UserDataTransferObject;
import com.skill_share_platform.Model.UserModel;
import com.skill_share_platform.Repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Method to create a user
    public String createUser(UserDataTransferObject userDataTransferObject) {
        try {
            // Creating an object of User class
            UserModel user = new UserModel();
            // Assigning the values of Data trasnfer object class to the user object
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
            // Saving the user object to the database
            UserModel savedUser = userRepository.save(user);
            return "User ID : " + savedUser.getUserId() + " created successfully";
        } catch (Exception e) {
            return "Error creating user: " + e.getMessage();
        }
    }

    // Method to get all the users
    public List<UserModel> getUsers() {
        // Creating an empty list of users
        List<UserModel> usersList = new ArrayList<>();
        try {
            // assigning the users from the database to the list
            usersList = userRepository.findAll();
        } catch (Exception e) {
            System.out.println("Error fetching users: " + e.getMessage());
        }
        return usersList;
    }

    // method to delete a user with the ID
    public String deleteUserById(String userId) {
        try {
            // Checks if the given user ID exists in database
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

    // Method to get a user with ID
    public UserModel getUserById(String userId) {
        // Checking if the given user ID exists in database
        if (userRepository.existsById(userId)) {
            // If user ID exists returns the user object
            return userRepository.findById(userId).get();
        } else {
            // If user ID does not exist returns null
            return null;
        }
    }

    // Method to update a user with ID
    public String updateUser(UserDataTransferObject userDataTransferObject) {
        try {
            if (userRepository.existsById(userDataTransferObject.getUserId())) {
                // Getting the existing user details
                UserModel existingUser = userRepository.findById(userDataTransferObject.getUserId()).get();
                // Assigning the values of Data transfer object class to the user object
                existingUser.setUserName(userDataTransferObject.getUserName());
                existingUser.setUserEmail(userDataTransferObject.getUserEmail());
                existingUser.setUserPassword(userDataTransferObject.getUserPassword());
                existingUser.setFullName(userDataTransferObject.getFullName());
                existingUser.setBio(userDataTransferObject.getBio());
                existingUser.setProfilePictureUrl(userDataTransferObject.getProfilePictureUrl());
                existingUser.setLocation(userDataTransferObject.getLocation());
                existingUser.setCurrentSkills(userDataTransferObject.getCurrentSkills());
                existingUser.setSocialLinks(userDataTransferObject.getSocialLinks());
                existingUser.setFollowers(userDataTransferObject.getFollowers());
                existingUser.setFollowing(userDataTransferObject.getFollowing());
                existingUser.setBadges(userDataTransferObject.getBadges());
                existingUser.setRoles(userDataTransferObject.getRoles());
                existingUser.setEnabled(userDataTransferObject.isEnabled());
                existingUser.setCreatedAt(userDataTransferObject.getCreatedAt());
                existingUser.setUpdatedAt(userDataTransferObject.getUpdatedAt());
                // Saving the updated user object to the database
                userRepository.save(existingUser);
                return "User ID : " + userDataTransferObject.getUserId() + " updated successfully";

            } else {
                return "User ID : " + userDataTransferObject.getUserId() + " not found";
            }
        } catch (Exception e) {
            return "Error updating user: " + e.getMessage();
        }
    }

    // Method to get the user by attribute
    public Optional<UserModel> getUserByEmail(String email) {
        try {
            return userRepository.findByUserEmail(email);
        } catch (Exception e) {
            System.out.println("Error fetching user by email: " + e.getMessage());
            return null;
        }
    }

}
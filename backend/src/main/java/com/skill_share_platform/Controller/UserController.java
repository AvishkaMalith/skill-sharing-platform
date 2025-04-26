package com.skill_share_platform.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;  
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;

import com.skill_share_platform.DataTransferObject.UserDataTransferObject;
import com.skill_share_platform.Service.UserService;
import com.skill_share_platform.Model.UserModel;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Endpoint to create a user
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public String createuser(@RequestBody UserDataTransferObject userDataTransferObject) {
        return userService.createUser(userDataTransferObject);
    }

    // Endponit to get all users
    @GetMapping("/get")
    @ResponseStatus(HttpStatus.OK)
    public List<UserModel> getUsers() {
        return userService.getUsers();
    }

    // Endpoint to delete a user by Id
    @DeleteMapping("/delete/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public String deleteUserById(@PathVariable String userId) {
        return userService.deleteUserById(userId);
    }

    // Endpoint to get a user by Id
    @GetMapping("/get/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public UserModel getUserById(@PathVariable String userId) {
        return userService.getUserById(userId);
    }

    // Endpoint to update a user
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    public String updateUser(@RequestBody UserDataTransferObject userDataTransferObject) {
        return userService.updateUser(userDataTransferObject);
    }

     // Endpoint to get a user by email
     @GetMapping("/email/{email}")
     public UserModel getUserByEmail(@PathVariable String email) {
         UserModel user = userService.getUserByEmail(email);
         if (user == null) {
             return null;
         }
         return user;
     }
     
}

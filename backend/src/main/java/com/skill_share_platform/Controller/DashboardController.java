package com.skill_share_platform.Controller;

import com.skill_share_platform.Model.UserModel;
import com.skill_share_platform.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> getDashboardData() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication == null || !(authentication.getPrincipal() instanceof OAuth2User)) {
            return ResponseEntity.status(401).body("User not authenticated");
        }
        
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        String email = oauth2User.getAttribute("email");
        
        if (email == null) {
            return ResponseEntity.status(401).body("Email not found in authentication");
        }
        
        Optional<UserModel> userOpt = userRepository.findByUserEmail(email);
        
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("User not found");
        }
        
        UserModel user = userOpt.get();
        
        // Create a map of dashboard data
        Map<String, Object> dashboardData = new HashMap<>();
        dashboardData.put("user", user);
        // Add more dashboard-specific data here as needed
        
        return ResponseEntity.ok(dashboardData);
    }
} 
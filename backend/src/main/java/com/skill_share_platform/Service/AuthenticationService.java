package com.skill_share_platform.Service;

import com.skill_share_platform.DataTransferObject.AuthenticationRequest;
import com.skill_share_platform.DataTransferObject.AuthenticationResponse;
import com.skill_share_platform.DataTransferObject.RegisterRequest;
import com.skill_share_platform.Model.UserModel;
import com.skill_share_platform.Repository.UserRepository;
import com.skill_share_platform.Security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = new UserModel();
        user.setUserName(request.getEmail().split("@")[0].toLowerCase());
        user.setUserEmail(request.getEmail());
        user.setUserPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setEnabled(true);
        user.setCreatedAt(new Date());
        user.setUpdatedAt(new Date());
        user.setCurrentSkills(new ArrayList<>());
        user.setSocialLinks(new HashMap<>());
        user.setFollowers(new ArrayList<>());
        user.setFollowing(new ArrayList<>());
        user.setBadges(new HashMap<>());
        user.setRoles(new ArrayList<>());

        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByUserEmail(request.getEmail());
        var jwtToken = jwtService.generateToken(user);
        
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticateWithGoogle(String email) {
        var user = userRepository.findByUserEmail(email);
        if (user == null) {
            // Create new user from Google account
            user = new UserModel();
            user.setUserName(email.split("@")[0].toLowerCase());
            user.setUserEmail(email);
            user.setEnabled(true);
            user.setCreatedAt(new Date());
            user.setUpdatedAt(new Date());
            user.setCurrentSkills(new ArrayList<>());
            user.setSocialLinks(new HashMap<>());
            user.setFollowers(new ArrayList<>());
            user.setFollowing(new ArrayList<>());
            user.setBadges(new HashMap<>());
            user.setRoles(new ArrayList<>());
            userRepository.save(user);
        }

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
} 
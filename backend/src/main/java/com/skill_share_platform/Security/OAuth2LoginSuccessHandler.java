package com.skill_share_platform.Security;

import com.skill_share_platform.Model.UserModel;
import com.skill_share_platform.Repository.UserRepository;
import com.skill_share_platform.Service.AuthenticationService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final String FRONTEND_URL = "http://localhost:5173";

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                      Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        
        UserModel user = userRepository.findByUserEmail(email);
        
        if (user == null) {
            // Create new user from Google account
            user = new UserModel();
            user.setUserName(email.split("@")[0].toLowerCase());
            user.setUserEmail(email);
            user.setFullName(name);
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

        // Generate JWT token
        String token = jwtService.generateToken(user);
        
        // Redirect to frontend with token
        String targetUrl = FRONTEND_URL + "?token=" + token;
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
} 
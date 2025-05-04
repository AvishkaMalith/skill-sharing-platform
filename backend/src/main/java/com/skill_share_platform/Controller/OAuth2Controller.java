package com.skill_share_platform.Controller;

import com.skill_share_platform.Model.UserModel;
import com.skill_share_platform.Repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Optional;

@RestController
@RequestMapping("/oauth2")
public class OAuth2Controller {

  private final UserRepository userRepository;

  public OAuth2Controller(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @GetMapping("/success")
  public RedirectView getLoginInfo(Authentication authentication) {
    OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();

    String email = oauth2User.getAttribute("email");
    String name = oauth2User.getAttribute("name");
    String picture = oauth2User.getAttribute("picture");

    if (email == null) {
      throw new RuntimeException("Email not found from OAuth2 provider");
    }

    // Find the user by email
    Optional<UserModel> existingUser = userRepository.findByUserEmail(email);

    // If not found, create and save
    if (existingUser.isEmpty()) {
      UserModel newUser = new UserModel();
      newUser.setUserEmail(email);
      newUser.setUserName(name);
      newUser.setProfilePictureUrl(picture);
      userRepository.save(newUser);
    }

    RedirectView redirectView = new RedirectView();
    redirectView.setUrl("http://localhost:5173");
    return redirectView;
  }

  @GetMapping("/user")
  public UserModel getCurrentUser(Authentication authentication) {
    OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();

    String email = oauth2User.getAttribute("email");
    String name = oauth2User.getAttribute("name");
    String picture = oauth2User.getAttribute("picture");

    UserModel user = new UserModel();
    user.setUserEmail(email);
    user.setUserName(name);
    user.setProfilePictureUrl(picture);

    return user;
  }

}

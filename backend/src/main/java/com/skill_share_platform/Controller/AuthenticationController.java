package com.skill_share_platform.Controller;

import com.skill_share_platform.DataTransferObject.AuthenticationRequest;
import com.skill_share_platform.DataTransferObject.AuthenticationResponse;
import com.skill_share_platform.DataTransferObject.RegisterRequest;
import com.skill_share_platform.Service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @GetMapping("/oauth2/success")
    public ResponseEntity<AuthenticationResponse> handleOAuth2Success(
            @RequestParam String email
    ) {
        return ResponseEntity.ok(authenticationService.authenticateWithGoogle(email));
    }

    @GetMapping("/oauth2/failure")
    public ResponseEntity<String> handleOAuth2Failure() {
        return ResponseEntity.badRequest().body("OAuth2 authentication failed");
    }
} 
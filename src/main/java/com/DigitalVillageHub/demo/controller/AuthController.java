package com.DigitalVillageHub.demo.controller;

import com.DigitalVillageHub.demo.model.dto.OnboardingRequestDTO;
import com.DigitalVillageHub.demo.model.dto.RegisterRequest;
import com.DigitalVillageHub.demo.model.dto.LoginRequest;
import com.DigitalVillageHub.demo.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.status(201).body(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    /**
     * Mendapatkan profil user yang sedang login.
     * Authentication diisi oleh JwtAuthenticationFilter sebelum request ini masuk.
     */
    @GetMapping("/profile")
    public ResponseEntity<?> profile(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "success", false,
                    "message", "Tidak terautentikasi. Silakan login ulang."
            ));
        }
        Long userId = Long.parseLong(authentication.getName());
        return ResponseEntity.ok(authService.getProfile(userId));
    }

    /**
     * Submit data onboarding (kelengkapan berkas kependudukan).
     * Authentication diisi oleh JwtAuthenticationFilter sebelum request ini masuk.
     */
    @PostMapping(value = "/onboarding", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> submitOnboarding(
            Authentication authentication,
            @ModelAttribute OnboardingRequestDTO request
    ) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "success", false,
                    "message", "Tidak terautentikasi. Silakan login ulang."
            ));
        }
        Long userId = Long.parseLong(authentication.getName());
        return ResponseEntity.ok(authService.submitOnboarding(userId, request));
    }
}
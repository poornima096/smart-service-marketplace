package com.marketplace.smart_service_marketplace.controller;




import com.marketplace.smart_service_marketplace.dto.*;
import com.marketplace.smart_service_marketplace.service.*;



import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(
            @Valid @RequestBody LoginRequestDTO request) {

        String token = authService.login(request);

        return ResponseEntity.ok(
                Map.of("token", token)
        );
    }
}
package com.marketplace.smart_service_marketplace.controller;

import com.marketplace.smart_service_marketplace.service.AIService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://luminous-mercy-production-47fd.up.railway.app"
})
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("AI controller is working");
    }

    @PostMapping("/recommend")
    public ResponseEntity<Map<String, String>> recommend(
            @RequestBody Map<String, String> request) {

        String userRequest = request.get("request");

        String recommendation =
                aiService.getRecommendation(userRequest);

        return ResponseEntity.ok(
                Map.of("recommendation", recommendation)
        );
    }
}
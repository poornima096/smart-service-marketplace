package com.marketplace.smart_service_marketplace.controller;

import com.marketplace.smart_service_marketplace.model.User;
import com.marketplace.smart_service_marketplace.repo.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final UserRepository userRepository;

    public AdminController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public ResponseEntity<List<Map<String, Object>>> getAllUsers() {

        List<User> users = userRepository.findAll();

        List<Map<String, Object>> result = new ArrayList<>();

        for (User user : users) {

            Map<String, Object> data = new HashMap<>();

            data.put("id", user.getId());
            data.put("name", user.getName());
            data.put("email", user.getEmail());
            data.put("role", user.getRole());

            result.add(data);
        }

        return ResponseEntity.ok(result);
    }
}
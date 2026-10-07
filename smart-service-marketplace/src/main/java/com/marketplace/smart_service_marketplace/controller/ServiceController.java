package com.marketplace.smart_service_marketplace.controller;



import com.marketplace.smart_service_marketplace.model.Service;
import com.marketplace.smart_service_marketplace.service.ServiceService;
import com.marketplace.smart_service_marketplace.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:5173")
public class ServiceController {

    private final ServiceService serviceService;

    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    @PostMapping
    public ResponseEntity<Service> createService(
            @RequestBody Service service,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                serviceService.createService(service, email)
        );
    }

    @GetMapping
    public ResponseEntity<List<Service>> getAllServices() {

        return ResponseEntity.ok(
                serviceService.getAllServices()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Service> getServiceById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                serviceService.getServiceById(id)
        );
    }

    @GetMapping("/search")
    public ResponseEntity<List<Service>> searchServices(
            @RequestParam String title) {

        return ResponseEntity.ok(
                serviceService.searchByTitle(title)
        );
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Service>> getByCategory(
            @PathVariable String category) {

        return ResponseEntity.ok(
                serviceService.getByCategory(category)
        );
    }

    @GetMapping("/location/{location}")
    public ResponseEntity<List<Service>> getByLocation(
            @PathVariable String location) {

        return ResponseEntity.ok(
                serviceService.getByLocation(location)
        );
    }
}
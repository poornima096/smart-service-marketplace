package com.marketplace.smart_service_marketplace.service;

import com.marketplace.smart_service_marketplace.model.Service;
import com.marketplace.smart_service_marketplace.model.User;
import com.marketplace.smart_service_marketplace.repo.ServiceRepository;
import com.marketplace.smart_service_marketplace.repo.UserRepository;

import java.util.List;

@org.springframework.stereotype.Service
public class ServiceService {

    private final ServiceRepository serviceRepository;
    private final UserRepository userRepository;

    public ServiceService(
            ServiceRepository serviceRepository,
            UserRepository userRepository) {

        this.serviceRepository = serviceRepository;
        this.userRepository = userRepository;
    }

    public Service createService(Service service, String email) {

        User vendor = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Vendor not found")
                );

        service.setVendor(vendor);

        return serviceRepository.save(service);
    }

    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

    public Service getServiceById(Long id) {
        return serviceRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Service not found")
                );
    }

    public List<Service> searchByTitle(String title) {
        return serviceRepository.findByTitleContainingIgnoreCase(title);
    }

    public List<Service> getByCategory(String category) {
        return serviceRepository.findByCategory(category);
    }

    public List<Service> getByLocation(String location) {
        return serviceRepository.findByLocation(location);
    }
}
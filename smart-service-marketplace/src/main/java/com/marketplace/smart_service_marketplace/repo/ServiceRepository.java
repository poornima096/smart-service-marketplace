package com.marketplace.smart_service_marketplace.repo;




import com.marketplace.smart_service_marketplace.model.Service;
import com.marketplace.smart_service_marketplace.service.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Service, Long> {

    List<Service> findByCategory(String category);

    List<Service> findByLocation(String location);

    List<Service> findByTitleContainingIgnoreCase(String title);
}
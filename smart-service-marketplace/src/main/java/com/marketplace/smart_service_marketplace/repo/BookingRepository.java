package com.marketplace.smart_service_marketplace.repo;


import com.marketplace.smart_service_marketplace.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserId(Long userId);

    List<Booking> findByServiceVendorId(Long vendorId);

    List<Booking> findByStatus(String status);
}

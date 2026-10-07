package com.marketplace.smart_service_marketplace.service;

import com.marketplace.smart_service_marketplace.model.Service;
import com.marketplace.smart_service_marketplace.model.Booking;
import com.marketplace.smart_service_marketplace.model.User;
import com.marketplace.smart_service_marketplace.repo.BookingRepository;
import com.marketplace.smart_service_marketplace.repo.ServiceRepository;
import com.marketplace.smart_service_marketplace.repo.UserRepository;




import java.util.List;

@org.springframework.stereotype.Service
public class BookingService {

    private final BookingRepository   bookingRepository;
    private final UserRepository userRepository;
    private final ServiceRepository serviceRepository;

    public BookingService(
            BookingRepository bookingRepository,
            UserRepository userRepository,
            ServiceRepository serviceRepository) {

        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.serviceRepository = serviceRepository;
    }

    public Booking createBooking(
            String email,
            Long serviceId,
            Booking booking) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Service service = serviceRepository.findById(serviceId)
                .orElseThrow(() ->
                        new RuntimeException("Service not found"));

        booking.setUser(user);
        booking.setService(service);
        booking.setStatus("PENDING");

        return bookingRepository.save(booking);
    }

    public List<Booking> getUserBookings(Long userId) {

        return bookingRepository.findByUserId(userId);
    }

    public List<Booking> getVendorBookings(String email) {

        User vendor = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Vendor not found"));

        return bookingRepository.findByServiceVendorId(
                vendor.getId()
        );
    }

    public Booking updateStatus(
            Long bookingId,
            String status) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() ->
                        new RuntimeException("Booking not found"));

        booking.setStatus(status);

        return bookingRepository.save(booking);
    }
    public List<Booking> getMyBookings(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return bookingRepository.findByUserId(user.getId());
    }
    
    
}
package com.marketplace.smart_service_marketplace.controller;

import com.marketplace.smart_service_marketplace.model.Booking;
import com.marketplace.smart_service_marketplace.service.BookingService;

import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(
            @RequestParam Long serviceId,
            @RequestBody Booking booking,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                bookingService.createBooking(
                        email,
                        serviceId,
                        booking
                )
        );
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getUserBookings(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                bookingService.getUserBookings(userId)
        );
    }

    @GetMapping("/vendor")
    public ResponseEntity<List<Booking>> getVendorBookings(
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                bookingService.getVendorBookings(email)
        );
    }

    @PutMapping("/{bookingId}/status")
    public ResponseEntity<Booking> updateStatus(
            @PathVariable Long bookingId,
            @RequestParam String status) {

        return ResponseEntity.ok(
                bookingService.updateStatus(
                        bookingId,
                        status
                )
        );
    }
    
    
    @GetMapping("/my")
    public ResponseEntity<List<Booking>> getMyBookings(
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                bookingService.getMyBookings(email)
        );
    }
    
}
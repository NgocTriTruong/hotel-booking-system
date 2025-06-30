package com.tricoder.GoHotel.repo;

import com.tricoder.GoHotel.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Method to find a booking by its confirmation code
    Optional<Booking> findByBookingConfirmationCode(String confirmationCode);
}
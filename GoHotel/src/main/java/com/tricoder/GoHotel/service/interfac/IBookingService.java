package com.tricoder.GoHotel.service.interfac;


import com.tricoder.GoHotel.dto.Response;
import com.tricoder.GoHotel.entity.Booking;

public interface IBookingService {

    Response saveBooking(Long roomId, Long userId, Booking bookingRequest);

    Response findBookingByConfirmationCode(String confirmationCode);

    Response getAllBookings();

    Response cancelBooking(Long bookingId);

}

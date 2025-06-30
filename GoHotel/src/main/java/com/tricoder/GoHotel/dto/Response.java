package com.tricoder.GoHotel.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {

    private int statusCode;  // 200, 400, 500...
    private String message;

    private String token;
    private String role;
    private String expirationTime;  //Token expiration timestamp
    private String bookingConfirmationCode;   //Booking confirmation code

    private UserDTO user;
    private RoomDTO room;
    private BookingDTO booking;
    private List<UserDTO> userList;
    private List<RoomDTO> roomList;
    private List<BookingDTO> bookingList;
}

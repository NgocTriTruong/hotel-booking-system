package com.tricoder.GoHotel.utils;

import com.tricoder.GoHotel.dto.*;
import com.tricoder.GoHotel.entity.*;

import java.security.SecureRandom;
import java.util.*;
import java.util.stream.Collectors;

public class DataMapper {

    private static final String ALPHANUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom secureRandom = new SecureRandom();

    // Tao ma ngau nhien co do dai length
    public static String generateRandomConfirmationCode(int length) {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(ALPHANUMERIC_STRING.length());
            char randomChar = ALPHANUMERIC_STRING.charAt(randomIndex);
            stringBuilder.append(randomChar);
        }
        return stringBuilder.toString();
    }

    //Map UserEntity to UserDTO
    public static UserDTO mapUserEntityToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();

        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setRole(user.getRole());
        return userDTO;
    }

    //Map RoomEntity to RoomDTO
    public static RoomDTO mapRoomEntityToRoomDTO(Room room) {
        RoomDTO roomDTO = new RoomDTO();

        roomDTO.setId(room.getId());
        roomDTO.setRoomType(room.getRoomType());
        roomDTO.setRoomPrice(room.getRoomPrice());
        roomDTO.setRoomPhotoUrl(room.getRoomPhotoUrl());
        roomDTO.setRoomDescription(room.getRoomDescription());
        return roomDTO;
    }

    //Map BookingEntity to BookingDTO
    public static BookingDTO mapBookingEntityToBookingDTO(Booking booking) {
        BookingDTO bookingDTO = new BookingDTO();
        // Map simple fields
        bookingDTO.setId(booking.getId());
        bookingDTO.setCheckInDate(booking.getCheckInDate());
        bookingDTO.setCheckOutDate(booking.getCheckOutDate());
        bookingDTO.setNumOfAdults(booking.getNumberOfAdults());
        bookingDTO.setNumOfChildren(booking.getNumberOfChildren());
        bookingDTO.setTotalNumOfGuest(booking.getTotalNumberOfGuests());
        bookingDTO.setBookingConfirmationCode(booking.getBookingConfirmationCode());
        return bookingDTO;
    }

    //map RoomEntity to RoomDTO, with list of BookingDTO
    public static RoomDTO mapRoomEntityToRoomDTOPlusBookings(Room room) {
        RoomDTO roomDTO = mapRoomEntityToRoomDTO(room);

        roomDTO.setBookings(room.getBookings() != null
                ? room.getBookings().stream().map(DataMapper::mapBookingEntityToBookingDTO).collect(Collectors.toList())
                : Collections.emptyList());
        return roomDTO;
    }

    //map BookingEntity to BookingDTO, with user info and room info
    public static BookingDTO mapBookingEntityToBookingDTOPlusBookedRooms(Booking booking, boolean mapUser) {

        BookingDTO bookingDTO = mapBookingEntityToBookingDTO(booking);
        if (mapUser && booking.getUser() != null) {
            bookingDTO.setUser(DataMapper.mapUserEntityToUserDTO(booking.getUser()));
        }
        if (booking.getRoom() != null) {
            RoomDTO roomDTO = mapRoomEntityToRoomDTO(booking.getRoom());
            bookingDTO.setRoom(roomDTO);
        }
        return bookingDTO;
    }

    //map UserEntity to UserDTO, with list of BookingDTO with user info
    public static UserDTO mapUserEntityToUserDTOPlusUserBookingsAndRoom(User user) {
        UserDTO userDTO = mapUserEntityToUserDTO(user);

        userDTO.setBookings(user.getBookings() != null && !user.getBookings().isEmpty()
                ? user.getBookings().stream()
                .map(booking -> mapBookingEntityToBookingDTOPlusBookedRooms(booking, false))
                .collect(Collectors.toList())
                : Collections.emptyList());

        return userDTO;
    }

    //map list of UserEntity to list of UserDTO
    public static List<UserDTO> mapUserListEntityToUserListDTO(List<User> userList) {
        return userList.stream().map(DataMapper::mapUserEntityToUserDTO).collect(Collectors.toList());
    }

    //map list of RoomEntity to list of RoomDTO
    public static List<RoomDTO> mapRoomListEntityToRoomListDTO(List<Room> roomList) {
        return roomList.stream().map(DataMapper::mapRoomEntityToRoomDTO).collect(Collectors.toList());
    }

    //map list of BookingEntity to list of BookingDTO
    public static List<BookingDTO> mapBookingListEntityToBookingListDTO(List<Booking> bookingList) {
        return bookingList.stream().map(DataMapper::mapBookingEntityToBookingDTO).collect(Collectors.toList());
    }

}

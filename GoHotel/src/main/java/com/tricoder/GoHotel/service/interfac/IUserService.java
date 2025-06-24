package com.tricoder.GoHotel.service.interfac;

import com.tricoder.GoHotel.dto.LoginRequest;
import com.tricoder.GoHotel.dto.Response;
import com.tricoder.GoHotel.entity.User;

public interface IUserService {
    Response register(User user);

    Response login(LoginRequest loginRequest);

    Response getAllUsers();

    Response getUserBookingHistory(String userId);

    Response deleteUser(String userId);

    Response getUserById(String userId);

    Response getMyInfo(String email);

}

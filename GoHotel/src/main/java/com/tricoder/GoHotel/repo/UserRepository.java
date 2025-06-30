package com.tricoder.GoHotel.repo;

import com.tricoder.GoHotel.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // Checks if a user with the given email already exists
    boolean existsByEmail(String email);

    // Finds a user by their email address
    Optional<User> findByEmail(String email);
}

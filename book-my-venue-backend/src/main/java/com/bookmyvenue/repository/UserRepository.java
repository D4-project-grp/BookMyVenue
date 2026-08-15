package com.bookmyvenue.repository;


import com.bookmyvenue.entities.User;
import com.bookmyvenue.entities.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    boolean existsByEmail(String email);


    Optional<User> findByEmail(String email);

    // used by Admin dashboard to show the Customers / Venue Owners breakdown
    long countByRole(UserRole role);
}
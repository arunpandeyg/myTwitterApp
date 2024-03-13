package com.myTwitter.repository;

import com.myTwitter.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository <User, Long>{
    //query can be written here
    User findByEmail(String email);

    @Query("SELECT DISTINCT u FROM User u WHERE u.fullName LIKE %:query% or u.email LIKE %:query%")
    List<User> searchUser(@Param("query")String query);

}

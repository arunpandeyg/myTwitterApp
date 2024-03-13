package com.myTwitter.service;

import com.myTwitter.exception.UserException;
import com.myTwitter.model.User;

import java.util.List;

public interface UserService {
    User findUserById(Long userId)throws UserException;
    User findUserProfileByJwt(String jwt)throws UserException;
    User updateUser(Long userId, User user)throws UserException;
    User followUser(Long userId, User user)throws UserException;
    List<User> searchUser(String query)throws UserException;
}

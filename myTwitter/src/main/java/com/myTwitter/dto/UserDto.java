package com.myTwitter.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class UserDto {
    private Long id;
    private String fullName;
    private String email;
    private String image;
    private String Location;
    private String website;
    private String birthDate;
    private String mobile;
    private String backgroundImage;
    private String bio;
    private boolean req_user;
    private boolean login_with_google;
    private List<UserDto> followers = new ArrayList<UserDto>();
    private List<UserDto> following = new ArrayList<UserDto>();
    private boolean followed;
    private boolean isVerified;
}

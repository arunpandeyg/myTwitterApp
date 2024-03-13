package com.myTwitter.util;

import com.myTwitter.model.User;
import lombok.Data;

@Data
public class UserUtil {
    public static final boolean isReqUser(User reqUser, User user2){
        return reqUser.getId().equals(user2.getId());
    }

    //is following or not
    public static final boolean isFollowedByReqUser(User reqUser, User user2){
        return reqUser.getFollowings().contains(user2);
    }
}

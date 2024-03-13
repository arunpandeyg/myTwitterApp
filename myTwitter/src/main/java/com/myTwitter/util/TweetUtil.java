package com.myTwitter.util;

import com.myTwitter.model.Like;
import com.myTwitter.model.Tweet;
import com.myTwitter.model.User;

public class TweetUtil {
    public final static boolean isLikedByUser(User reqUser, Tweet tweet) {
        for(Like like : tweet.getLikes()){
            if(like.getUser().getId().equals(reqUser.getId())){
                return true;
            }
        }
        return false;
    }

    public final static boolean isRelatedByReqUser(User reqUser, Tweet tweet){
        for(User user : tweet.getRetweetUser()){
            if(user.getId().equals(reqUser.getId())){
                return true;
            }
        }
        return false;
    }
}

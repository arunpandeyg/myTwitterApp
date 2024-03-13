package com.myTwitter.service;

import com.myTwitter.exception.TweetException;
import com.myTwitter.exception.UserException;
import com.myTwitter.model.Like;
import com.myTwitter.model.User;

import java.util.List;

public interface LikeService {
   Like likeTweet(Long tweetId, User user) throws UserException, TweetException;
   List<Like> getAllLikes(Long tweetId)throws TweetException;

}

package com.myTwitter.service;

import com.myTwitter.exception.TweetException;
import com.myTwitter.exception.UserException;
import com.myTwitter.model.Tweet;
import com.myTwitter.model.User;
import com.myTwitter.request.TweetReplyRequest;

import java.util.List;
import java.util.Optional;

public interface TweetService {
   Tweet createTweet(Tweet req, User user) throws UserException, TweetException ;

    List<Tweet> findAllTweet();

    Tweet retweet(Long tweetId, User user) throws UserException, TweetException;
    Tweet findById(Long tweetId) throws TweetException;
    void deleteTweetById(Long tweetId, Long userId) throws UserException, TweetException;
    Tweet removeFromRetweet(Long tweetId, User user) throws UserException, TweetException;
    Tweet createdReply(TweetReplyRequest req, User user) throws UserException, TweetException;
    List<Tweet> getUserTweet(User user);
    List<Tweet> findByLikesContainsUser(User user);

}

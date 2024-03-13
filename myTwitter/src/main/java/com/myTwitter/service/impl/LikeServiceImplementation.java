package com.myTwitter.service.impl;

import com.myTwitter.exception.TweetException;
import com.myTwitter.exception.UserException;
import com.myTwitter.model.Like;
import com.myTwitter.model.Tweet;
import com.myTwitter.model.User;
import com.myTwitter.repository.LikeRepository;
import com.myTwitter.repository.TweetRepository;
import com.myTwitter.service.LikeService;
import com.myTwitter.service.TweetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeServiceImplementation implements LikeService {
    @Autowired
    private LikeRepository likeRepository;
    @Autowired
    private TweetService tweetService;
    @Autowired
    private TweetRepository tweetRepository;

    @Override
    public Like likeTweet(Long tweetId, User user) throws UserException, TweetException {
        Like isLikeExist = likeRepository.isLikeExist(user.getId(),tweetId);

        if(isLikeExist != null) {
            likeRepository.deleteById(isLikeExist.getId());
            return isLikeExist;
        }
        Tweet tweet = tweetService.findById(tweetId);
        Like like = new Like();
        like.setTweet(tweet);
        like.setUser(user);
        Like savedLike = likeRepository.save(like);
        tweet.getLikes().add(savedLike);
        tweetRepository.save(tweet);
        return savedLike;
    }

    @Override
    public List<Like> getAllLikes(Long tweetId) throws TweetException {
        Tweet tweet = tweetService.findById(tweetId);
        List<Like> likes = likeRepository.findByTweetId(tweetId);
        return likes;
    }
}

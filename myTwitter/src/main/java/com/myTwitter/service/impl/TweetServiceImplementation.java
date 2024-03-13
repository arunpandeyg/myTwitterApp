package com.myTwitter.service.impl;

import com.myTwitter.exception.TweetException;
import com.myTwitter.exception.UserException;
import com.myTwitter.model.Tweet;
import com.myTwitter.model.User;
import com.myTwitter.repository.TweetRepository;
import com.myTwitter.request.TweetReplyRequest;
import com.myTwitter.service.TweetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class TweetServiceImplementation implements TweetService{
    @Autowired
    private TweetRepository tweetRepository;
    @Override
    public Tweet createTweet(Tweet req, User user) throws UserException, TweetException {
        Tweet tweet = new Tweet();
        tweet.setContent(req.getContent());
        tweet.setCreatedAt(LocalDateTime.now());
        tweet.setImage(req.getImage());
        tweet.setUser(user);
        tweet.setReply(false);
        tweet.setTweet(true);
        tweet.setVideo(req.getVideo());

        return tweetRepository.save(tweet);
    }

    @Override
    public List<Tweet> findAllTweet() {

        return tweetRepository.findAllByIsTweetTrueOrderByCreatedAtDesc();
    }

    @Override
    public Tweet retweet(Long tweetId, User user) throws UserException, TweetException {
        Tweet tweet = findById(tweetId);
        if(tweet.getRetweetUser().contains(user)){
            tweet.getRetweetUser().remove(user);
        }else{
            tweet.getRetweetUser().add(user);
        }
        return tweetRepository.save(tweet);
    }

    @Override
    public Tweet findById(Long tweetId) throws TweetException {
        Tweet tweet = tweetRepository.findById(tweetId)
                .orElseThrow(() -> new TweetException("Tweet not found with id " + tweetId));
        return tweet;
    }

    @Override
    public void deleteTweetById(Long tweetId, Long userId) throws UserException, TweetException {
        Tweet tweet = findById(tweetId);
        if(!userId.equals(tweet.getUser().getId())) {
            throw new UserException("You cannot delete other users tweet");

        }
        tweetRepository.deleteById(tweet.getUser().getId());
    }

    @Override
    public Tweet removeFromRetweet(Long tweetId, User user) throws UserException, TweetException {
        return null;
    }

    @Override
    public Tweet createdReply(TweetReplyRequest req, User user) throws UserException, TweetException {
        Tweet replyFor = findById(req.getTweetId());

        Tweet tweet = new Tweet();
        tweet.setContent(req.getContent());
        tweet.setCreatedAt(LocalDateTime.now());
        tweet.setImage(req.getImage());
        tweet.setUser(user);
        tweet.setReply(true);
        tweet.setTweet(false);
        tweet.setReplyFor(replyFor);
        Tweet saveReply = tweetRepository.save(tweet);
        //tweet.getReplyTweets().add(saveReply);
        replyFor.getReplyTweets().add(saveReply);
        tweetRepository.save(replyFor);

        return replyFor;
    }

    @Override
    public List<Tweet> getUserTweet(User user) {
        return tweetRepository.findAllByRetweetUserContainsOrUser_IdAndIsTweetTrueOrderByCreatedAtDesc(user, user.getId());
    }

    @Override
    public List<Tweet> findByLikesContainsUser(User user) {

        return tweetRepository.findAllByLikesUser_id(user.getId());
    }
}

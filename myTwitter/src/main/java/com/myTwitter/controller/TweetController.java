package com.myTwitter.controller;

import com.myTwitter.dto.TweetDto;
import com.myTwitter.dtoMapper.TweetDtoMapper;
import com.myTwitter.exception.TweetException;
import com.myTwitter.exception.UserException;
import com.myTwitter.model.Tweet;
import com.myTwitter.model.User;
import com.myTwitter.request.TweetReplyRequest;
import com.myTwitter.response.ApiResponse;
import com.myTwitter.service.TweetService;
import com.myTwitter.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tweets")
public class TweetController {
    @Autowired
    private TweetService tweetService;
    @Autowired
    private UserService userService;
//create or post a tweet
    @PostMapping("/create")
    public ResponseEntity<TweetDto> createTweet(@RequestBody Tweet req, @RequestHeader("Authorization")
    String jwt)throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwt);
        Tweet tweet = tweetService.createTweet(req,user);
        TweetDto tweetDto = TweetDtoMapper.toTweetDto(tweet, user);
        return new ResponseEntity<>(tweetDto, HttpStatus.CREATED);
    }
//reply a tweet
    @PostMapping("/reply")
    public ResponseEntity<TweetDto> replyTweet(@RequestBody TweetReplyRequest req, @RequestHeader("Authorization")
    String jwt)throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwt);
        Tweet tweet = tweetService.createdReply(req, user);
        TweetDto tweetDto = TweetDtoMapper.toTweetDto(tweet, user);
        return new ResponseEntity<>(tweetDto, HttpStatus.CREATED);
    }

    //retweet a user
    @PutMapping("/{tweetId}/retweet")
    public ResponseEntity<TweetDto> retweet(@PathVariable Long tweetId, @RequestHeader("Authorization")
    String jwt)throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwt);
        Tweet tweet = tweetService.retweet(tweetId, user);
        TweetDto tweetDto = TweetDtoMapper.toTweetDto(tweet, user);
        return new ResponseEntity<>(tweetDto, HttpStatus.OK);
    }

    //find tweet a user
    @GetMapping("/{tweetId}")
    public ResponseEntity<TweetDto> findTweetById(@PathVariable Long tweetId, @RequestHeader("Authorization")
    String jwt)throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwt);
        Tweet tweet = tweetService.findById(tweetId);
        TweetDto tweetDto = TweetDtoMapper.toTweetDto(tweet, user);
        return new ResponseEntity<>(tweetDto, HttpStatus.OK);
    }

    //delete tweet a user
    @DeleteMapping("/{tweetId}")
    public ResponseEntity<ApiResponse> deleteTweet(@PathVariable Long tweetId, @RequestHeader("Authorization")
    String jwt)throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwt);
        tweetService.deleteTweetById(tweetId, user.getId());
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage("Tweet deleted successfully");
        apiResponse.setStatus(true);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    //get all tweets of
    @GetMapping("/")
    public ResponseEntity<List<TweetDto>> getAllTweets( @RequestHeader("Authorization")
    String jwt)throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwt);
        List<Tweet>  tweets = tweetService.findAllTweet();
        List<TweetDto> tweetDtos = TweetDtoMapper.toTweetDtos(tweets, user);
        return new ResponseEntity<>(tweetDtos, HttpStatus.OK);
    }

    //get all tweets of  a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TweetDto>>
    getUsersAllTweets(@PathVariable Long userId, @RequestHeader("Authorization")
          String jwt)throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwt);
        List<Tweet>  tweets = tweetService.getUserTweet(user);
        List<TweetDto> tweetDtos = TweetDtoMapper.toTweetDtos(tweets, user);
        return new ResponseEntity<>(tweetDtos, HttpStatus.OK);
    }

    //get all liked tweets of  a user
    @GetMapping("/user/{userId}/likes")
    public ResponseEntity<List<TweetDto>>
    findTweetByLikesContainsUser(@PathVariable Long userId, @RequestHeader("Authorization")
    String jwt)throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwt);
        List<Tweet>  tweets = tweetService.findByLikesContainsUser(user);
        List<TweetDto> tweetDtos = TweetDtoMapper.toTweetDtos(tweets, user);
        return new ResponseEntity<>(tweetDtos, HttpStatus.OK);
    }

}

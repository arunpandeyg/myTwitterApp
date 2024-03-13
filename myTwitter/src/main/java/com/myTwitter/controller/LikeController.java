package com.myTwitter.controller;

import com.myTwitter.dto.LikeDto;
import com.myTwitter.dtoMapper.LikeDtoMapper;
import com.myTwitter.exception.TweetException;
import com.myTwitter.exception.UserException;
import com.myTwitter.model.Like;
import com.myTwitter.model.User;
import com.myTwitter.service.LikeService;
import com.myTwitter.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class LikeController {
    @Autowired
    private UserService userService;
    @Autowired
    private LikeService likeService;

    //creating like
    @PostMapping("/{tweetId}/likes")
    public ResponseEntity<LikeDto>
    likeTweet(@PathVariable Long tweetId, @RequestHeader("Authorization") String jwt)
            throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwt);
        Like like = likeService.likeTweet(tweetId, user);
        LikeDto likeDto = LikeDtoMapper.toLikeDto(like, user);
        return new ResponseEntity<>(likeDto, HttpStatus.CREATED);
    }
    //get all likes of a tweet
    @PostMapping("/tweet/{tweetId}")
    public ResponseEntity<List<LikeDto>>
    getAllLikes(@PathVariable Long tweetId, @RequestHeader("Authorization") String jwt)
            throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwt);
        List<Like> likes = likeService.getAllLikes(tweetId);
        List<LikeDto> likeDtos = LikeDtoMapper.toLikeDtos(likes, user);
        return new ResponseEntity<>(likeDtos, HttpStatus.CREATED);
    }
}

package com.myTwitter.dto;


import com.myTwitter.model.Tweet;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class TweetDto {
    private Long id;
    private UserDto user;
    private String content;
    private String image;
    private String video;
    private Tweet replyFor;
    private boolean isReply;
    private boolean isTweet;
    private LocalDateTime createdAt;
    private int totalLikes;
    private int totalReplies;
    private int totalRetweets;
    private boolean isLiked;
    private boolean isRetweet;
    private List<Long> retweetUserId;
    private List<TweetDto> replyTweets;
}

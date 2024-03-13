package com.myTwitter.dtoMapper;

import com.myTwitter.dto.TweetDto;
import com.myTwitter.dto.UserDto;
import com.myTwitter.model.Tweet;
import com.myTwitter.model.User;
import com.myTwitter.util.TweetUtil;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class TweetDtoMapper {
    public static TweetDto toTweetDto(Tweet tweet, User reqUser) {
        UserDto user = UserDtoMapper.toUserDto(tweet.getUser());
        boolean isLiked = TweetUtil.isRelatedByReqUser(reqUser, tweet);
        boolean isRetweeted = TweetUtil.isRelatedByReqUser(reqUser,tweet);
        List<Long> retweetUserId = new ArrayList<Long>();
        for(User user1 : tweet.getRetweetUser()) {
            retweetUserId.add(user1.getId());
        }
        TweetDto tweetDto = new TweetDto();
        tweetDto.setId(tweet.getId());
        tweetDto.setContent(tweet.getContent());
        tweetDto.setImage(tweet.getImage());
        tweetDto.setTotalLikes(tweet.getLikes().size());
        tweetDto.setTotalReplies(tweet.getReplyTweets().size());
        tweetDto.setTotalRetweets(tweet.getRetweetUser().size());
        tweetDto.setUser(user);
        tweetDto.setLiked(isLiked);
        tweetDto.setRetweet(isRetweeted);
        tweetDto.setRetweetUserId(retweetUserId);
        tweetDto.setReplyTweets(toTweetDtos(tweet.getReplyTweets(), reqUser));
        tweetDto.setVideo(tweet.getVideo());

        return tweetDto;
    }
    public static List<TweetDto> toTweetDtos(List<Tweet> tweets, User reqUser) {
        List<TweetDto> tweetDtos = new ArrayList<TweetDto>();
        for( Tweet tweet : tweets ){
            TweetDto tweetDto = toReplyTweetDto(tweet, reqUser);
            tweetDtos.add(tweetDto);
        }
        return tweetDtos;
    }

    private static TweetDto toReplyTweetDto(Tweet tweet, User reqUser) {
        UserDto user = UserDtoMapper.toUserDto(tweet.getUser());
        boolean isLiked = TweetUtil.isRelatedByReqUser(reqUser, tweet);
        boolean isRetweeted = TweetUtil.isRelatedByReqUser(reqUser,tweet);
        List<Long> retweetUserId = new ArrayList<Long>();
        for(User user1 : tweet.getRetweetUser()) {
            retweetUserId.add(user1.getId());
        }
        TweetDto tweetDto = new TweetDto();
        tweetDto.setId(tweet.getId());
        tweetDto.setContent(tweet.getContent());
        tweetDto.setImage(tweet.getImage());
        tweetDto.setTotalLikes(tweet.getLikes().size());
        tweetDto.setTotalReplies(tweet.getReplyTweets().size());
        tweetDto.setTotalRetweets(tweet.getRetweetUser().size());
        tweetDto.setUser(user);
        tweetDto.setLiked(isLiked);
        tweetDto.setRetweet(isRetweeted);
        tweetDto.setRetweetUserId(retweetUserId);
        tweetDto.setVideo(tweet.getVideo());

        return tweetDto;
    }

}

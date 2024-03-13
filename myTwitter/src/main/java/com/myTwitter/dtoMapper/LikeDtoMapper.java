package com.myTwitter.dtoMapper;

import com.myTwitter.dto.LikeDto;
import com.myTwitter.dto.TweetDto;
import com.myTwitter.dto.UserDto;
import com.myTwitter.model.Like;
import com.myTwitter.model.User;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class LikeDtoMapper {
    public static LikeDto toLikeDto(Like like, User reqUser) {
        UserDto user = UserDtoMapper.toUserDto(like.getUser());
        UserDto reqUserDto = UserDtoMapper.toUserDto(reqUser);
        TweetDto tweet = TweetDtoMapper.toTweetDto(like.getTweet(), reqUser);

        LikeDto likeDto = new LikeDto();
        likeDto.setId(like.getId());
        likeDto.setTweet(tweet);
        likeDto.setUser(user);

        return likeDto;
    }

    public static List<LikeDto> toLikeDtos(List<Like> likes, User reqUser) {
        List<LikeDto> likeDtos = new ArrayList<LikeDto>();
        for(Like like : likes) {
            UserDto user = UserDtoMapper.toUserDto(like.getUser());
            TweetDto tweet = TweetDtoMapper.toTweetDto(like.getTweet(), reqUser);

            LikeDto likeDto = new LikeDto();
            likeDto.setId(like.getId());
            likeDto.setTweet(tweet);
            likeDto.setUser(user);
            likeDtos.add(likeDto);
        }
        return likeDtos;
    }

}

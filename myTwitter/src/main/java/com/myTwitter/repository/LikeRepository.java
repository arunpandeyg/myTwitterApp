package com.myTwitter.repository;

import com.myTwitter.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like, Long> {
   @Query("SELECT l FROM Like l WHERE l.user.id=:userId AND l.tweet.id=:tweetId")
   Like isLikeExist(@Param("userId") Long userId, @Param("tweetId") Long tweetId);

    @Query("SELECT l FROM Like l WHERE l.tweet.id=:tweetId")
    List<Like> findByTweetId(@Param("tweetId")Long tweetId);
}

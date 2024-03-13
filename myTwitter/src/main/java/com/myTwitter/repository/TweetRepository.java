package com.myTwitter.repository;

import com.myTwitter.model.Tweet;
import com.myTwitter.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TweetRepository extends JpaRepository<Tweet, Long> {
    List<Tweet> findAllByIsTweetTrueOrderByCreatedAtDesc();
    List<Tweet> findAllByRetweetUserContainsOrUser_IdAndIsTweetTrueOrderByCreatedAtDesc(User user, Long userId);
    List<Tweet> findAllByLikesContainingOrderByCreatedAtDesc(User user);
    @Query("SELECT t FROM Tweet t JOIN t.likes l WHERE l.user.id =:userId")
    List<Tweet> findAllByLikesUser_id(Long userId);
}

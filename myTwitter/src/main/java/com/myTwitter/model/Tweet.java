package com.myTwitter.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "tweet")
public class Tweet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    private String content;
    private String image;
    private String video;

    @OneToMany(mappedBy = "tweet", cascade = CascadeType.ALL)
    private List<Like> likes = new ArrayList<Like>();
    @OneToMany
    private List<Tweet> replyTweets = new ArrayList<Tweet>();
    @ManyToMany
    private List<User> retweetUser = new ArrayList<User>();
    @ManyToOne
    private Tweet replyFor;
    private boolean isReply;
    private boolean isTweet;
    private LocalDateTime createdAt;

}
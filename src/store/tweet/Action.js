import { api } from "../../config/Api"
import {
  FIND_TWEET_BY_ID_FAILURE,
  FIND_TWEET_BY_ID_SUCCESS,
  GET_ALL_TWEETS_FAILURE,
  GET_USERS_TWEET_FAILURE,
  GET_USERS_TWEET_SUCCESS,
  LIKE_TWEET_FAILURE,
  LIKE_TWEET_SUCCESS,
  REPLY_TWEET_FAILURE,
  REPLY_TWEET_SUCCESS,
  RETWEET_FAILURE,
  RETWEET_SUCCESS,
  TWEET_CREATE_FAILURE,
  TWEET_CREATE_SUCCESS,
  TWEET_DELETE_FAILURE,
  TWEET_DELETE_SUCCESS,
  USER_LIKE_TWEET_FAILURE,
  USER_LIKE_TWEET_SUCCESS,
} from "./ActionType";

//getting all tweets
export const getAllTweets = () => async (dispatch) => {
    try {
        const { data } = await api.get("/api/tweets")
        console.log("Get All tweets : ", data)
        dispatch({type:GET_USERS_TWEET_SUCCESS, payload:data})
    } catch (error) {
        console.log("Catch error - ", error)
        dispatch({type:GET_ALL_TWEETS_FAILURE, payload:error.message})
     }
}

//getting users tweets
export const getUsersTweet = (userId) => async (dispatch) => {
    try {
        const { data } = await api.get(`/api/tweets/user/${userId}`)
        console.log("User tweets : ", data)
        dispatch({type:GET_USERS_TWEET_SUCCESS, payload:data})
    } catch (error) {
        console.log("Catch error - ", error)
        dispatch({type:GET_USERS_TWEET_FAILURE, payload:error.message})
     }
}

//getting users liked tweets
export const findTweetsByLikeContainsUser = (userId) => async (dispatch) => {
    try {
        const { data } = await api.get(`/api/tweets/user/${userId}/likes`)
        console.log("Users liked tweets : ", data)
        dispatch({type:USER_LIKE_TWEET_SUCCESS, payload:data})
    } catch (error) {
        console.log("Catch error - ", error)
        dispatch({type:USER_LIKE_TWEET_FAILURE, payload:error.message})
     }
}

//getting users tweets by id
export const findTweetsById = (tweetId) => async (dispatch) => {
    try {
        const { data } = await api.get(`/api/tweets/${tweetId}`)
        console.log("Users tweets by Id : ", data)
        dispatch({type:FIND_TWEET_BY_ID_SUCCESS, payload:data})
    } catch (error) {
        console.log("Catch error - ", error)
        dispatch({type:FIND_TWEET_BY_ID_FAILURE, payload:error.message})
     }
}

//creating users tweets 
export const createTweet = (tweetData) => async (dispatch) => {
    try {
        const { data } = await api.post(`/api/tweets/create`, tweetData)
        console.log("Created tweet : ", data)
        dispatch({type:TWEET_CREATE_SUCCESS, payload:data})
    } catch (error) {
        console.log("Catch error - ", error)
        dispatch({type:TWEET_CREATE_FAILURE, payload:error.message})
     }
}

//creating users reply tweet
export const createTweetReply = (tweetData) => async (dispatch) => {
    try {
        const { data } = await api.post(`/api/tweets/reply`, tweetData)
        console.log("Reply tweet : ", data)
        dispatch({type:REPLY_TWEET_SUCCESS, payload:data})
    } catch (error) {
        console.log("Catch error - ", error)
        dispatch({type:REPLY_TWEET_FAILURE, payload:error.message})
     }
}

//creating users re-tweet
export const createRetweet = (tweetId) => async (dispatch) => {
    try {
        const { data } = await api.put(`/api/tweets/${tweetId}/retweet`)
        console.log("Retweeted tweet : ", data)
        dispatch({type:RETWEET_SUCCESS, payload:data})
    } catch (error) {
        console.log("Catch error - ", error)
        dispatch({type:RETWEET_FAILURE, payload:error.message})
     }
}

//creating users like tweet
export const likeTweet = (tweetId) => async (dispatch) => {
    try {
        const { data } = await api.post(`/api/${tweetId}/like`)
        console.log("Liked tweet : ", data)
        dispatch({type:LIKE_TWEET_SUCCESS, payload:data})
    } catch (error) {
        console.log("Catch error - ", error)
        dispatch({type:LIKE_TWEET_FAILURE, payload:error.message})
     }
}

//creating users delete tweet
export const deleteTweet = (tweetId) => async (dispatch) => {
    try {
        const { data } = await api.post(`/api/tweet/${tweetId}`)
        console.log("Deleted tweet : ", data)
        dispatch({type:TWEET_DELETE_SUCCESS, payload:tweetId})
    } catch (error) {
        console.log("Catch error - ", error)
        dispatch({type:TWEET_DELETE_FAILURE, payload:error.message})
     }
}
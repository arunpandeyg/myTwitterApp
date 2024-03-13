import axios from "axios"
import { API_BASE_URL, api } from "../../config/Api"
import { FIND_USER_BY_ID_FAILURE, FOLLOW_USER_FAILURE, FOLLOW_USER_SUCCESS, GET_USER_PROFILE_FAILURE, GET_USER_PROFILE_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT, REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_SUCCESS } from "./ActionType";
import { FIND_TWEET_BY_ID_SUCCESS } from "../tweet/ActionType";

//login
export const loginUser = (loginData) => async (dispatch) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);
      console.log("Signed-in user", data)
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt)
        }
        dispatch({type:LOGIN_USER_SUCCESS, payload:data.jwt})
    } catch (error) {
        console.log("error", error)
        dispatch({type:LOGIN_USER_FAILURE, payload:error.message})
    }
}

//signup
export const registerUser = (registerData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      registerData
    );
    console.log("Signed-up user", data);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: REGISTER_USER_FAILURE, payload: error.message });
  }
};

//get user profile
export const getUserProfile = (jwt) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/users/profile`,
        {
            headers: {
          "Authorization":`Bearer ${jwt}`
      }}
    );
    
    dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: GET_USER_PROFILE_FAILURE, payload: error.message });
  }
};

//get user BY ID
export const findUserById = (userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/users/${userId}`);
    console.log("Find user by id ", data)
    
    dispatch({ type: FIND_TWEET_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: FIND_USER_BY_ID_FAILURE, payload: error.message });
  }
};

//update user
export const updateUserProfile = (reqData) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/users/update`, reqData);
    console.log("Updated user : ", data)
    
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
  }
};

//follow user 
export const followUser = (userId) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/users/update/${userId}`);
    console.log("Followed user : ", data)
    
    dispatch({ type: FOLLOW_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: FOLLOW_USER_FAILURE, payload: error.message });
  }
};

//logout user
export const logout = () => async (dispatch) => {
  
    localStorage.removeItem("jwt")
    
    dispatch({ type: LOGOUT, payload:null});
  
};
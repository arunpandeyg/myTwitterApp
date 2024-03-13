import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./auth/Reducer";
import { tweetReducer } from "./tweet/Reducer";


const rootReducers = combineReducers({
     auth:authReducer, tweet:tweetReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));


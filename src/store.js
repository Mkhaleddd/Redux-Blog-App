import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./assets/features/post/postSlice"
import userReducer from "./assets/features/users/userSlice"
import {saveState,loadState} from './localStorage'
import throttle from 'lodash.throttle';

export const store=configureStore({
    reducer:{
        posts:postsReducer,
        users:userReducer
    },

})




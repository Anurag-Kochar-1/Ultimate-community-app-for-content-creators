import { configureStore, combineReducers  } from '@reduxjs/toolkit';
import communityReducer from "./slices/communitySlice"
import userReducer from "./slices/userSlice"
import postsReducer from "./slices/postsSlice"

import { createWrapper } from 'next-redux-wrapper';

// export interface State {
//     tick: string;
// }

// export const store = configureStore({
//     reducer : {
//         user: userReducer,
//         community: communityReducer,
//         posts: postsReducer
//     }
// })

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch


// const combinedReducer = combineReducers({
//     user: userReducer,
//     community: communityReducer,
//     posts: postsReducer
// })


const makeStore = () => configureStore({
    reducer: {
        user: userReducer,
        community: communityReducer,
        posts: postsReducer
    },
    devTools: true,

  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(makeStore);
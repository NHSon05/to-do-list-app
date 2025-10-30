import { configureStore} from "@reduxjs/toolkit";
import { counterSlice } from "./features/counter/counterSlice";


// Main function of RTK in order to create Redux store
// It's more convenient than createStore because it make a lot of for you automatically
// conbine reducer, add middleware for thunk, set up redux devtools
export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
    },
})

// Infer the RootState and AppDispatch types form the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
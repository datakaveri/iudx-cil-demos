import { configureStore } from "@reduxjs/toolkit";
import timeSliderReducer from "./timeSliderSlice/timeSliderSlice";
import snackbarReducer from "./snackbarSlice/snackbarSlice";

export const store = configureStore({
	reducer: {
		timeSlider: timeSliderReducer,
		snackbar: snackbarReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

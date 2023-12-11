import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface SnackbarState {
	open: boolean;
	snackbarMessage?: string;
	snackbarType?: "error" | "info" | "warning" | "success";
}

const initialState: SnackbarState = {
	open: false,
	snackbarMessage: "",
	snackbarType: "info",
};

export const snackbarSlice = createSlice({
	name: "snackbar",
	initialState,
	reducers: {
		setSnackbarStatus: (state, action: PayloadAction<SnackbarState>) => {
			state.open = action.payload.open;
			state.snackbarMessage = action.payload.snackbarMessage;
			state.snackbarType = action.payload.snackbarType;
		},
	},
});

export const { setSnackbarStatus } = snackbarSlice.actions;

export const selectSnackbarStatus = (state: RootState) => state.snackbar;

export default snackbarSlice.reducer;

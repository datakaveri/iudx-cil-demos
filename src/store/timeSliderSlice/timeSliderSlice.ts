import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ResponseData } from "../../assets/types/ResponseData";
import { aqmSpatialForecast } from "./thunks/aqmSpatialForecast";

interface TimeSliderState {
  responseData: ResponseData;
  value: number;
  playing: boolean;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | undefined;
}

const initialState: TimeSliderState = {
  responseData: {} as ResponseData,
  value: 0,
  playing: false,
  loading: "idle",
  error: undefined,
};

export const getAQMSpatialForecast: any = createAsyncThunk(
  "airquality/aqmSpatialForecast",
  async () => {
    const response = await aqmSpatialForecast();
    return response;
  }
);

export const timeSliderSlice = createSlice({
  name: "timeSlider",
  initialState,
  reducers: {
    setTimeValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    setPlayingStatus: (state, action: PayloadAction<boolean>) => {
      state.playing = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAQMSpatialForecast.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.responseData = action.payload;
      })
      .addCase(getAQMSpatialForecast.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(getAQMSpatialForecast.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setTimeValue, setPlayingStatus } = timeSliderSlice.actions;

export const selectValue = (state: RootState) => state.timeSlider.value;
export const selectPlaying = (state: RootState) => state.timeSlider.playing;

export const getAQMSpatialForecastResponse = (state: RootState) =>
  state.timeSlider.responseData;
export const getAQMSpatialForecastStatus = (state: RootState) =>
  state.timeSlider.loading;
export const getAQMSpatialForecastError = (state: RootState) =>
  state.timeSlider.error;

export default timeSliderSlice.reducer;

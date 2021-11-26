import { configureStore } from "@reduxjs/toolkit";
import { covidDataReducer } from "./features/covidData/covidDataSlice";

export const store = configureStore({
  reducer: {
    covidData: covidDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

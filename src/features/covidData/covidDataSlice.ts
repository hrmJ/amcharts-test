import { createSlice } from "@reduxjs/toolkit";
import { CovCaseData } from "amcharts-test-types";
import { Dispatch } from "react";

export enum loadingState {
  IDLE = "idle",
  LOADING = "loading",
}

interface CovidDataState {
  allData: CovCaseData[];
  loading: loadingState;
}

const initialState: CovidDataState = {
  allData: [],
  loading: loadingState.IDLE,
};

export const fetchCovidData = function () {
  return async function (dispatch: Dispatch<any>) {
    dispatch(covidDataLoading());
    const response = await fetch("http://localhost:3001/sample");
    const data: CovCaseData[] = await response.json();
    dispatch(covidDataLoaded(data));
  };
};

export const covidDataSlice = createSlice({
  name: "covidData",
  initialState,
  reducers: {
    covidDataLoading: (state) => {
      if (state.loading === loadingState.IDLE) {
        state.loading = loadingState.LOADING;
      }
    },
    covidDataLoaded: (state, action: { payload: CovCaseData[] }) => {
      if (state.loading === loadingState.LOADING) {
        state.loading = loadingState.IDLE;
        state.allData = action.payload.map((el) => ({
          ...el,
          dateweek20200101: el.dateweek20200101.replace(
            /Vuosi (\d+) Viikko (\d+)/,
            "$2/$1"
          ),
        }));
      }
    },
  },
});

export const { covidDataLoading, covidDataLoaded } = covidDataSlice.actions;

export const covidDataReducer = covidDataSlice.reducer;

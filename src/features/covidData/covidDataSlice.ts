import { createSlice } from "@reduxjs/toolkit";
import { CovCaseData } from "amcharts-test-types";

interface CovidDataState {
  allData: CovCaseData[];
}

const initialState: CovidDataState = { allData: [] };

export const covidDataSlice = createSlice({
  name: "covidData",
  initialState,
  reducers: {
    getData: () => {
      return {
        allData: [
          { value: "3", dateweek20200101: "00100", hcdmunicipality2020: "kk" },
        ],
      };
    },
  },
});

export const { getData } = covidDataSlice.actions;

export const covidDataReducer = covidDataSlice.reducer;

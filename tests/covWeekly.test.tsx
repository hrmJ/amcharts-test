import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { CovChartWeeklyContainer } from "../src/CovidCharts/Weekly/ChartContainer";
import {
  covidDataReducer,
  loadingState,
} from "../src/features/covidData/covidDataSlice";

function getTestStore() {
  return configureStore({
    reducer: { covidData: covidDataReducer },
    preloadedState: {
      covidData: {
        loading: loadingState.IDLE,
        allData: [
          {
            value: "1",
            dateweek20200101: "vko 1",
            hcdmunicipality2020: "Place 1",
          },
          {
            value: "1",
            dateweek20200101: "vko 1",
            hcdmunicipality2020: "Place 2",
          },
        ],
      },
    },
  });
}

describe("the weekly covid chart", () => {
  it("shows a select of regions based on the cov data", () => {
    const { getByRole } = render(
      <Provider store={getTestStore()}>
        <CovChartWeeklyContainer></CovChartWeeklyContainer>
      </Provider>
    );
    const option1 = getByRole("option", { name: "Place 1" });
    expect(option1).toBeInTheDocument();
  });

  it("allows the user to add another select", () => {
    const { getAllByRole, getByRole } = render(
      <Provider store={getTestStore()}>
        <CovChartWeeklyContainer></CovChartWeeklyContainer>
      </Provider>
    );
    expect(getAllByRole("combobox")).toHaveLength(1);
    const selectAdder = getByRole("button", { name: /lisää alue/i });
    fireEvent.click(selectAdder);
    expect(getAllByRole("combobox")).toHaveLength(2);
  });
});

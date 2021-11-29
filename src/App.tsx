import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CovBundle } from "./CovBundle";
import { CovChart } from "./CovChart";
import { CovChartWeeklyContainer } from "./CovidCharts/Weekly/ChartContainer";
import Home from "./Home";
import { LineChart } from "./LineChart";

export const App: FC = function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="line" element={<LineChart />}></Route>
          <Route path="covtest" element={<CovBundle></CovBundle>}>
            <Route path="regional" element={<CovChart />}></Route>
            <Route path="weekly" element={<CovChartWeeklyContainer />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

import * as am4charts from "@amcharts/amcharts4/charts";
import { CovCaseData } from "amcharts-test-types";
import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  addCategoryDataToAxis,
  addCurrentWeekRange,
  addRegionToChart,
  addScrollbar,
  createCategoryAxis,
  createChart,
} from "./chartUtils";

export interface CovChartWeeklyProps {
  data: CovCaseData[];
  currentRegions: { [key: string]: string };
}

export const CovChartWeekly: FC<CovChartWeeklyProps> = function ({
  data,
  currentRegions,
}) {
  const chartRef = useRef<null | am4charts.XYChart>(null);
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    const chart = createChart();
    const categoryAxis = createCategoryAxis(chart);
    chart.yAxes.push(new am4charts.ValueAxis());
    Object.values(currentRegions).forEach((region) =>
      addRegionToChart(chart, region, data)
    );
    addCategoryDataToAxis(chart, data);
    addCurrentWeekRange(categoryAxis, data);
    addScrollbar(chart);
    chart.cursor = new am4charts.XYCursor();
    chartRef.current = chart;
    setIsloading(false);
    return () => {
      chartRef.current?.dispose();
    };
  }, [data, currentRegions]);

  return isLoading ? (
    <p>Ladataaan grafiikkaa...</p>
  ) : (
    <div id="cov-case-chart" style={{ width: "100%", height: "700px" }}></div>
  );
};

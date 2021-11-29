import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { CovCaseData } from "amcharts-test-types";
import { FC, useEffect, useRef } from "react";
import {
  addCategoryDataToAxis,
  addCurrentWeekRange,
  addRegionToChart,
  addScrollbar,
  createCategoryAxis,
  createChart,
} from "./chartUtils";

am4core.useTheme(am4themes_animated);

export interface CovChartWeeklyProps {
  data: CovCaseData[];
  currentRegions: { [key: string]: string };
  setIsLoading: (val: boolean) => void;
}

export const CovChartWeekly: FC<CovChartWeeklyProps> = function ({
  data,
  currentRegions,
  setIsLoading,
}) {
  const chartRef = useRef<null | am4charts.XYChart>(null);
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
    setIsLoading(false);
    return () => {
      chartRef.current?.dispose();
    };
  }, [data, currentRegions]);

  return (
    <div id="cov-case-chart" style={{ width: "100%", height: "700px" }}></div>
  );
};

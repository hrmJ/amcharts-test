import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { CovCaseData } from "amcharts-test-types";
import { FC, useLayoutEffect, useRef } from "react";

am4core.useTheme(am4themes_animated);

export const CovTest1: FC = function () {
  const chartRef = useRef<null | am4charts.XYChart>(null);
  useLayoutEffect(() => {
    const chart = am4core.create("cov-case-chart", am4charts.XYChart);
    chart.data = [
      {
        country: "Lithuania",
        research: 3,
      },
    ];
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    chart.yAxes.push(new am4charts.ValueAxis());
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "research";
    series.dataFields.categoryX = "country";
    chartRef.current = chart;
    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <>
      <div id="cov-case-chart" style={{ width: "100%", height: "500px" }}></div>
    </>
  );
};

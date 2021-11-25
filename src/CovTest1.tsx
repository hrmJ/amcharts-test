import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { CovCaseData } from "amcharts-test-types";
import { FC, useLayoutEffect, useRef } from "react";

am4core.useTheme(am4themes_animated);

export const CovTest1: FC = function () {
  const chartRef = useRef<null | am4charts.XYChart>(null);
  useLayoutEffect(() => {
    fetch(`http://localhost:3001/sample`)
      .then((raw) => raw.json())
      .then((data: CovCaseData[]) => {
        const chart = am4core.create("cov-case-chart", am4charts.XYChart);
        chart.data = data;
        const x = chart.xAxes.push(new am4charts.CategoryAxis());
        const y = chart.yAxes.push(new am4charts.ValueAxis());
        x.dataFields.category = "hcdmunicipality2020";
        x.title.text = "Alue";
        y.title.text = "Tapauksia";
        const series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryX = "hcdmunicipality2020";
        series.dataFields.valueY = "value";
        // series.columns.template.fill = am4core.color("#000000");
        chartRef.current = chart;
      });
    return () => {
      chartRef.current?.dispose();
    };
  }, []);

  return (
    <>
      <div id="cov-case-chart" style={{ width: "100%", height: "500px" }}></div>
    </>
  );
};

import { FC, useLayoutEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export const LineChart: FC = function () {
  const chart = useRef<am4charts.XYChart | null>(null);

  useLayoutEffect(() => {
    let x = am4core.create("chartdiv", am4charts.XYChart);

    x.paddingRight = 20;

    x.data = [
      { date: new Date(2020, 0, 1), name: "a1", value: 22 },
      { date: new Date(2020, 0, 2), name: "a2", value: 99 },
      { date: new Date(2020, 0, 3), name: "a3", value: 44 },
      { date: new Date(2020, 0, 4), name: "a3", value: 49 },
    ];

    let dateAxis = x.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = x.yAxes.push(new am4charts.ValueAxis());
    if (valueAxis.tooltip) {
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;
    }

    let series = x.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.tooltipText = "{valueY.value}";
    x.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    x.scrollbarX = scrollbarX;

    chart.current = x;

    return () => {
      x.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
};

import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { FC, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";

am4core.useTheme(am4themes_animated);

type groupedVals = {
  [key: string]: number;
};

export interface CovDataProps {}

export const CovChart: FC<CovDataProps> = function () {
  const chartRef = useRef<null | am4charts.XYChart>(null);
  const [isLoading, setIsloading] = useState(true);
  const data = useSelector((state: RootState) => state.covidData.allData);
  useLayoutEffect(() => {
    const chart = am4core.create("cov-case-chart", am4charts.XYChart);
    const grouped = data
      .filter((row) => row.hcdmunicipality2020 !== "Kaikki Alueet")
      .reduce((groups: groupedVals, { hcdmunicipality2020, value }) => {
        const valueAsNumber = value ?? "0";
        const aggregated =
          groups[hcdmunicipality2020] + parseInt(valueAsNumber) ||
          parseInt(valueAsNumber);
        return { ...groups, [hcdmunicipality2020]: aggregated };
      }, {});
    const dataList = Object.entries(grouped).map(
      ([hcdmunicipality2020, value]) => ({ hcdmunicipality2020, value })
    );
    dataList.sort((a, b) => a.value - b.value);
    chart.data = dataList;
    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    categoryAxis.dataFields.category = "hcdmunicipality2020";
    categoryAxis.title.text = "Alue";
    categoryAxis.renderer.minGridDistance = 20;
    valueAxis.title.text = "Tapauksia";
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = "hcdmunicipality2020";
    series.dataFields.valueX = "value";
    series.columns.template.tooltipText = "{categoryY}: {valueX}";
    series.groupFields.valueX = "sum";
    chartRef.current = chart;
    setIsloading(false);
    return () => {
      chartRef.current?.dispose();
    };
  }, [data]);

  return (
    <>
      {isLoading && <p>Ladataaan...</p>}
      <div id="cov-case-chart" style={{ width: "100%", height: "700px" }}></div>
    </>
  );
};

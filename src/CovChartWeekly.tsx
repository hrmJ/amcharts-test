import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { FC, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { loadingState } from "./features/covidData/covidDataSlice";
import { RootState } from "./store";

am4core.useTheme(am4themes_animated);

export const CovChartWeekly: FC = function () {
  const chartRef = useRef<null | am4charts.XYChart>(null);
  const [isLoading, setIsloading] = useState(true);
  const { allData: data, loading: dataLoading } = useSelector(
    (state: RootState) => state.covidData
  );
  useLayoutEffect(() => {
    const chart = am4core.create("cov-case-chart", am4charts.XYChart);
    chart.data = data.filter(
      (row) => row.hcdmunicipality2020 === "Kaikki Alueet"
    );
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    chart.yAxes.push(new am4charts.ValueAxis());
    const series = chart.series.push(new am4charts.LineSeries());
    categoryAxis.dataFields.category = "dateweek20200101";
    categoryAxis.renderer.labels.template.disabled = true;
    categoryAxis.title.text = "Viikko";
    series.dataFields.categoryX = "dateweek20200101";
    series.dataFields.valueY = "value";
    chartRef.current = chart;
    setIsloading(false);
    return () => {
      chartRef.current?.dispose();
    };
  }, [data]);

  return (
    <>
      {dataLoading === loadingState.LOADING && <p>Ladataan dataa...</p>}
      {isLoading && <p>Ladataaan grafiikkaa...</p>}
      <div id="cov-case-chart" style={{ width: "100%", height: "700px" }}></div>
    </>
  );
};

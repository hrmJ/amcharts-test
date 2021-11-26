import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { FC, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { loadingState } from "./features/covidData/covidDataSlice";
import { RegionSelect } from "./RegionSelect";
import { RootState } from "./store";

am4core.useTheme(am4themes_animated);

export const CovChartWeekly: FC = function () {
  const chartRef = useRef<null | am4charts.XYChart>(null);
  const [currentRegions, setRegions] = useState(["Kaikki Alueet"]);
  const [isLoading, setIsloading] = useState(true);
  const { allData: data, loading: dataLoading } = useSelector(
    (state: RootState) => state.covidData
  );
  const regions = data.reduce((allVals: string[], { hcdmunicipality2020 }) => {
    const output = allVals.includes(hcdmunicipality2020)
      ? []
      : [hcdmunicipality2020];
    return [...allVals, ...output];
  }, []);
  useLayoutEffect(() => {
    const chart = am4core.create("cov-case-chart", am4charts.XYChart);
    chart.data = data.filter(({ hcdmunicipality2020 }) =>
      currentRegions.includes(hcdmunicipality2020)
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
  }, [data, currentRegions]);

  return (
    <>
      {currentRegions.map((thisRegion, idx) => (
        <RegionSelect
          regions={regions}
          currentRegion={thisRegion}
          setRegion={(val: string) =>
            setRegions(
              currentRegions.map((origVal, subIdx) =>
                subIdx === idx ? val : origVal
              )
            )
          }
        ></RegionSelect>
      ))}
      {dataLoading === loadingState.LOADING && <p>Ladataan dataa...</p>}
      {isLoading && <p>Ladataaan grafiikkaa...</p>}
      <div id="cov-case-chart" style={{ width: "100%", height: "700px" }}></div>
    </>
  );
};

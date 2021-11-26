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
  const [currentRegions, setRegions] = useState<{ [key: string]: string }>({
    compRegion1: "Kaikki Alueet",
  });
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
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "dateweek20200101";
    categoryAxis.renderer.labels.template.disabled = true;
    categoryAxis.title.text = "Viikko";
    chart.yAxes.push(new am4charts.ValueAxis());
    chart.colors.list = [
      am4core.color("red"),
      am4core.color("blue"),
      am4core.color("orange"),
      am4core.color("purple"),
    ];

    Object.values(currentRegions).forEach((currentRegion) => {
      const series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.categoryX = "dateweek20200101";
      series.dataFields.valueY = "value";
      const filtered = data.filter(
        ({ hcdmunicipality2020 }) => currentRegion === hcdmunicipality2020
      );
      series.data = filtered;
    });
    chart.data = data.map(({ dateweek20200101 }) => ({
      dateweek20200101,
    }));
    chartRef.current = chart;
    setIsloading(false);
    return () => {
      chartRef.current?.dispose();
    };
  }, [data, currentRegions]);

  return (
    <>
      {Object.entries(currentRegions).map(([regionKey, thisRegion]) => (
        <RegionSelect
          key={regionKey}
          regions={regions}
          currentRegion={thisRegion}
          setRegion={(val: string) =>
            setRegions({ ...currentRegions, [regionKey]: val })
          }
        ></RegionSelect>
      ))}
      <button
        onClick={() =>
          setRegions({
            ...currentRegions,
            [`compRegion${Object.values(currentRegions).length + 1}`]: "",
          })
        }
      >
        Lisää alue vertailuun
      </button>
      {dataLoading === loadingState.LOADING && <p>Ladataan dataa...</p>}
      {isLoading && <p>Ladataaan grafiikkaa...</p>}
      <div id="cov-case-chart" style={{ width: "100%", height: "700px" }}></div>
    </>
  );
};

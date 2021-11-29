import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { FC, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { loadingState } from "../../features/covidData/covidDataSlice";
import { RegionSelect } from "../../RegionSelect";
import {
  addCategoryDataToAxis,
  addCurrentWeekRange,
  addRegionToChart,
  addScrollbar,
  createCategoryAxis,
  createChart,
} from "./chartUtils";
import { RootState } from "../../store";

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

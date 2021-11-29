import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import { CovCaseData } from "amcharts-test-types";

export function createChart() {
  const chart = am4core.create("cov-case-chart", am4charts.XYChart);
  chart.colors.list = [
    am4core.color("red"),
    am4core.color("blue"),
    am4core.color("orange"),
    am4core.color("purple"),
  ];
  return chart;
}

export function createCategoryAxis(chart: am4charts.XYChart) {
  const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "dateweek20200101";
  categoryAxis.renderer.labels.template.disabled = true;
  categoryAxis.title.text = "Viikko";
  return categoryAxis;
}

export function addRegionToChart(
  chart: am4charts.XYChart,
  currentRegion: string,
  data: CovCaseData[]
) {
  const series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.categoryX = "dateweek20200101";
  series.dataFields.valueY = "value";
  const filtered = data.filter(
    ({ hcdmunicipality2020 }) => currentRegion === hcdmunicipality2020
  );
  series.data = filtered;
  series.tooltipText = `${currentRegion}: {valueY.value}`;
}

export function addCategoryDataToAxis(
  chart: am4charts.XYChart,
  data: CovCaseData[]
) {
  chart.data = data.map(({ dateweek20200101 }) => ({
    dateweek20200101,
  }));
}

function getLatestWeekWithData(data: CovCaseData[]) {
  let latestWeekIndex = data.length - 1;
  while (!data[latestWeekIndex].value && latestWeekIndex > 0) {
    latestWeekIndex--;
  }
  return data[latestWeekIndex].dateweek20200101;
}

export function addCurrentWeekRange(
  categoryAxis: am4charts.CategoryAxis,
  data: CovCaseData[]
) {
  if (!data.length) {
    return null;
  }
  const range = categoryAxis.axisRanges.create();
  const latestWeek = getLatestWeekWithData(data);
  range.category = latestWeek;
  range.endCategory = latestWeek;
  range.axisFill.fill = am4core.color("#396478");
  range.axisFill.fillOpacity = 0.3;
}

export function addScrollbar(chart: am4charts.XYChart) {
  if (!chart.series.length) {
    return null;
  }
  const scrollbarX = new am4charts.XYChartScrollbar();
  scrollbarX.series.push(chart.series.values[0]);
  chart.scrollbarX = scrollbarX;
}

import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { loadingState } from "../../features/covidData/covidDataSlice";
import { RegionSelect } from "../../RegionSelect";
import { RootState } from "../../store";
import { CovChartWeekly } from "./Chart";

export const CovChartWeeklyContainer: FC = function () {
  const [currentRegions, setRegions] = useState<{ [key: string]: string }>({
    compRegion1: "Kaikki Alueet",
  });
  const [graphLoading, setGraphLoading] = useState(true);
  const { allData: data, loading: dataLoading } = useSelector(
    (state: RootState) => state.covidData
  );
  const regions = data.reduce((allVals: string[], { hcdmunicipality2020 }) => {
    const output = allVals.includes(hcdmunicipality2020)
      ? []
      : [hcdmunicipality2020];
    return [...allVals, ...output];
  }, []);

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
      {graphLoading && <p>Ladataan grafiikkaa...</p>}
      <CovChartWeekly
        currentRegions={currentRegions}
        data={data}
        setIsLoading={setGraphLoading}
      />
    </>
  );
};

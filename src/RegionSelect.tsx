import { FC } from "react";

export interface RegionSelectProps {
  regions: string[];
  currentRegion: string;
  setRegion: (region: string) => void;
}

export const RegionSelect: FC<RegionSelectProps> = function ({
  currentRegion,
  regions,
  setRegion,
}) {
  return (
    <select onChange={(ev) => setRegion(ev.target.value)} value={currentRegion}>
      {regions.map((region) => (
        <option key={region} value={region}>
          {region}
        </option>
      ))}
    </select>
  );
};

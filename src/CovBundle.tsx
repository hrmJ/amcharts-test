import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { fetchCovidData } from "./features/covidData/covidDataSlice";

export const CovBundle: FC = function () {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCovidData());
  }, []);

  return (
    <div className="cov-bundle-container">
      <aside>
        <ul>
          <li>
            <Link to="regional">Tapaukset alueittain</Link>
          </li>
          <li>
            <Link to="weekly">Tapaukset viikottain</Link>
          </li>
        </ul>
      </aside>
      <div className="chart-container">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

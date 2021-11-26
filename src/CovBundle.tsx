import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { getData } from "./features/covidData/covidDataSlice";

export const CovBundle: FC = function () {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <div className="cov-bundle-container">
      <aside>
        <ul>
          <li>
            <Link to="regional">Tapaukset alueittain</Link>
          </li>
        </ul>
      </aside>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

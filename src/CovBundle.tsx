import { FC } from "react";
import { Link, Outlet } from "react-router-dom";

export const CovBundle: FC = function () {
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

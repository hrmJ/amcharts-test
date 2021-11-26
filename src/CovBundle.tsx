import { FC, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

export const CovBundle: FC = function () {
  useEffect(() => {
    fetch("http://localhost:3001/sample")
      .then((resp) => resp.json())
      .then((data) => console.log(data, "mor"))
      .catch((err) => console.log(err));
  });

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

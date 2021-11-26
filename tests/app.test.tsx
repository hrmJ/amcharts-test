import {
  ByRoleMatcher,
  ByRoleOptions,
  fireEvent,
  render,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { App } from "../src/App";
import { store } from "../src/store";

type getByRoleType = (
  role: ByRoleMatcher,
  options?: ByRoleOptions
) => HTMLElement;

describe("The app as a whole", () => {
  function getLinks(getByRole: getByRoleType) {
    const regionChartLink = getByRole("link", { name: /alueittain/ });
    const weeklyChartLink = getByRole("link", { name: /viikottain/ });
    return {
      regionChartLink,
      weeklyChartLink,
    };
  }

  it("takes the user to the covid page when clicked", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const covLink = getByRole("link", { name: /covid/i });
    fireEvent.click(covLink);
    const { regionChartLink, weeklyChartLink } = getLinks(getByRole);
    expect(regionChartLink).toBeInTheDocument();
    expect(weeklyChartLink).toBeInTheDocument();
  });

  it("takes the user to the different covid charts when clicked", () => {
    const { getByRole, container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(container.querySelector("svg")).not.toBeInTheDocument();
    const covLink = getByRole("link", { name: /covid/i });
    fireEvent.click(covLink);
    const { regionChartLink, weeklyChartLink } = getLinks(getByRole);
    fireEvent.click(regionChartLink);
    expect(container.querySelector("svg")).toBeInTheDocument();
    fireEvent.click(weeklyChartLink);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});

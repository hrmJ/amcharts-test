import { fireEvent, render, screen } from "@testing-library/react";
import { App } from "../src/App";

describe("The app as a whole", () => {
  it("takes the user to the covid page when clicked", () => {
    const { getByRole } = render(<App />);
    const covLink = getByRole("link", { name: /covid/i });
    fireEvent.click(covLink);
    const regionChartLink = getByRole("link", { name: /alueittain/ });
    expect(regionChartLink).toBeInTheDocument();
  });

  it("takes the user to the regional chart when clicked", () => {
    const { getByRole, container } = render(<App />);
    expect(container.querySelector("svg")).not.toBeInTheDocument();
    const covLink = getByRole("link", { name: /covid/i });
    fireEvent.click(covLink);
    const regionChartLink = getByRole("link", { name: /alueittain/ });
    fireEvent.click(regionChartLink);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});

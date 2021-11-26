import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CovBundle } from "../src/CovBundle";
import { App } from "../src/App";

describe("The covid data page", () => {
  it("renders a regional chart on the page when a link is clicked", async () => {
    const { getByRole, container } = render(<CovBundle></CovBundle>, {
      wrapper: App,
    });
    const regionChartLink = getByRole("link", { name: /alueittain/ });
    fireEvent.click(regionChartLink);
    screen.debug();
    await waitFor(() =>
      expect(container.querySelector("svg")).toBeInTheDocument()
    );
  });
});

import { prettyDOM, render, screen } from "@testing-library/react";
import { CovChart } from "../src/CovTest1";

describe("The covid data page", () => {
  it("renders a chart on the page if data delivered as props", async () => {
    const { container } = render(
      <CovChart
        data={[
          {
            value: "3",
            hcdmunicipality2020: "Some place",
            dateweek20200101: "222",
          },
        ]}
      ></CovChart>
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});

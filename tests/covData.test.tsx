import { prettyDOM, render, screen } from "@testing-library/react";
import { CovChart } from "../src/CovTest1";

describe("The covid data page", async () => {
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
    const snapshot = container.outerHTML.replace(
      /filter-id-\d+/g,
      "filter-id-X"
    );
    expect(snapshot).toMatchSnapshot();
  });
});

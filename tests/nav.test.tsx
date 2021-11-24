import React from "react";
import { render } from "@testing-library/react";
import App from "../src/App";

describe("smoke test", () => {
  it(" works ", () => {
    const { getByText } = render(<div>moro</div>);
    const div = getByText("moro");
    expect(div).toBeInTheDocument();
  });
});

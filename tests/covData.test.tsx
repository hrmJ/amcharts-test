import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CovBundle } from "../src/CovBundle";

describe("The covid data page", () => {
  let origFetch: typeof window.fetch;
  beforeEach(() => {
    origFetch = window.fetch;
    window.fetch = jest
      .fn()
      .mockResolvedValue({ json: jest.fn().mockResolvedValue([]) });
  });
  afterEach(() => {
    window.fetch = origFetch;
  });
  it("loads the source data when rendered", async () => {
    const { getByRole, container } = render(<CovBundle></CovBundle>, {
      wrapper: BrowserRouter,
    });
    expect(window.fetch).toHaveBeenCalledWith("http://localhost:3001/sample");
  });
});

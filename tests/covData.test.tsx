import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { CovBundle } from "../src/CovBundle";
import { store } from "../src/store";

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
    render(
      <Provider store={store}>
        <CovBundle></CovBundle>
      </Provider>,
      { wrapper: BrowserRouter }
    );
    expect(window.fetch).toHaveBeenCalledWith("http://localhost:3001/sample");
  });
});
